import { compose, applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { orderCreateReducer } from "./reducers/orderReducers";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import {
  userSigninReducer,
  userRegisterReducer,
} from "./reducers/userReducers";

// items below  at initailstate are the saved in localstorage
// so basically we had saved duting userAction, ProductAction, cartAction. so we retrieve using the below
const initialState = {
  userSignin: {
    //so it states below if userinfo is in the localstorage get it using json.parse then set it to null
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    // '' '' '' ''.....set it as an array
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    // '' ''' '' .... set it as an object
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
