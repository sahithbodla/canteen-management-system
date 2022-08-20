import React, { useEffect, useState } from 'react';
import { database } from '../../firebase';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function getUserData(setListOfEmployees) {
  database.ref('users').once('value', (snap) => {
    setListOfEmployees(snap.val());
  });
}
function getTransactionsData(setListOfEmployees) {
  database.ref('transactions').once('value', (snap) => {
    setListOfEmployees(snap.val());
  });
}

const ListOfEmployees = (props) => {
  const {
    setListOfEmployees,
    listOfEmployees,
    currentUser,
    setTransaction,
    transactions,
  } = props;
  const [search, setSearch] = useState('');
  const [money, setMoney] = useState(0);
  const [eUid, setEUid] = useState('');
  const [show, setShow] = useState(false);
  const [employeesArray, setEmployeesArray] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (uid) => {
    setShow(true);
    setEUid(uid);
  };

  const getUniqueUid = () => {
    const UidArr = [];
    if (transactions === null) {
      return 't-1';
    }
    const Uids = Object.keys(transactions);
    Uids.forEach((x) => {
      UidArr.push(Number(x.split('-')[1]));
    });
    return 't-' + (Math.max(...UidArr) + 1);
  };

  useEffect(() => {
    getUserData(setListOfEmployees);
    getTransactionsData(setTransaction);
  }, [setListOfEmployees, setTransaction, eUid]);

  useEffect(() => {
    if (search === '') {
      listOfEmployees && setEmployeesArray(Object.values(listOfEmployees));
    } else {
      const newArray =
        listOfEmployees &&
        Object.values(listOfEmployees).filter((employee) => {
          if (
            employee.name.indexOf(search) !== -1 ||
            employee.empId.indexOf(search) !== -1 ||
            employee.email.indexOf(search) !== -1
          ) {
            return true;
          }
        });
      setEmployeesArray(newArray);
    }
  }, [search, listOfEmployees]);

  function updateEmployeeBalance(uid, balance) {
    database
      .ref(`users/${uid}/balance`)
      .set(balance)
      .catch((error) => {
        console.log(error.message);
      });
  }

  const addTransaction = (amount) => {
    const transaction = {
      uid: getUniqueUid(),
      source: currentUser.uid,
      item: 'Recharge',
      type: 'Credit',
      employee: eUid,
      amount,
    };
    database
      .ref('transactions/' + getUniqueUid())
      .set(transaction)
      .catch((error) => {
        console.log(error.message);
      });
    console.log(transaction);
  };

  const addMoneyToEmployee = () => {
    const currentBalance = listOfEmployees[eUid]?.balance;
    updateEmployeeBalance(eUid, Number(currentBalance) + Number(money));
    addTransaction(Number(money));
    setEUid('');
    setMoney(0);
    setShow(false);
  };

  return (
    <div style={{ minWidth: '400px' }}>
      <Card>
        <Card.Body>
          <Form.Group id="password" className="mt-2">
            <Form.Control
              type="text"
              value={search}
              placeholder="Search Employee"
              onChange={(val) => setSearch(val.target.value)}
            ></Form.Control>
          </Form.Group>

          <table className="table mt-2">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {employeesArray &&
                Object.values(employeesArray).map((employee) => (
                  <tr key={employee.uid}>
                    <td>{employee?.empId}</td>
                    <td>{employee?.name}</td>
                    <td>{employee?.email}</td>
                    <td>
                      <div className="d-flex justify-content-between">
                        {employee?.balance}{' '}
                        <i
                          className="bi bi-plus-circle-fill text-primary"
                          onClick={() => handleShow(employee.uid)}
                        ></i>
                      </div>
                    </td>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Money</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please enter the amount to add money into employee account
          <Form.Group id="password" className="mt-2">
            <Form.Control
              type="number"
              value={money}
              onChange={(val) => setMoney(val.target.value)}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addMoneyToEmployee}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListOfEmployees;
