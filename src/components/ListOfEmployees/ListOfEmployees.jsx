import React, { useEffect } from 'react';
import { database } from '../../firebase';

function getUserData(setListOfEmployees) {
  database.ref('users').once('value', (snap) => {
    setListOfEmployees(snap.val());
  });
}

const ListOfEmployees = (props) => {
  const { setListOfEmployees } = props;
  useEffect(() => {
    getUserData(setListOfEmployees);
  }, []);
  return <div>ListOfEmployees</div>;
};

export default ListOfEmployees;
