import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../../components/Logout';

const Employee = (props) => {
  const { currentUser } = props;
  return (
    <div className="mx-4">
      <Link to="/" className="text-white text-decoration-none mx-2">
        Dashboard
      </Link>
      <Link to="/transactions" className="text-white text-decoration-none mx-2">
        Transactions
      </Link>
      <Link to="/passbook" className="text-white text-decoration-none mx-2">
        Passbook
      </Link>
      <Link to="/menu" className="text-white text-decoration-none mx-2">
        Menu
      </Link>
      <Link
        to="/items-of-the-day"
        className="text-white text-decoration-none mx-2"
      >
        Items of the day
      </Link>
      {currentUser ? <Logout /> : ''}
    </div>
  );
};

export default Employee;
