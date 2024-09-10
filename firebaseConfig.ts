// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDR2cSUFpD2j5IVz04FzoxoacUgjGik5os',
  authDomain: 'talla-24.firebaseapp.com',
  projectId: 'talla-24',
  storageBucket: 'talla-24.appspot.com',
  messagingSenderId: '113100995045',
  appId: '1:113100995045:web:e567c51d3684aee401d70c',
  measurementId: 'G-8WXQ3T94FZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
