import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBlu-WrbWChcsFjeveAz5n3-uUeAbKalJc',
  authDomain: 'sleep-tracker-12345.firebaseapp.com',
  projectId: 'sleep-tracker-12345',
  storageBucket: 'sleep-tracker-12345.appspot.com',
  messagingSenderId: '680908154546',
  appId: '1:680908154546:web:105de055f7c1f36de4cbab',
  measurementId: 'G-H5HXZLKYJZ',
};

const provider = new GoogleAuthProvider();

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signOutWithGoogle = () => signOut(auth);

export const db = getFirestore(app);
