import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Admin from './Admin';

const Navbar = (props) => {
  const { listOfEmployees, setCurrentUser, currentUser: loggedInUser } = props;
  const { currentUser } = useAuth();

  useEffect(() => {
    listOfEmployees
      ? setCurrentUser(listOfEmployees[currentUser?.uid])
      : setCurrentUser(null);
  }, [listOfEmployees, currentUser]);

  return (
    <nav className="navbar navbar-light bg-primary w-100">
      <h3 className="navbar-brand text-white mx-4">
        Canteen Management System
      </h3>
      {loggedInUser?.role === 'Admin' ? (
        <Admin currentUser={currentUser} />
      ) : (
        ''
      )}
    </nav>
  );
};

export default Navbar;
