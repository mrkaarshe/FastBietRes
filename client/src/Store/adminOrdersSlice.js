import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all orders for admin
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://fastbietres-1.onrender.com/api/history/orders');  // Ku badal URL backend kaaga saxda ah
      if (!response.ok) throw new Error("Failed to fetch orders");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update order status by orderId
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateStatus",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const response = await fetch(`https://fastbietres-1.onrender.com/api/history/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const adminOrdersSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Update order in state.orders
        const updatedOrder = action.payload.order;
        const idx = state.orders.findIndex(o => o._id === updatedOrder._id);
        if (idx !== -1) {
          state.orders[idx] = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminOrdersSlice.reducer;
