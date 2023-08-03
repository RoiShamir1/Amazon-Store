import React, { useEffect } from "react";
import Products from "../components/Products";
import axios from "axios";
import "./homePage.css";
import MsgBox from "../components/MsgBox";
import { Loading } from "../components/Loading";
import { HomePageReducer, initState } from "../Reducers/HomePageReducer";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../Reducers/Actions";
import { useReducer } from "react";
import { Container } from "react-bootstrap";

const HomePage = () => {
  // const [products, setProducts] = useState([]);

  const [{ loading, error, products }, dispatch] = useReducer(HomePageReducer, initState);

  useEffect(() => {
    dispatch({ type: GET_REQUEST });
    const getProducts = async () => {
      try {
        const res = await axios.get("/products");
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: error.message });
      }
    };
    getProducts();
    // return () => {};
  }, []);

  return (
    <Container>
      <h1>Products</h1>
      <div className="products">
        {loading ? <Loading /> : error ? <MsgBox variant="danger">{error}</MsgBox> : <Products products={products}></Products>}
      </div>
    </Container>
  );
};

export default HomePage;
