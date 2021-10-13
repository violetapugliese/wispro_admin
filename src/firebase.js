
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCe-qKW6Mu8BEGRODciMrWmuVeIfwGLme4",
  authDomain: "wispro-admin.firebaseapp.com",
  projectId: "wispro-admin",
  storageBucket: "wispro-admin.appspot.com",
  messagingSenderId: "735595694556",
  appId: "1:735595694556:web:4dbd9d9257b7604df96719"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);