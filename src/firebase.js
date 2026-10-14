import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBjklAyo83ttPUvnm3pRISjzU_XP6w-X_I',
  authDomain: 'repfuelai.firebaseapp.com',
  projectId: 'repfuelai',
  storageBucket: 'repfuelai.firebasestorage.app',
  messagingSenderId: '1081469794965',
  appId: '1:1081469794965:web:2d61ed52ebd462ca78799c',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);