import firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyB1R36qsM3aH3jN0FyRgcd7skbS9NFVHc8",
    authDomain: "remy-e09fe.firebaseapp.com",
    projectId: "remy-e09fe",
    storageBucket: "remy-e09fe.appspot.com",
    messagingSenderId: "1005733485499",
    appId: "1:1005733485499:web:d5dc3badd98c2b6862429e",
    measurementId: "G-LZP9CXY1LL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore();

  export {db};