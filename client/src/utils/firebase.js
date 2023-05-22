import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: 'moonlit-casing-372301.firebaseapp.com',
    projectId: 'moonlit-casing-372301',
    storageBucket: 'moonlit-casing-372301.appspot.com',
    messagingSenderId: '1086451853946',
    appId: '1:1086451853946:web:6d2b585a327fdb7cc3e9c3',
    measurementId: 'G-SDHBJZZCQP',
};

export const firebaseErrMessages = {
    'Firebase: The email address is badly formatted. (auth/invalid-email).': 'Invalid email address.',
    'Firebase: An internal AuthError has occurred. (auth/internal-error).': 'Wrong email or password.',
    'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).':
        'Incorrect email or password.',
    'Firebase: Password should be at least 6 characters (auth/weak-password).': 'Password should be at least 6 characters.',
    'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).': 'The password is invalid.',
};

const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = firebase.auth();
export default firebase;
