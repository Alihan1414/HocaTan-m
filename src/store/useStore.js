import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

let lastKnownValue = null;
let writeQueue = Promise.resolve();
let currentUnsubscribe = null;

// Aktif kullanıcı adını al (normalleştirilmiş, küçük harf)
export function getActiveUser() {
  if (typeof window === 'undefined') return 'default';
  
  if (window.location.pathname.startsWith('/anket/')) {
    const urlParams = new URLSearchParams(window.location.search);
    const u = urlParams.get('u');
    if (u) return u.toLowerCase().trim();
  }
  
  const user = localStorage.getItem('personeltanim_user');
  return user ? user.toLowerCase().trim() : 'default';
}

// Firestore belge yolu: hocatanim/{kullanıcıAdı}/globalState_v2
// "bayram" kullanıcısı için eski veritabanıyla uyumluluk:
// Eğer bayram ise önce yeni yolu dene, yoksa eski global yolu kullan
export function getDocRef() {
  const user = getActiveUser();
  // Bayram kullanıcısı için eski yolu koruyoruz (mevcut veriler orada)
  if (user === 'bayram') {
    return doc(db, 'hocatanim', 'globalState_v2');
  }
  return doc(db, 'hocatanim', `${user}_globalState_v2`);
}

const firestoreStorage = {
  getItem: async (name) => {
    try {
      const docRef = getDocRef();
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        lastKnownValue = docSnap.data().value;
        return lastKnownValue;
      }
      return null;
    } catch (error) {
      console.error("Firestore okuma hatası:", error);
      throw error;
    }
  },
  setItem: (name, value) => {
    if (value === lastKnownValue) return;

    writeQueue = writeQueue.then(async () => {
      if (value === lastKnownValue) return;
      try {
        const docRef = getDocRef();
        await setDoc(docRef, { value: value });
        lastKnownValue = value;
      } catch (error) {
        console.error("Firestore yazma hatası:", error);
      }
    });

    return writeQueue;
  },
  removeItem: async (name) => {},
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
      name: 'personeltanim-storage',
      storage: createJSONStorage(() => firestoreStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      }
    }
  )
);

// Real-time senkronizasyon - kullanıcıya göre dinle
export function subscribeToUserStore() {
  if (typeof window === 'undefined') return;
  if (currentUnsubscribe) {
    currentUnsubscribe();
    currentUnsubscribe = null;
  }

  lastKnownValue = null;

  const docRef = getDocRef();
  currentUnsubscribe = onSnapshot(docRef, (docSnap) => {
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
