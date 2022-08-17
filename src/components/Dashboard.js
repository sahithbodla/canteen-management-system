import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import ListOfEmployees from '../components/ListOfEmployees';
import { Link, useHistory } from 'react-router-dom';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const history = useHistory();

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
    <div style={{ minWidth: '400px' }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <ListOfEmployees />
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="primary" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
}
