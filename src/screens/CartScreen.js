import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import { useNavigate } from "react-router-dom";

function CartScreen(props) {
  // const productId = props.match.params.id;
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = id;
  // console.log(id);

  const location = useLocation();
  // console.log(location);

  const qty = location
    ? Number(location.search.split("=")[1]) // this line returns the value qty={qty} at the navigate method in addtocarthandler function of Productscreen component
    : 1;
  // console.log(qty)

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("effect check")
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
//  it checks if youre signedin if not it redirects you to sign in but if signed in then takes you to shpping screen   
    navigate("/signin?redirect=shipping");
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart {cartItems.length } </h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty.
            <Link
              to="/"
              style={{
                border: "1px solid grey",
                marginLeft: "50px",
                borderRadius: "5px",
                padding: "5px",
                background: "green",
                color: " white",
              }}
            >
              Go Shopping
            </Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name} className="small" />
                  </div>

                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(parseInt(item.countInStock)).keys()].map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div> ₦{item.price}</div>

                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      {" "}
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ₦
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className=" primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
