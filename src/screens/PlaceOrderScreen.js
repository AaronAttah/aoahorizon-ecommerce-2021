import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { usePaystackPayment } from 'react-paystack';




//// pastack hook
const config = {
  reference: (new Date()).getTime().toString(),
  email: "aaron@example.com",
  amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: 'pk_test_cc2985bf84d8cbea510aeafb71fa03b5f250e8a6',
};

// you can call this function anything
const onSuccess = (reference) => {
// Implementation for whatever you want to do with reference and after success call.
console.log(reference);
};

// you can call this function anything
const onClose = () => {
// implementation for  whatever you want to do when the Paystack dialog closed.
console.log('closed')
}




export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  console.log(orderCreate)

  // function fot the summary section
  const toPrice = (num) => Number(num.toFixed(2)); //this whats gona happem here: lets say num is  5.123 convert it to a string"5.123" and then to 5.123 again so we shall use it for the below(cart.itemsprce, and cart.shippingAddress et.c) so basically what it does is that it adds extra digits to the prices
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(1200) : toPrice(450);
  //the line below is for taxes here we made it 15% so can change it and add another figure or feature
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    initializePayment(onSuccess, onClose)

    // ToDO: dispatching some datas to --action
    // we used the ...cart to destructure the object before asignin a part of it i.e(cart.cartItems) to an object orderItems
    // if  you call it here  and not inside the element tags for a fucntional model component it will not give you all the properties in it assuming you do console.log({cart}) below the result wil not be complete thus we bring in the concepts f destructuring

    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };




const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    if (success) {
      // navigate(`/order/${order._id}`);
      

      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, navigate, success]);


  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h1>Shipping </h1>
                <p>
                  <strong>Name: </strong> {cart.shippingAddress.fullName} <br />
                  <strong>Addrees: </strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city}. {cart.shippingAddress.postalCode}
                  . {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h1>Payment</h1>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod} <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h1>Order Items</h1>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>

                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x ₦{item.price} = ₦{item.qty * item.price}{" "}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h1>Order Summary</h1>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>₦{cart.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>₦{cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>VAT(%15)</div>
                  <div>₦{cart.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>₦{cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  className="primary block"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0} // disable when the cart length is 0 i.e whrn there is nothing in the cart
                >
                  {" "}
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {<MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
