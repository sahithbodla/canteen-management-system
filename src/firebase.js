import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDg9zinKzznMP68r-A_og0M4sJ-2zsAL7U',
  authDomain: 'canteen-management-syste-75878.firebaseapp.com',
  projectId: 'canteen-management-syste-75878',
  storageBucket: 'canteen-management-syste-75878.appspot.com',
  messagingSenderId: '882566825402',
  appId: '1:882566825402:web:84a454a98c0654496f4983',
});

export const auth = app.auth();
export const database = app.database();
export default app;
