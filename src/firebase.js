
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCe-qKW6Mu8BEGRODciMrWmuVeIfwGLme4",
  authDomain: "wispro-admin.firebaseapp.com",
  databaseURL: "https://wispro-admin-default-rtdb.firebaseio.com",
  projectId: "wispro-admin",
  storageBucket: "wispro-admin.appspot.com",
  messagingSenderId: "735595694556",
  appId: "1:735595694556:web:4dbd9d9257b7604df96719"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
