import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCFb5zAE6FgJMQAOull--FUkV74rZ7Zx7o',
    authDomain: 'emailpasswordlogin-9b822.firebaseapp.com',
    projectId: 'emailpasswordlogin-9b822',
    storageBucket: 'emailpasswordlogin-9b822.appspot.com',
    messagingSenderId: '153517776891',
    appId: '1:153517776891:web:b52829bcd00fc53283355e',
};

const app = initializeApp(firebaseConfig);
export const databate = getAuth(app);
