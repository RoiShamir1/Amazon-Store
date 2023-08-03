import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { Col, Row } from "react-bootstrap";
import { Store } from "../Context/Store";
import Cart from "../components/Cart";
import axios from "axios";
import { toast } from "react-toastify";
import { ADD_TO_CART, GET_FAIL, REMOVE_FROM_CART } from "../Reducers/Actions";
import Total from "../components/Total";

const CartPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  const updateCartHandler = async (item, Quantity) => {
    try {
      const { data } = await axios.get("/products/id/" + item._id);
      if (data.countInStock < Quantity) {
        toast.error("sorry we dont have in stock");
        console.log("error");
        return;
      }
      ctxDispatch({ type: ADD_TO_CART, payload: { ...item, Quantity } });
    } catch (error) {
      ctxDispatch({ type: GET_FAIL, payload: error.message });
    }
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: REMOVE_FROM_CART, payload: item });
  };
  console.log(cartItems);

  return (
    <div>
      <Title title="shopping cart"></Title>
      <Row>
        <Col md={8}>
          <Cart cartItems={cartItems} updateCartHandler={updateCartHandler} removeCartHandler={removeItemHandler} />
        </Col>
        <Col md={4}>
          <Total cartItems={cartItems} checkoutHandler={checkoutHandler}></Total>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
