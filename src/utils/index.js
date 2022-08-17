import { database } from '../firebase';

export const setData = (collection, setData) => {
  database.ref(collection).once('value', (snap) => {
    setData(snap.val());
  });
};
