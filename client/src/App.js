import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/homePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { SignInPage } from "./pages/SignInPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { SignUpPage } from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import { Container } from "react-bootstrap";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import SearchPage from "./pages/SearchPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Container className="App">
          <ToastContainer position="bottom-center" limit={2} />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/shipping" element={<ShippingAddressPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/product/:token" element={<ProductPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </main>
        </Container>
      </BrowserRouter>
    </>
  );
}

  /* <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} /> */


export default App;
