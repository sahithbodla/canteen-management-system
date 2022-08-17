import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
  const [error, setError] = useState('');
  const history = useHistory();
  const { logout } = useAuth();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      history.pushState('/login');
    } catch {
      setError('Failed to logout');
    }
  }

  return (
    <a
      role="button"
      className="text-white text-decoration-none mx-2"
      onClick={handleLogout}
    >
      Log Out
    </a>
  );
};

export default Logout;
