import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../../components/Logout';

const Admin = (props) => {
  const { currentUser } = props;
  return (
    <div className="mx-4">
      <Link
        to="/list-of-employees"
        className="text-white text-decoration-none mx-2"
      >
        Employees
      </Link>
      {currentUser ? <Logout /> : ''}
    </div>
  );
};

export default Admin;
