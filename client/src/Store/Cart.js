import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [], 
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const existing = state.items.find((item) => item.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ productId, quantity });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    increase: (state, action) => {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decrease: (state, action) => {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    remove: (state, action) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
    
  },
});

export const { addToCart, increase, decrease, remove , clearCart } = cartSlice.actions;
export default cartSlice.reducer;
