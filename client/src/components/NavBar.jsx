import React, { useContext } from "react";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";

import "./NavBar.css";
import { Store } from "../Context/Store";
import { USER_SIGNOUT } from "../Reducers/Actions";
import SearchBox from "./SearchBox";

const NavBar = () => {
  const navigate = useNavigate();
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    // cart: { cartItems },
    cart,
    userInfo,
  } = state;
  const { cartItems } = cart;

  const signoutHandler = () => {
    contextDispatch({ type: USER_SIGNOUT });
  };
  return (
    <>
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Link
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Link>
          <Container className="container">
            <LinkContainer to="/">
              <Navbar.Brand>
                <img src="/imgs/amazonlogo.png" width={100} alt="AMZN" />
              </Navbar.Brand>
            </LinkContainer>

            <nav className="d-flex mx-auto align-items-center">
              <SearchBox />
            </nav>

            <Link to="/cart" className="nav-link me-4 ms-4">
              <i className="fas fa-shopping-cart text-white"></i>
              {cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {" "}
                  {cartItems.reduce((acc, item) => acc + item.Quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown className="text-white me-1" title={userInfo.name}>
                <Link className="dropdown-item" to="#signout" onClick={signoutHandler}>
                  signout
                </Link>
              </NavDropdown>
            ) : (
              <Link className="text-white" to="/signin">
                signin
              </Link>
            )}
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default NavBar;
