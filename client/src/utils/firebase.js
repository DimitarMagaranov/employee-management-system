import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCv9zMM-4Ayu-7Jto0nDrFp1pyEifcKL_0',
    authDomain: 'moonlit-casing-372301.firebaseapp.com',
    projectId: 'moonlit-casing-372301',
    storageBucket: 'moonlit-casing-372301.appspot.com',
    messagingSenderId: '1086451853946',
    appId: '1:1086451853946:web:6d2b585a327fdb7cc3e9c3',
    measurementId: 'G-SDHBJZZCQP',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         console.log('Logged in');
//         console.log(user);
//         sessionStorage.setItem('user', user._delegate.email);
//     } else {
//         console.log('Logged out');
//         sessionStorage.removeItem('user');
//     }
// })

export const auth = firebase.auth()
export default firebase;