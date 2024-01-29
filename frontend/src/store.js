import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import productReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";
import modalReducer from "./features/modal/modalSlice";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
  modal: modalReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
