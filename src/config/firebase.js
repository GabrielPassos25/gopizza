import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCk5EPqd4LTdWpZGcYg_jht1OI7WSFaLIg",
  authDomain: "gopizza-42eb1.firebaseapp.com",
  projectId: "gopizza-42eb1",
  storageBucket: "gopizza-42eb1.appspot.com",
  messagingSenderId: "1001646962030",
  appId: "1:1001646962030:web:2b08b0ec896b5adeee3d7f",
  measurementId: "G-CMF0BB8BPK"
};

// Initialize Firebase
Firebase = firebase.initializeApp(firebaseConfig);

// Functions firebase
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export default {auth, firestore, storage};