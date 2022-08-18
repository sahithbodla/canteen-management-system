import React, { useEffect } from 'react';
import { setData } from '../../utils';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu = (props) => {
  const { setMenu, menu } = props;
  useEffect(() => {
    setData('menu', setMenu);
  }, [setMenu]);
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
                  <tr key={item.uid}>
                    <td>{item?.name}</td>
                    <td>{item?.price}</td>
                    <td>{item?.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Button className="w-100 mt-4">
            <Link
              to="/add-item"
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

export default Menu;
