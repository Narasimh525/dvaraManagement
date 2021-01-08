import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyC0oNvv1ALFJTbT4jIE18lgduODPez9Fhw",
    authDomain: "usermanagement-aa9ae.firebaseapp.com",
    databaseURL: "https://usermanagement-aa9ae-default-rtdb.firebaseio.com",
    projectId: "usermanagement-aa9ae",
    storageBucket: "usermanagement-aa9ae.appspot.com",
    messagingSenderId: "282646059046",
    appId: "1:282646059046:web:dbc5381fcb5868d5082ee7",
    measurementId: "G-2BEDVZ40GY"
}
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

export default firebase;
