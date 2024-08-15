import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA68Mh_AhLYFYWMOpcgZZX3IldJ-Jeo05I",
    authDomain: "react-blog-app-d42f4.firebaseapp.com",
    projectId: "react-blog-app-d42f4",
    storageBucket: "react-blog-app-d42f4.appspot.com",
    messagingSenderId: "977477986936",
    appId: "1:977477986936:web:e888537e132fb6e260db8d"
  };

const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export services to use them in other parts of your app
export { app, auth, db, storage };