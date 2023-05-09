// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCqoeW4zK9f5YNgAKAsMg36CRwqxbh4-Ao',
  authDomain: 'tddd27-735f0.firebaseapp.com',
  projectId: 'tddd27-735f0',
  storageBucket: 'tddd27-735f0.appspot.com',
  messagingSenderId: '463378838318',
  appId: '1:463378838318:web:1a5483a62a8e3e1aa500bf',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
