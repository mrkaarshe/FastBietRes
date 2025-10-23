import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Cart'
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";
import adminOrdersReducer from "./adminOredeSlice";
import userOrdersReducer from "./userOrdersSlice";

export const store = configureStore({
reducer: {
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,          // general order slice (e.g., for placing orders)
  userOrders: userOrdersReducer,  // orders specific to the logged-in user
  adminOrders: adminOrdersReducer 
  // all orders for admin panelz
}
});

