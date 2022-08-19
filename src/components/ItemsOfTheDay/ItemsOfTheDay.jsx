import React, { useEffect, useState } from 'react';
import { setData } from '../../utils';
import { database } from '../../firebase';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemsOfTheDay = (props) => {
  const { menu, itemsOfTheDay, setItemsOfTheDay, setMenu, currentUser } = props;

  const [quantity, setQuantity] = useState(0);
  const [iUid, setIUid] = useState('');
  const [show, setShow] = useState(false);

  const admin = currentUser?.role === 'Admin';
  const employee = currentUser?.role === 'Employee';

  const handleClose = () => setShow(false);
  const handleShow = (uid) => {
    setShow(true);
    setIUid(uid);
    setQuantity(menu?.[uid].quantity);
  };

  useEffect(() => {
    setData('itemsOfTheDay', setItemsOfTheDay);
  }, [setItemsOfTheDay]);

  useEffect(() => {
    setData('menu', setMenu);
  }, [setMenu, iUid]);

  function updateQuantity(uid, quantity) {
    database
      .ref(`menu/${uid}/quantity`)
      .set(quantity)
      .catch((error) => {
        console.log(error.message);
      });
  }

  const editQuantity = () => {
    updateQuantity(iUid, quantity);
    setIUid('');
    setShow(false);
  };

  return (
    <div style={{ minWidth: '400px' }}>
      <Card>
        <Card.Body>
          <table class="table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Price</th>
                {admin && <th>Quantity</th>}
              </tr>
            </thead>
            <tbody>
              {itemsOfTheDay &&
                itemsOfTheDay.map(
                  (itemUid) =>
                    menu[itemUid] && (
                      <tr>
                        <td>{menu[itemUid].name}</td>
                        <td>{menu[itemUid].price}</td>
                        {admin && (
                          <td>
                            <div className="d-flex justify-content-around">
                              {menu[itemUid].quantity}
                              <i
                                class="bi bi-pencil-square text-primary"
                                onClick={() => handleShow(itemUid)}
                              ></i>
                            </div>
                          </td>
                        )}
                      </tr>
                    )
                )}
            </tbody>
          </table>
          {admin && (
            <Button className="w-100 mt-4">
              <Link
                to="/add-item-of-the-day"
                role="button"
                className="text-decoration-none text-white"
              >
                Add an Item
              </Link>
            </Button>
          )}
          {employee && (
            <Button className="w-100 mt-4">
              <Link
                to="/menu"
                role="button"
                className="text-decoration-none text-white"
              >
                Want to but any item?
              </Link>
            </Button>
          )}
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {menu?.[iUid]?.name}
          <Form.Group id="quantity" className="mt-2">
            <Form.Control
              type="number"
              value={quantity}
              onChange={(val) => setQuantity(val.target.value)}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={editQuantity}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ItemsOfTheDay;
