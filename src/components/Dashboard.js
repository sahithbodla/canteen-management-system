import React, { useState } from 'react';
import { Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { logout, currentUser } = useAuth();
  const history = useHistory();

  return (
    <div style={{ minWidth: '400px' }}>
      <Card>
        <Card.Header>
          <h4>{currentUser.email}</h4>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          Hi, Welcome to Canteen Management Portal
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Email/Password
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}
