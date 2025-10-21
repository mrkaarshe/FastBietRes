import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Cart'
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";
import adminOrdersReducer from "./adminOrdersSlice";

export const store = configureStore({
    reducer:{
        cart : cartReducer,
        user: userReducer,
        
       adminOrders: adminOrdersReducer,

        
    }
})