import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
// Soo dhoofso clearCart haddii aad u baahan tahay inaad cart-ka ka masaxdo guusha Order-ka
import { clearCart } from '../Store/Cart'; 

const BASE_URL = "https://fastbietres-1.onrender.com/api/history";

// ------------------------------------------------------------------
// 1. PLACE ORDER (USER)
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); 
      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}` 
          }
      };

      const response = await axios.post(`${BASE_URL}/orders`, orderData, config); 
      
      // Xaqiijin muhiim ah: Clear Cart markuu Order-ka guulaysto
      dispatch(clearCart()); 

      return response.data.order; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ------------------------------------------------------------------
// 2. FETCH ALL ORDERS (ADMIN DASHBOARD)
export const fetchAllOrders = createAsyncThunk(
  'order/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken'); // Isticmaal token-ka Admin-ka
      const config = {
          headers: {
              Authorization: `Bearer ${token}` 
          }
      };
      
      const response = await axios.get(`${BASE_URL}/admin/orders`, config); 
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ------------------------------------------------------------------
// 3. UPDATE ORDER STATUS (ADMIN)
export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ orderId, statusUpdateData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken'); 
      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}` 
          }
      };
      
      const response = await axios.put(
          `${BASE_URL}/admin/orders/${orderId}`, 
          statusUpdateData, 
          config
      ); 
      return response.data.order; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ------------------------------------------------------------------
// 4. FETCH USER ORDERS (USER HISTORY)
export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); 
      const config = {
          headers: {
              Authorization: `Bearer ${token}` 
          }
      };
      
      const response = await axios.get(`${BASE_URL}/orders/myorders`, config); 
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// ------------------------------------------------------------------

const orderSlice = createSlice({
  name: 'order',
  
  initialState: {
    // State-ka Admin-ka (Dashboard)
    allOrders: [],         
    allOrdersLoading: false, 
    allOrdersError: null,
    
    // State-ka User-ka (Profile History)
    userOrders: [],
    userOrdersLoading: false,
    userOrdersError: null,
    
    // State-ka Place Order
    currentOrder: null,
    orderLoading: false,
    orderError: null,
  },
  
  reducers: {
    // Waa la daafayaa, maadaama aysan jirin wax sync ah oo loo baahan yahay
  },
  
  extraReducers: (builder) => {
    builder
        // ----------------- PLACE ORDER -----------------
        .addCase(placeOrder.pending, (state) => {
            state.orderLoading = true;
            state.orderError = null;
        })
        .addCase(placeOrder.fulfilled, (state, action) => {
            state.orderLoading = false;
            state.currentOrder = action.payload;
            // Ku dar Order-ka cusub array-ga Orders-ka user-ka haddii la rabo
            state.userOrders.unshift(action.payload);
        })
        .addCase(placeOrder.rejected, (state, action) => {
            state.orderLoading = false;
            state.orderError = action.payload;
        })
        
        // ----------------- FETCH ALL ORDERS (ADMIN) -----------------
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

        // ----------------- UPDATE ORDER (ADMIN) -----------------
        .addCase(updateOrder.fulfilled, (state, action) => {
            // Cusbooneysii Order-ka la beddelay gudaha allOrders
            const updatedOrder = action.payload;
            const index = state.allOrders.findIndex(order => order._id === updatedOrder._id);
            if (index !== -1) {
                state.allOrders[index] = updatedOrder;
            }
        })
        
        // ----------------- FETCH USER ORDERS (USER) -----------------
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