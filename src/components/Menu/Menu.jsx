import React, { useEffect, useState } from 'react';
import { setData } from '../../utils';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { database } from '../../firebase';

const Menu = (props) => {
  const { setMenu, menu, currentUser, setListOfUsers, listOfEmployees } = props;

  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [iUid, setIUid] = useState('');
  const [eUid, setEUid] = useState('');
  const [modal, setModal] = useState('');
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const admin = currentUser?.role === 'Admin';
  const employee = currentUser?.role === 'Employee';

  const handleClose = () => setShow(false);
  const handleShow = (uid, modal) => {
    setShow(true);
    setModal(modal);
    if (uid) {
      setIUid(uid);
      setQuantity(menu?.[uid].quantity);
      setPrice(menu?.[uid].price);
      setName(menu?.[uid].name);
    }
  };

  useEffect(() => {
    setData('menu', setMenu);
    setData('users', setListOfUsers);
  }, [setMenu, iUid, purchaseQuantity]);

  useEffect(() => {
    setQuantity(menu?.[iUid]?.quantity);
    setPrice(menu?.[iUid]?.price);
    setName(menu?.[iUid]?.name);
  }, [iUid]);

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

  const buyItem = () => {
    const updatedQuantity = quantity - purchaseQuantity;
    const updatedWalletPrice = currentUser?.balance - price * purchaseQuantity;
    database
      .ref(`menu/${iUid}/quantity`)
      .set(updatedQuantity)
      .catch((error) => {
        console.log(error.message);
      });
    database
      .ref(`users/${currentUser.uid}/balance`)
      .set(updatedWalletPrice)
      .catch((error) => {
        console.log(error.message);
      });
    setPurchaseQuantity(1);
    setIUid('');
    setShow(false);
  };

  const sellItem = () => {
    const updatedQuantity = quantity - purchaseQuantity;
    const updatedWalletPrice =
      listOfEmployees?.[eUid]?.balance - price * purchaseQuantity;
    database
      .ref(`menu/${iUid}/quantity`)
      .set(updatedQuantity)
      .catch((error) => {
        console.log(error.message);
      });
    database
      .ref(`users/${eUid}/balance`)
      .set(updatedWalletPrice)
      .catch((error) => {
        console.log(error.message);
      });
    setPurchaseQuantity(1);
    setIUid('');
    setEUid('');
    setShow(false);
    setName('');
    setPrice('');
    setQuantity('');
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

  const buyItemJSX = () => {
    return (
      <>
        <Modal.Header>
          <Modal.Title>Do you want to buy {name} ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group id="buyingQuantity" className="mt-2">
            <Form.Label>Quantity {`(${quantity} left)`}</Form.Label>
            <Form.Control
              type="number"
              value={purchaseQuantity}
              onChange={(val) => setPurchaseQuantity(val.target.value)}
              className="mb-2"
            ></Form.Control>
          </Form.Group>
          {price * purchaseQuantity} will be debited from your wallet
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={buyItem}>
            Buy {name}
          </Button>
        </Modal.Footer>
      </>
    );
  };

  const sellItemJSX = () => {
    return (
      <>
        <Modal.Header>
          <Modal.Title>Sell an Item ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group id="sellItem" className="mt-2">
            <Form.Label>Select Item to Sell</Form.Label>
            <Form.Control
              as="select"
              value={iUid}
              onChange={(e) => setIUid(e.target.value)}
              className="mb-2"
            >
              <option value="" selected>
                Select
              </option>
              {Object.entries(menu).map(([uid, item]) => {
                return <option value={uid}>{item.name}</option>;
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group id="sellEmployee" className="mt-2">
            <Form.Label>Select Employee who is buying</Form.Label>
            <Form.Control
              as="select"
              value={eUid}
              onChange={(e) => setEUid(e.target.value)}
              className="mb-2"
            >
              <option value="" selected>
                Select
              </option>
              {Object.values(listOfEmployees).map((employee) => {
                return <option value={employee.uid}>{employee.name}</option>;
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group id="sellQuantity" className="mt-2">
            <Form.Label>Quantity {`(${quantity} left)`}</Form.Label>
            <Form.Control
              type="number"
              value={purchaseQuantity}
              onChange={(val) => setPurchaseQuantity(val.target.value)}
              className="mb-2"
            ></Form.Control>
          </Form.Group>
          {price * purchaseQuantity} will be debited from{' '}
          {listOfEmployees[eUid]?.name}'s wallet
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={sellItem}>
            Sell {name}
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
                {admin && <th>Quantity</th>}
                {admin && <th>Action</th>}
                {employee && <th>Wallet Balance :{currentUser?.balance}</th>}
              </tr>
            </thead>
            <tbody>
              {menu &&
                Object.entries(menu).map(([uid, item]) => (
                  <tr key={uid}>
                    <td>{item?.name}</td>
                    <td>{item?.price}</td>
                    {admin && <td>{item?.quantity}</td>}
                    {admin && (
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
                    )}
                    {employee && (
                      <td className="d-flex justify-content-center">
                        <Button onClick={() => handleShow(uid, 'BUY')}>
                          Buy
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
          {admin && (
            <div className="d-flex">
              <Button className="w-100 mx-2">
                <Link
                  to="/add-item"
                  role="button"
                  className="text-decoration-none text-white"
                >
                  Add an Item
                </Link>
              </Button>
              <Button
                className="w-100 mx-2"
                onClick={() => handleShow(iUid, 'SELL')}
              >
                Sell an Item
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        {modal === 'EDIT' && editModalJSX()}
        {modal === 'DELETE' && deleteModalJSX()}
        {modal === 'BUY' && buyItemJSX()}
        {modal === 'SELL' && sellItemJSX()}
      </Modal>
    </div>
  );
};

export default Menu;
