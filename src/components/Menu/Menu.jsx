import React, { useEffect } from 'react';
import { setData } from '../../utils';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu = (props) => {
  const { setMenu, menu } = props;
  useEffect(() => {
    setData('menu', setMenu);
  }, []);
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
              {menu &&
                Object.values(menu).map((item) => (
                  <tr>
                    <td>{item?.name}</td>
                    <td>{item?.price}</td>
                    <td>{item?.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="primary">
          <Link
            to="/add-item"
            role="button"
            className="text-decoration-none text-white"
          >
            Add an Item
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Menu;
