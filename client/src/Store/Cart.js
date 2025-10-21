import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

 const statusUpdateAsync = createAsyncThunk(
  'cart/statusUpdateAsync',
  async ({ productId, status }) => {
    const response = await fetch(`https://fastbietres-1.onrender.com/api/history/orders/${productId}`, {
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

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    statusUpdateLoading: false,
    statusUpdateError: null,
  },
  reducers: {
    // ... your other reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(statusUpdateAsync.pending, (state) => {
        state.statusUpdateLoading = true;
        state.statusUpdateError = null;
      })
      .addCase(statusUpdateAsync.fulfilled, (state, action) => {
        const { productId, status } = action.payload;
        const item = state.items.find(i => i.productId === productId);
        if (item) item.status = status;
        localStorage.setItem("cart", JSON.stringify(state.items));
        state.statusUpdateLoading = false;
      })
      .addCase(statusUpdateAsync.rejected, (state, action) => {
        state.statusUpdateLoading = false;
        state.statusUpdateError = action.error.message;
      });
  }
});

export const { addToCart, increase, decrease, remove, clearCart, statusUpdate } = cartSlice.actions;
export default cartSlice.reducer;
