import React, { useEffect } from 'react';
import { setData } from '../../utils';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemsOfTheDay = (props) => {
  const { menu, itemsOfTheDay, setItemsOfTheDay } = props;
  useEffect(() => {
    setData('itemsOfTheDay', setItemsOfTheDay);
  }, [setItemsOfTheDay]);
  return (
    <div style={{ minWidth: '400px' }}>
      <Card>
        <Card.Body>
          <table class="table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {itemsOfTheDay &&
                itemsOfTheDay.map((itemUid) => (
                  <tr>
                    <td>{menu[itemUid]?.name}</td>
                    <td>{menu[itemUid]?.price}</td>
                    <td>{menu[itemUid]?.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Button className="w-100 mt-4">
            <Link
              to="/add-item-of-the-day"
              role="button"
              className="text-decoration-none text-white"
            >
              Add an Item
            </Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemsOfTheDay;
