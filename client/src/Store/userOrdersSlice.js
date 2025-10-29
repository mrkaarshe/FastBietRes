// src/Store/userOrderSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify";

// Create a user order
export const createUserOrder = createAsyncThunk(
  "userOrders/create",
  async (orderData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.user?.user?.token || localStorage.getItem("token");

      const response = await fetch("https://fastbietres-4.onrender.com/api/userOrders/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create order");
      toast.success("Order placed successfully!");
      return data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch user orders
export const fetchUserOrders = createAsyncThunk(
  "userOrders/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.user?.user?.token || localStorage.getItem("token") ;

      const res = await fetch("https://fastbietres-4.onrender.com/api/userOrders/getOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data)

      if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
      return data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Delete user order
export const deleteUserOrder = createAsyncThunk(
  "userOrders/delete",
  async (orderId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = localStorage.getItem("token");

      console.log("Deleting order with ID:", orderId);  // Debugging line

      const res = await fetch(`https://fastbietres-4.onrender.com/api/userOrders/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Delete response data:", data);
        // Debugging line
      if (!res.ok) throw new Error(data.message || "Failed to delete order");

      toast.success("Order deleted successfully!");
      return orderId;  // Returning the orderId to update the state
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
const userOrderSlice = createSlice({
  name: "userOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearUserOrders: (state) => {
      state.orders = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createUserOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
      })
      .addCase(createUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteUserOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })
      .addCase(deleteUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserOrders } = userOrderSlice.actions;
export default userOrderSlice.reducer;
