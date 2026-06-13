import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZkM6pLQGpgJon-hgt5eOWq-RsDPwOktI",
  authDomain: "hocat-ff23a.firebaseapp.com",
  projectId: "hocat-ff23a",
  storageBucket: "hocat-ff23a.firebasestorage.app",
  messagingSenderId: "215685396033",
  appId: "1:215685396033:web:94f6a786ecd2e92a20b8c0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const personnelData = [
  { id: Date.now() + 1, name: "Süleyman yenice", role: "İç mesul" },
  { id: Date.now() + 2, name: "Hüseyin Eker", role: "Ders hocası" },
  { id: Date.now() + 3, name: "Enes Boran", role: "Muhasebe" },
  { id: Date.now() + 4, name: "Recep ali aydın", role: "Teknik işler" },
  { id: Date.now() + 5, name: "Tunahan arslan", role: "Eğitim mesulu" },
  { id: Date.now() + 6, name: "Fatih kamuray", role: "Harici hizmetler" },
  { id: Date.now() + 7, name: "Tuna Aydın", role: "Aşçı" },
  { id: Date.now() + 8, name: "Ruçhan Başkaya", role: "Müzakereci" },
  { id: Date.now() + 9, name: "H.ibrahim arıcan", role: "Müzakereci" },
  { id: Date.now() + 10, name: "Aytekin kuzhan", role: "Müzakereci" },
  { id: Date.now() + 11, name: "Mehmet başarıkan", role: "İrşadi hizmetler" },
  { id: Date.now() + 12, name: "Ayhan Aydın", role: "Ders hocası" }
].map(p => ({
  ...p,
  department: "",
  startDate: "",
  notes: "",
  status: "G1",
  goals: [],
  quizAnswers: {}
}));

const initialState = {
  state: {
    personnel: personnelData,
    goals: [],
    meetings: [],
    _hasHydrated: true
  },
  version: 0
};

async function seedData() {
  try {
    const docRef = doc(db, 'hocatanim', 'abdurrahman_globalState_v2');
    await setDoc(docRef, { value: JSON.stringify(initialState) });
    console.log("Abdurrahman verileri basariyla Firestore'a eklendi.");
    process.exit(0);
  } catch (error) {
    console.error("Hata:", error);
    process.exit(1);
  }
}

seedData();
