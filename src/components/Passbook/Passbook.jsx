import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { database } from '../../firebase';

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

const Passbook = (props) => {
  const { currentUser, setListOfEmployees, setTransaction, transactions } =
    props;

  const [show, setShow] = useState(false);
  const [money, setMoney] = useState(0);

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
  }, [money]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const addTransaction = (amount) => {
    const transaction = {
      uid: getUniqueUid(),
      source: currentUser.uid,
      item: 'Recharge',
      type: 'Credit',
      employee: currentUser.uid,
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

  const addMoney = () => {
    const newBalance = Number(currentUser.balance) + Number(money);
    database
      .ref(`users/${currentUser.uid}/balance`)
      .set(newBalance)
      .catch((error) => {
        console.log(error.message);
      });
    addTransaction(Number(money));
    setMoney(0);
    setShow(false);
  };

  return (
    <div style={{ minWidth: '400px' }}>
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <b>Account Balance</b>
            <span>{currentUser?.balance}</span>
          </div>
        </Card.Header>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="primary" onClick={handleShow}>
          Add Money
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Money</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please enter the amount to add money into your account
          <Form.Group id="money" className="mt-2">
            <Form.Control
              type="number"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addMoney}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Passbook;
