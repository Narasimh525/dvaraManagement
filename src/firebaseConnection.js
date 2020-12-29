import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


let firebaseConfig = {
    apiKey: "AIzaSyBMwRNcspFOzmhV07bDMkmSsJFNPzFMaFQ",
    authDomain: "dvara-third.firebaseapp.com",
    databaseURL: "https://dvara-third-default-rtdb.firebaseio.com",
    projectId: "dvara-third",
    storageBucket: "dvara-third.appspot.com",
    messagingSenderId: "517086250675",
    appId: "1:517086250675:web:fcb781e45d75307ce0d2c6",
    measurementId: "G-8MP0SGS15E"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

export default firebase;
