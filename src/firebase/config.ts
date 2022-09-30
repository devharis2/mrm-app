import firebase, { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB1eCAxHCHS7v4Z0VGjkBM95ybcgxk9GIE",
  authDomain: "mrm-management.firebaseapp.com",
  projectId: "mrm-management",
  storageBucket: "mrm-management.appspot.com",
  messagingSenderId: "192604905200",
  appId: "1:192604905200:web:ca8260632a6f78bd89ac35",
};

export const app = initializeApp(firebaseConfig);
