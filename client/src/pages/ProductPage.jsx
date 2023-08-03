import React from "react";
import { useEffect, useReducer, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { GET_REQUEST, GET_SUCCESS, GET_FAIL, ADD_TO_CART } from "../Reducers/Actions";
import { Store } from "../Context/Store";
import { getError } from "warning";
import { productPageReducer } from "../Reducers/ProductPageReducer";
import { Col, Row } from "react-bootstrap";
import { Loading } from "../components/Loading";
import MessageBox from "../components/MessageBox";
import CartDescription from "../components/CartDescription";
import ProductDescription from "../components/ProductDescription";
import { AddToCartHandler } from "../Services/AddToCart";

const ProductPage = () => {
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const initialState = {
    loading: true,
    error: "",
    products: [],
  };

  const [{ loading, error, product }, dispatch] = useReducer(productPageReducer, initialState);

  // const addToCartHandler = async (product, cartItems, ctxDispatch) => {
  //   const existedItem = cartItems.find((x) => x._id === product._id);
  //   const quantity = existedItem ? existedItem.quantity + 1 : 1;

  //   try {
  //     const { data } = await axios.get(`/api/v1/products/${product._id}`);

  //     if (data.countInStock < quantity) {
  //       window.alert("Sorry, Product is out of stock");
  //       return;
  //     }

  //     ctxDispatch({ type: ADD_TO_CART, payload: { ...product, quantity } });
  //   } catch (err) {
  //     ctxDispatch({ type: GET_FAIL, payload: err.message });
  //   }
  // };

  const addToCart = async () => {
    await AddToCartHandler(product, cartItems, ctxDispatch);
    navigate("/cart");
  };

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: GET_REQUEST });

      try {
        const res = await axios.get(`/products/token/${token}`);
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: err.message });
      }
    };

    getProduct();
  }, [token]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img src={`${product.image}`} alt={product.title} className="card-img-top card-image" />
            </Col>

            <Col md={3}>
              <ProductDescription {...product} />
            </Col>

            <Col md={3}>
              <CartDescription product={product} addToCart={addToCart} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
