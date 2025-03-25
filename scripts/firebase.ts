// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCxeXybpcsX0MoK-aINm0RUtaIHlhxdhbs",
	authDomain: "trashapp-74bff.firebaseapp.com",
	projectId: "trashapp-74bff",
	storageBucket: "trashapp-74bff.firebasestorage.app",
	messagingSenderId: "975295454615",
	appId: "1:975295454615:web:8a7f9a3c6a14158a7678d2",
	measurementId: "G-JTGJMWDLWR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
