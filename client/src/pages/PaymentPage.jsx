import React from "react";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Context/Store";
import { SAVE_PAYMENT_METHOD } from "../Reducers/Actions";
import Title from "../components/Title";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Form } from "react-bootstrap";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || "PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: SAVE_PAYMENT_METHOD, payload: paymentMethodName });
    navigate("/placeorder");
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  });
  return (
    <div>
      <Title>Payment</Title>
      <CheckoutSteps step1 step2 step3 />
      <div className="container small-container">
        <h1>payment</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
              value="PayPal"
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Visa"
              label="Visa"
              checked={paymentMethodName === "Visa"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
              value="Visa"
            />
          </div>
          <div className="mb-3">
            <Button type="submit" variant="primary">
                Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentPage;
