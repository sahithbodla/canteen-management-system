import React, { useRef, useState } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { database } from '../../firebase';

export default function AddItemsOfTheDay(props) {
  const { menu, itemsOfTheDay } = props;
  const itemRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function writeItemData(itemsOfTheDayArray) {
    database
      .ref('itemsOfTheDay')
      .set(itemsOfTheDayArray)
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      if (itemsOfTheDay === null) {
        writeItemData([itemRef.current.value]);
      } else {
        const newArray = [...itemsOfTheDay, itemRef.current.value];
        writeItemData([...new Set(newArray)]);
      }
      history.push('/items-of-the-day');
    } catch {
      setError('Failed to add item of the day');
    }

    setLoading(false);
  }
  return (
    <div style={{ width: '400px' }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Select Item of the Day</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="item">
              <Form.Label>Select an Item of the Day</Form.Label>
              <Form.Control as="select" ref={itemRef} required>
                {menu &&
                  Object.entries(menu).map(([uid, item]) => (
                    <option value={uid}>{item.name}</option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Add Item of the Day
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
