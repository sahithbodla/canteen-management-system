import React, { useRef, useState } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { database } from '../firebase';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const roleRef = useRef();
  const empIdRef = useRef();
  const nameRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function writeUserData(user) {
    database
      .ref('users/' + user.uid)
      .set(user)
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      const userData = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      var user = {
        name: nameRef.current.value,
        empId: empIdRef.current.value,
        role: roleRef.current.value,
        uid: userData.user.uid,
        email: userData.user.email,
        balance: '0',
      };
      writeUserData(user);
      currentUser ? history.push('/list-of-employees') : history.push('/login');
    } catch {
      setError('Failed to create an account');
    }
    // auth.createUserWithEmailAndPassword(emailRef.current.value,passwordRef.current.value)

    setLoading(false);
  }
  return (
    <div style={{ width: '400px' }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            {currentUser ? 'Add an Employee' : 'Sign Up'}
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password" className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm" className="mt-2">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="role" className="mt-2">
              <Form.Label>Role</Form.Label>
              <Form.Control as="select" ref={roleRef} required>
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
              </Form.Control>
            </Form.Group>
            <Form.Group id="empId" className="mt-2">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control type="text" ref={empIdRef} required></Form.Control>
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              {currentUser ? 'Add an Employee' : 'Sign Up'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {!currentUser && (
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      )}
    </div>
  );
}
