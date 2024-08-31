// Importando módulos Firebase de maneira modular
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAyHHLVkO9_eKxEPILNnWBEBl-a7SXWOBw",
    authDomain: "petalert-755d9.firebaseapp.com",
    projectId: "petalert-755d9",
    storageBucket: "petalert-755d9.appspot.com",
    messagingSenderId: "336183360505",
    appId: "1:336183360505:web:948672b6529b5377eb5b28"
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);

export const Database = getFirestore(app);
export const FIREBASE_AUTH = getAuth(app);
export const storage = getStorage(app);
