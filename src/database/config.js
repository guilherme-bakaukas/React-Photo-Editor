import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCD-O3_4d89eNb1R8pVse12GTJ1boxQO9o",
    authDomain: "photowall-ba0b3.firebaseapp.com",
    databaseURL: "https://photowall-ba0b3-default-rtdb.firebaseio.com",
    projectId: "photowall-ba0b3",
    storageBucket: "photowall-ba0b3.appspot.com",
    messagingSenderId: "127137142531",
    appId: "1:127137142531:web:f4f3d90e0a6605d982fb36",
    measurementId: "G-9MFHBRY42N"
  };


const app = initializeApp(firebaseConfig)

const database = getDatabase(app)

export {database}