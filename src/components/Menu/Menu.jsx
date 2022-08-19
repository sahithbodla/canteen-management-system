import React, { useEffect, useState } from 'react';
import { setData } from '../../utils';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { database } from '../../firebase';

const Menu = (props) => {
  const { setMenu, menu } = props;

  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [iUid, setIUid] = useState('');
  const [modal, setModal] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (uid, modal) => {
    setShow(true);
    setModal(modal);
    setIUid(uid);
    setQuantity(menu?.[uid].quantity);
    setPrice(menu?.[uid].price);
    setName(menu?.[uid].name);
  };

  useEffect(() => {
    setData('menu', setMenu);
  }, [setMenu, iUid]);

  const updateItem = () => {
    const updatedItem = {
      name,
      price,
      quantity,
    };
    database
      .ref(`menu/${iUid}`)
      .set(updatedItem)
      .catch((error) => {
        console.log(error.message);
      });
    setIUid('');
    setShow(false);
  };

  const deleteItem = () => {
    database
      .ref(`menu/${iUid}`)
      .set(null)
      .catch((error) => {
        console.log(error.message);
      });
    setIUid('');
    setShow(false);
  };

  const editModalJSX = () => {
    return (
      <>
        <Modal.Header>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group id="quantity" className="mt-2">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(val) => setName(val.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group id="quantity" className="mt-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(val) => setPrice(val.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group id="quantity" className="mt-2">
            <Form.Label>Quantity</Form.Label>
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
          <Button variant="primary" onClick={updateItem}>
            Edit
          </Button>
        </Modal.Footer>
      </>
    );
  };

  const deleteModalJSX = () => {
    return (
      <>
        <Modal.Header>
          <Modal.Title>Delete below Item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{name}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteItem}>
            Delete
          </Button>
        </Modal.Footer>
      </>
    );
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
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {menu &&
                Object.entries(menu).map(([uid, item]) => (
                  <tr key={uid}>
                    <td>{item?.name}</td>
                    <td>{item?.price}</td>
                    <td>{item?.quantity}</td>
                    <td>
                      <div className="d-flex justify-content-between">
                        <i
                          class="bi bi-pencil-square text-primary"
                          onClick={() => handleShow(uid, 'EDIT')}
                        ></i>
                        <i
                          class="bi bi-trash3-fill text-danger"
                          onClick={() => handleShow(uid, 'DELETE')}
                        ></i>
                      </div>
                    </td>
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
      <Modal show={show} onHide={handleClose}>
        {modal === 'EDIT' && editModalJSX()}
        {modal === 'DELETE' && deleteModalJSX()}
      </Modal>
    </div>
  );
};

export default Menu;
