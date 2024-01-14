import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { BASE_URL } from '../settings';
import axios from 'axios';

const firebaseConfig = {
  apiKey: 'AIzaSyAjyMceTn-LWz90sKsZTz5xWs4YX8Vi3uw',
  authDomain: 'grade-calculator-4ff86.firebaseapp.com',
  projectId: 'grade-calculator-4ff86',
  storageBucket: 'grade-calculator-4ff86.appspot.com',
  messagingSenderId: '575435538982',
  appId: '1:575435538982:web:b058892e8c67a89ebadce7',
  measurementId: 'G-XRGZ4XQSSH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const extractEmailUserName = (email) => {
  const regex = /^[^@]+/;

  return email.match(regex)[0];
};

export const createUserAPI = async (user) => {
  const url = `${BASE_URL}classes/users/`;
  try {
    const response = await axios.post(url, user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const newUser = {
      display_name: displayName,
      email: email,
      username: extractEmailUserName(email),
      created_at: new Date(),
    };

    try {
      await setDoc(userDocRef, newUser);
      await createUserAPI(newUser);
    } catch (err) {
      console.error('Error Creating user', err.message);
    }
  }
  return userDocRef;
};

export const signOutUser = () => signOut(auth);
