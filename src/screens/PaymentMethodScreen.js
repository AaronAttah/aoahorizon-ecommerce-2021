import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";

import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen() {
  
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  
  const navigate = useNavigate();
  if (!shippingAddress.address) {
    navigate("/shipping"); 
  }
  
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="PayStack"
              value="PayStack"
              name="paymentMethod"
              required
              // checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paystack">PayStack</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              // checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div> 
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              // checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div className="">
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
