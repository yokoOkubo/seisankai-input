import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'seisankai.firebaseapp.com',
  projectId: 'seisankai',
  storageBucket: 'seisankai.appspot.com',
  messagingSenderId: '189724036783',
  appId: '1:189724036783:web:926731f7748961b3d20e5a',
  measurementId: 'G-MCFBJ79QR0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {db, auth, provider};