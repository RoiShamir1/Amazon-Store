import React from "react";
import MessageBox from "./MessageBox";
import { Link } from "react-router-dom";
import { Col, ListGroup, Row, Button } from "react-bootstrap";

const Cart = ({ cartItems, updateCartHandler, removeCartHandler }) => {
  return (
    <div>
      {cartItems.length === 0 ? (
        <MessageBox>Your cart is empty. {<Link to="/">Back to Home page</Link>}</MessageBox>
      ) : (
        <ListGroup>
          {cartItems.map((item, i) => (
            <ListGroup.Item key={i}>
              <Row className="align-items-center">
                <Col md={4}>
                  <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail" />
                  <Link to={`/product/${item.token}`}>{item.name}</Link>
                </Col>
                <Col md={3}>
                  <Button
                    onClick={() => {
                      updateCartHandler(item, item.Quantity - 1);
                    }}
                    variant="light"
                    disabled={item.Quantity === 1}
                  >
                    <i className="fas fa-minus-circle"></i>
                  </Button>{" "}
                  <span>{item.Quantity}</span>{" "}
                  <Button
                    onClick={() => {
                      updateCartHandler(item, item.Quantity + 1);
                    }}
                    variant="light"
                    disabled={item.Quantity === item.countInStock}
                  >
                    <i className="fas fa-plus-circle"></i>
                  </Button>{" "}
                </Col>
                <Col md={3}>{item.price}$</Col>
                <Col md={2}>
                  <Button
                    variant="light"
                    onClick={() => {
                      removeCartHandler(item);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default Cart;
