import React, { useRef, useState } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { database } from '../../firebase';

export default function AddItem(props) {
  const { menu } = props;
  const priceRef = useRef();
  const quantityRef = useRef();
  const nameRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const getUniqueUid = () => {
    const UidArr = [];
    if (menu === null) {
      return 'a-1';
    }
    const Uids = Object.keys(menu);
    Uids.forEach((x) => {
      x = x.split('').reverse().join('');
      UidArr.push(parseInt(x));
    });
    return String(Math.max(...UidArr) + 1 + '-a')
      .split('')
      .reverse()
      .join('');
  };

  function writeItemData(item) {
    database
      .ref('menu/' + item.uid)
      .set(item)
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      var item = {
        name: nameRef.current.value,
        price: priceRef.current.value,
        quantity: quantityRef.current.value,
        uid: getUniqueUid(),
      };
      writeItemData(item);
      history.push('/menu');
    } catch {
      setError('Failed to add an item');
    }

    setLoading(false);
  }
  return (
    <div style={{ width: '400px' }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add Item</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Item Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" ref={priceRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="quantity" className="mt-2">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                ref={quantityRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Add Item
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
