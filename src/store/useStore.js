import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

let lastKnownValue = null;
let writeQueue = Promise.resolve();

const firestoreStorage = {
  getItem: async (name) => {
    try {
      const docRef = doc(db, 'hocatanim', 'globalState_v2');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        lastKnownValue = docSnap.data().value;
        return lastKnownValue;
      }
      return null; // Belge gerçekten yoksa null dönmek normaldir (ilk kurulum)
    } catch (error) {
      console.error("Firestore okuma hatası:", error);
      // Ağ hatası vb. durumlarda boş veriyle ezip veritabanını sıfırlamasını engellemek için hata fırlatıyoruz!
      throw error;
    }
  },
  setItem: (name, value) => {
    if (value === lastKnownValue) return; // Sonsuz döngüyü önle
    
    // İşlemleri sıraya koy (Queue) - Hızlı eklemelerde Firestore yazma yarışını (race condition) önler
    writeQueue = writeQueue.then(async () => {
      // Bekleme sırasında değer zaten değişmişse veya eşitlenmişse atla
      if (value === lastKnownValue) return;
      
      try {
        const docRef = doc(db, 'hocatanim', 'globalState_v2');
        await setDoc(docRef, { value: value });
        lastKnownValue = value;
      } catch (error) {
        console.error("Firestore yazma hatası:", error);
      }
    });
    
    // Zustand persist'in Promise dönmesi gerekmiyor ama dönebiliriz
    return writeQueue;
  },
  removeItem: async (name) => {
    // Silme işlemi gerekmiyor
  },
};

export const useStore = create(
  persist(
    (set) => ({
      personnel: [],
      goals: [],
      meetings: [],
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      addPersonnel: (person) => set((state) => ({ 
        personnel: [...state.personnel, { ...person, id: Date.now() }] 
      })),
      removePersonnel: (id) => set((state) => ({ 
        personnel: state.personnel.filter(p => p.id !== id) 
      })),
      updatePersonnel: (id, updatedData) => set((state) => ({
        personnel: state.personnel.map(p => p.id === id ? { ...p, ...updatedData } : p)
      })),
      addGoal: (goal) => set((state) => ({ 
        goals: [...state.goals, { ...goal, id: Date.now() }] 
      })),
      removeGoal: (id) => set((state) => ({ 
        goals: state.goals.filter(g => g.id !== id) 
      })),
      addMeeting: (meeting) => set((state) => ({
        meetings: [...state.meetings, { ...meeting, id: Date.now() }]
      })),
      removeMeeting: (id) => set((state) => ({
        meetings: state.meetings.filter(m => m.id !== id)
      })),
      updateMeeting: (id, updatedData) => set((state) => ({
        meetings: state.meetings.map(m => m.id === id ? { ...m, ...updatedData } : m)
      }))
    }),
    {
      name: 'hocatanim-storage',
      storage: createJSONStorage(() => firestoreStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      }
    }
  )
);

// Real-time synchronization
if (typeof window !== 'undefined') {
  const docRef = doc(db, 'hocatanim', 'globalState_v2');
  onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const remoteValue = docSnap.data().value;
      if (remoteValue !== lastKnownValue) {
        lastKnownValue = remoteValue;
        try {
          const parsed = JSON.parse(remoteValue);
          useStore.setState(parsed.state);
        } catch (e) {
          console.error("State parse error", e);
        }
      }
    }
  });
}
