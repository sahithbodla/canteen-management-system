import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
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
    <Button
      className="text-white text-decoration-none mx-2"
      onClick={handleLogout}
      variant="danger"
    >
      Log Out
    </Button>
  );
};

export default Logout;
