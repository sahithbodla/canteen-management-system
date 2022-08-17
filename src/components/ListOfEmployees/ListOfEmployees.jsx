import React, { useEffect } from 'react';
import { database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from 'react-bootstrap';

function getUserData(setListOfEmployees) {
  database.ref('users').once('value', (snap) => {
    setListOfEmployees(snap.val());
  });
}

const ListOfEmployees = (props) => {
  const { setListOfEmployees, listOfEmployees } = props;
  const { signup } = useAuth();
  useEffect(() => {
    getUserData(setListOfEmployees);
  }, []);
  return (
    <div className="w-auto">
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
    </div>
  );
};

export default ListOfEmployees;
