import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; 
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCycPZ80tlWeXdDw8_XbTW7rNDn967uzsE",
  authDomain: "todo-f4b18.firebaseapp.com",
  projectId: "todo-f4b18",
  storageBucket: "todo-f4b18.appspot.com",
  messagingSenderId: "335232262748",
  appId: "1:335232262748:web:64d318c1d539323ba9bc99",
  measurementId: "G-4F4GLN3ZZT",
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

 
export { db };
