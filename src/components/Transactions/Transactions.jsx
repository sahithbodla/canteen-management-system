import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

const Transactions = (props) => {
  const { transactions, currentUser, listOfEmployees } = props;

  const admin = currentUser?.role === 'Admin';

  let transactionsView;
  if (!admin && transactions) {
    transactionsView = Object.values(transactions).filter(
      (transaction) => transaction.employee === currentUser.uid
    );
  } else if (admin && transactions) {
    transactionsView = Object.values(transactions);
  }
  return (
    <div style={{ minWidth: '400px' }}>
      <Card>
        <Card.Body>
          <table class="table">
            <thead>
              <tr>
                {admin && <th>Employee</th>}
                <th>Purchased Item</th>
                <th>Cost</th>
                <th>Type</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {transactionsView &&
                transactionsView.map((transaction) => (
                  <tr>
                    {admin && (
                      <td>{listOfEmployees?.[transaction.employee]?.name}</td>
                    )}
                    <td>{transaction.item}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.type}</td>
                    <td>{listOfEmployees?.[transaction.source]?.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Transactions;
