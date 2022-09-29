import { initializeApp, getApps } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  listAll,
  deleteObject,
  list,
} from 'firebase/storage';
import {
  getAuth,
  signInWithEmailAndPassword,
  onIdTokenChanged,
} from 'firebase/auth';

if (getApps().length === 0) {
  initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
}

export const auth = {
  auth: getAuth(),
  signInWithEmailAndPassword,
  onIdTokenChanged,
};
export const storage = {
  storage: getStorage(),
  getDownloadURL,
  uploadString,
  deleteObject,
  listAll,
  list,
  ref,
};
