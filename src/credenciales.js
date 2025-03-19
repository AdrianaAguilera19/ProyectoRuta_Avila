import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB8J1MOWRizcGpbcV9yxCH7GV_jrQA74g0",
  authDomain: "proyectorutaavila.firebaseapp.com",
  databaseURL: "https://proyectorutaavila-default-rtdb.firebaseio.com",
  projectId: "proyectorutaavila",
  storageBucket: "proyectorutaavila.firebasestorage.app",
  messagingSenderId: "435320495610",
  appId: "1:435320495610:web:cd75675c421ca56ddf1843",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 
export { app };