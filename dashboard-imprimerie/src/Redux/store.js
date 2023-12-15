import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
   userListReducer, 
  userLoginReducer,
  UserDeleteReducer,
  userUpdateReducer,
  userEditReducer
 } from "./Reducers/userReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";

import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./Reducers/OrderReducres";

import {
  printingorderDeliveredReducer,
  printingorderDetailsReducer,
  printingorderListReducer,
  PrintingOrderUpdateReducer,
} from "./Reducers/PrintingOrderReducers";


const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDelete:UserDeleteReducer,
  userEdit:userEditReducer,
  userUpdate:userUpdateReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliveredReducer,
  printingorderList: printingorderListReducer,
  printingorderDetails: printingorderDetailsReducer,
  printingorderDeliver: printingorderDeliveredReducer,
  printingorderUpdate:PrintingOrderUpdateReducer,


});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
