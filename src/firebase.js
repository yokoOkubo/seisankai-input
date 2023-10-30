import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCqTQZVw_sGgIw4TMXnS-eMJCTO9fOOn88',
  authDomain: 'seisankai.firebaseapp.com',
  projectId: 'seisankai',
  storageBucket: 'seisankai.appspot.com',
  messagingSenderId: '189724036783',
  appId: '1:189724036783:web:926731f7748961b3d20e5a',
  measurementId: 'G-MCFBJ79QR0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;