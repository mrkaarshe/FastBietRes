import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCart } from "../Store/Cart";

const BASE_URL = "https://fastbietres-4.onrender.com/api/history";

/* ──────────────── 1️⃣ USER - PLACE ORDER ──────────────── */
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`${BASE_URL}/orders`, orderData, config);

      // Clear cart after successful order placement
      dispatch(clearCart());

      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

/* ──────────────── 2️⃣ ADMIN - FETCH ALL ORDERS ──────────────── */
export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${BASE_URL}/admin/orders`, config);
      console.log("✅ All Orders Fetched:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

/* ──────────────── 3️⃣ ADMIN - UPDATE ORDER STATUS ──────────────── */
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ orderId, statusUpdateData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${BASE_URL}/admin/orders/${orderId}`,
        statusUpdateData,
        config
      );

      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

/* ──────────────── 4️⃣ USER - FETCH OWN ORDERS ──────────────── */
export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${BASE_URL}/orders/myorders`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

/* ──────────────── 5️⃣ SLICE DEFINITION ──────────────── */
const orderSlice = createSlice({
  name: "order",
  initialState: {
    allOrders: [],
    allOrdersLoading: false,
    allOrdersError: null,

    userOrders: [],
    userOrdersLoading: false,
    userOrdersError: null,

    currentOrder: null,
    orderLoading: false,
    orderError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ─── PLACE ORDER ─── */
      .addCase(placeOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.currentOrder = action.payload;
        state.userOrders.unshift(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload;
      })

      /* ─── FETCH ALL ORDERS ─── */
      .addCase(fetchAllOrders.pending, (state) => {
        state.allOrdersLoading = true;
        state.allOrdersError = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allOrdersLoading = false;
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.allOrdersLoading = false;
        state.allOrdersError = action.payload;
      })

      /* ─── UPDATE ORDER STATUS ─── */
      .addCase(updateOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload;

        // Update in admin view
        const indexAll = state.allOrders.findIndex((order) => order._id === updatedOrder._id);
        if (indexAll !== -1) state.allOrders[indexAll] = updatedOrder;

        // Update in user view
        const indexUser = state.userOrders.findIndex((order) => order._id === updatedOrder._id);
        if (indexUser !== -1) state.userOrders[indexUser] = updatedOrder;
      })

      /* ─── FETCH USER ORDERS ─── */
      .addCase(fetchUserOrders.pending, (state) => {
        state.userOrdersLoading = true;
        state.userOrdersError = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrdersError = action.payload;
      });
  },
});

export default orderSlice.reducer;
