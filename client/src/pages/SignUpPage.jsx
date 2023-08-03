import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Title from "../components/Title";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Store } from "../Context/Store";
import axios from "axios";
import { USER_SIGNIN } from "../Reducers/Actions";
import { toast } from "react-toastify";

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    userInfo && navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submit = (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      toast.error("password must be the same");
      return;
    }

    axios
      .post("/users/signUp", { email, password, name })
      .then((res) => {
        ctxDispatch({ type: USER_SIGNIN, payload: res.data });
        navigate(redirect);
      })
      .catch((error) => {
        toast.error(error.message, {
          theme: "colored",
          hideProgressBar: true,
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <>
      <Container className="small-container">
        <Title>SignUp</Title>
        <h1 className="my-3">Sign Up</h1>
        <Form onSubmit={submit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>name</Form.Label>
            <Form.Control type="text" required onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>email</Form.Label>
            <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>password</Form.Label>
            <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirm-password">
            <Form.Label>confirm password</Form.Label>
            <Form.Control type="password" required onChange={(e) => setConfirmPass(e.target.value)}></Form.Control>
          </Form.Group>

          <div className="mb-3">
            <Button type="submit">Sign Up</Button>
          </div>
          <div className="mb-3">
            Already Have an Account? <Link to={`/signIn?redirect=${redirect}`}>Sign in Here</Link>
          </div>
        </Form>
      </Container>
    </>
  );
};
