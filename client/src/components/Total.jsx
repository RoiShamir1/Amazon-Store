import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";

const Total = ({ cartItems, checkoutHandler }) => {
  console.log(cartItems);
  const total = cartItems.reduce((acc, item) => acc + item.Quantity, 0);
  const total2 = cartItems.reduce((acc, item) => acc + item.price * item.Quantity, 0);

  return (
    <div>
      <Card>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item variant="flush">
              <h3>
                Subtotal: ({total} {""} items) : ${total2}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid">
                <Button type="button" variant="primary" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                  Checkout
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Total;
