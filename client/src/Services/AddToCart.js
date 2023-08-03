import axios from "axios";
import { toast } from "react-toastify";
import { ADD_TO_CART, GET_FAIL } from "../Reducers/Actions";

export const AddToCartHandler = async (product, cartItems, ctxDispatch) => {
  const ExistingItem = cartItems.find((item) => item._id === product._id);
  const Quantity = ExistingItem ? ExistingItem.Quantity + 1 : 1;
  try {
    const { data } = await axios.get("/products/id/" + product._id);
    if (data.countInStock < Quantity) {
      toast.error("Sorry, we cant add that item to your cart");
      return;
    }
    ctxDispatch({ type: ADD_TO_CART, payload: { ...product, Quantity } });
  } catch (error) {
    ctxDispatch({ type: GET_FAIL, payload: error.message });
  }
};
