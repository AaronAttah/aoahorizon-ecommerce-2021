import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { signout } from "./actions/userActions";
// import Carousel from "react-elastic-carousel";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";



function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin

  console.log(cartItems);
  const dispatch = useDispatch()
  const signoutHandler = () => {
      dispatch(signout())
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row hd">
          <div>
            <Link className="brand" to="/">
              sureSHOP{" "}
            </Link>
          </div>
          <div>
            <Link to="/cart/:id">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        
        {/* <section>

        </section> */}

        <main>
          <Routes>
            <Route path="/cart/:id" element={<CartScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} exact />  homeScreen
            <Route path="/signin" element={<SigninScreen />} exact />
            <Route path="/register" element={<RegisterScreen />} exact />
            <Route path="/shipping" element={<ShippingAddressScreen />} exact />
            <Route path="/payment" element={<PaymentMethodScreen/>} exact />
            <Route path="/placeorder" element={<PlaceOrderScreen />} exact />
            <Route path="/order/:id" element={<OrderScreen />} exact />

          </Routes>
        </main>

        <footer className="row center"> All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
