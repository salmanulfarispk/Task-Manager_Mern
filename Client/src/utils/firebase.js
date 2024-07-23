// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "task-manager-pk.firebaseapp.com",
  projectId: "task-manager-pk",
  storageBucket: "task-manager-pk.appspot.com",
  messagingSenderId: "268857777402",
  appId: "1:268857777402:web:05cdd2a790c387f6097d43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);