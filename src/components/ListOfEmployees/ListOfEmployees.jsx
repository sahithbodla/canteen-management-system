import React, { useEffect } from 'react';
import { database } from '../../firebase';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function getUserData(setListOfEmployees) {
  database.ref('users').once('value', (snap) => {
    setListOfEmployees(snap.val());
  });
}

const ListOfEmployees = (props) => {
  const { setListOfEmployees, listOfEmployees } = props;
  useEffect(() => {
    getUserData(setListOfEmployees);
  }, []);
  return (
    <div style={{ minWidth: '400px' }}>
      <Card>
        <Card.Body>
          <table class="table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {listOfEmployees &&
                Object.values(listOfEmployees).map((employee) => (
                  <tr>
                    <td>{employee?.empId}</td>
                    <td>{employee?.name}</td>
                    <td>{employee?.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="primary">
          <Link
            to="/signup"
            role="button"
            className="text-decoration-none text-white"
          >
            Add an Employee
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ListOfEmployees;
