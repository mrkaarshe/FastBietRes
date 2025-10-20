import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [], 
  },
  reducers: {
addToCart: (state, action) => {
  const { productId, product, quantity } = action.payload;
  const existing = state.items.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.items.push({
      productId,
      title: product.title,
      quantity,
      status: "Pending",
      createdAt: new Date().toISOString(),
    });
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
statusUpdate: (state, action) => {
  const { productId, status } = action.payload;
  console.log("Payload:", action.payload); // Eeg waxa la helayo
  console.log("All items:", state.items);  // Eeg items-ka jira
  const item = state.items.find((i) => i.productId === productId);
  console.log("Matched item:", item);      // Eeg haddii la helay item

  if (item) {
    item.status = status;
    localStorage.setItem("cart", JSON.stringify(state.items));
  } else {
    console.warn("Item not found for productId:", productId);
  }
}


    
  },
});

export const { addToCart, increase, decrease, remove , clearCart,statusUpdate } = cartSlice.actions;
export default cartSlice.reducer;
