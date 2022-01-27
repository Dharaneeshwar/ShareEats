import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmCKt-m-DwXY6AM5kojNx8DvZ4Fs--cP8",
  authDomain: "share-eats.firebaseapp.com",
  projectId: "share-eats",
  storageBucket: "share-eats.appspot.com",
  messagingSenderId: "776133909574",
  appId: "1:776133909574:web:9f42d3e036497f12c27e47",
};

const firebaseapp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseapp);

export const db = getFirestore(firebaseapp);

