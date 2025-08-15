
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC51l8f700J8FxW0g84SAld2-Osn15JdXQ",
  authDomain: "spermdonationsystem.firebaseapp.com",
  projectId: "spermdonationsystem",
 
  storageBucket: "spermdonationsystem.appspot.com",
  messagingSenderId: "505147101849",
  appId: "1:505147101849:web:6edef4f585b8528dd21e08",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
