import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ✅ 1. Async thunk for updating order status
export const statusUpdate = createAsyncThunk(
  'cart/statusUpdateAsync',
  async ({ productId, status }) => {
    const response = await fetch(`https://fastbietres-4.onrender.com/api/history/orders/${productId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update status');
    }

    return { productId, status };
  }
);

// ✅ 2. Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    statusUpdateLoading: false,
    statusUpdateError: null,
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(statusUpdate.pending, (state) => {
        state.statusUpdateLoading = true;
        state.statusUpdateError = null;
      })
      .addCase(statusUpdate.fulfilled, (state, action) => {
        const { productId, status } = action.payload;
        const item = state.items.find(i => i.productId === productId);
        if (item) item.status = status;
        localStorage.setItem("cart", JSON.stringify(state.items));
        state.statusUpdateLoading = false;
      })
      .addCase(statusUpdate.rejected, (state, action) => {
        state.statusUpdateLoading = false;
        state.statusUpdateError = action.error.message;
      });
  }
});

// ✅ 3. Export all the necessary things
export const { addToCart, increase, decrease, remove, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// ✅ 4. Export the async thunk separately
