import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Admin from './Admin';
import Employee from './Employee';
import { setData } from '../../utils';

const Navbar = (props) => {
  const {
    listOfEmployees,
    setCurrentUser,
    currentUser: loggedInUser,
    setListOfEmployees,
    setMenu,
    setItemsOfTheDay,
  } = props;
  const { currentUser } = useAuth();

  useEffect(() => {
    setData('users', setListOfEmployees);
    setData('menu', setMenu);
    setData('itemsOfTheDay', setItemsOfTheDay);
  }, [setListOfEmployees, setMenu, setItemsOfTheDay]);

  useEffect(() => {
    listOfEmployees
      ? setCurrentUser(listOfEmployees[currentUser?.uid])
      : setCurrentUser(null);
  }, [listOfEmployees, currentUser, setCurrentUser]);

  return (
    <nav className="navbar navbar-light bg-primary w-100">
      <h3 className="navbar-brand text-white mx-4">
        Canteen Management System
      </h3>
      {loggedInUser ? (
        <h5 className="text-white">Welcome {loggedInUser.name}</h5>
      ) : (
        <h6 className="text-white mx-2">Log in to continue</h6>
      )}
      {loggedInUser?.role === 'Admin' ? (
        <Admin currentUser={currentUser} />
      ) : (
        <Employee currentUser={currentUser} />
      )}
    </nav>
  );
};

export default Navbar;
