// database/firebaseDb.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9k52TGzpiKwr_IU9_Z2DrNOumh9p_sdU",
    authDomain: "react-native-test-app-6420d.firebaseapp.com",
    projectId: "react-native-test-app-6420d",
    storageBucket: "react-native-test-app-6420d.appspot.com",
    messagingSenderId: "969834205928",
    appId: "1:969834205928:web:8dc8dd3b224a96722d2f5d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;