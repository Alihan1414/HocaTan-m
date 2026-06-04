import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const firestoreStorage = {
  getItem: async (name) => {
    try {
      const docRef = doc(db, 'hocatanim', 'globalState');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().value; // Zustand parses the string automatically
      }
      return null;
    } catch (error) {
      console.error("Firestore okuma hatası:", error);
      return null;
    }
  },
  setItem: async (name, value) => {
    try {
      const docRef = doc(db, 'hocatanim', 'globalState');
      await setDoc(docRef, { value: value }); // value is already stringified by Zustand
    } catch (error) {
      console.error("Firestore yazma hatası:", error);
    }
  },
  removeItem: async (name) => {
    // Genelde removeItem tam olarak silmek içindir, bu uygulamada gerekmiyor.
  },
};

export const useStore = create(
  persist(
    (set) => ({
      personnel: [],
      goals: [],
      meetings: [],
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
      storage: firestoreStorage, // Custom Firebase storage
    }
  )
);
