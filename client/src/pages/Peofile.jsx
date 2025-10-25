import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/userSlice";
import { clearCart } from "../Store/Cart";
import {
  fetchUserOrders,
  deleteUserOrder,
  clearUserOrders,
} from "../Store/userOrdersSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.userOrders);
  

  // Fetch user orders on mount
  useEffect(() => {
    if (!user) return;
    dispatch(fetchUserOrders());
  }, [user, dispatch]);

  // Delete order handler
  const handleDeleteOrder = (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    console.log("Delete Order Response:", orderId);

    dispatch(deleteUserOrder(orderId));
  };

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearUserOrders());
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/home");
    toast.success("Logged out successfully");
  };

  if (!user) {
    return (
      <div className="p-6 text-gray-300 text-center mt-20">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-gray-300 space-y-6 min-h-[95vh] font-Poppins px-4 max-w-7xl mx-auto">
      <div className="mt-20">
        <p className="text-xl text-gray-300">
          Welcome,{" "}
          <strong className="text-yellow-500 text-2xl">@{user.name}</strong>
        </p>
        <p className="text-gray-400 text-sm">
          Manage your account and view your order history
        </p>
      </div>

      {/* GRID SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="p-4 bg-black shadow-2xl border border-gray-600 rounded-2xl">
          <h3 className="text-xl font-semibold mb-3 text-yellow-500">
            Profile Information
          </h3>
          <p className="text-yellow-500 font-light flex items-center gap-2 mb-2">
            <FiUser /> <strong className="text-gray-300">@{user.name}</strong>
          </p>
          <p className="text-yellow-500 font-light flex items-center gap-2 mb-2">
            <AiOutlineMail /> <strong className="text-gray-300">{user.email}</strong>
          </p>
          <p className="text-yellow-500 font-light flex items-center gap-2 mb-2">
            <MdOutlineManageAccounts />{" "}
            <strong className="text-gray-300">{user.role}</strong>
          </p>
        </div>

        {/* Quick Actions */}
        <div className="p-4 bg-black shadow-2xl border border-gray-600 rounded-2xl flex flex-col gap-3">
          <h3 className="text-xl font-semibold mb-3 text-yellow-500">
            Quick Actions
          </h3>
          <button
            onClick={() => navigate("/menu")}
            className="px-4 py-2 rounded bg-transparent border border-gray-800 hover:text-yellow-500 transition"
          >
            View Menu
          </button>
          <button
            onClick={() => dispatch(clearCart())}
            className="px-4 py-2 rounded bg-transparent border border-gray-800 hover:text-yellow-500 transition"
          >
            Clear Cart
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-red-500 border border-gray-800 rounded hover:text-gray-300 transition"
          >
            Sign Out
          </button>
        </div>

        {/* Summary */}
        <div className="p-4 bg-black shadow-2xl border border-gray-600 rounded-2xl">
          <h3 className="text-xl text-yellow-500 font-semibold mb-3">Summary</h3>
          <p>
            Total Orders:{" "}
            <span className="text-yellow-500 font-bold">{orders.length}</span>
          </p>
        </div>
      </div>

      {/* ORDER HISTORY */}
<div className="p-4 bg-black shadow-2xl border border-gray-600 rounded-2xl md:col-span-3 max-h-80 overflow-auto">
  <h3 className="text-3xl border-b pb-3 border-white mb-5 max-w-sm mx-auto font-semibold text-center text-yellow-500">Order History</h3>

  {loading && <p className="text-slate-400 text-center" >Loading your orders...</p>}
  {error && <p className="text-red-500">{error}</p>}
  {!loading && !error && orders.length === 0 && (
    <p className="text-slate-400 text-center">No orders found.</p>
  )}

  {!loading && !error && orders.length > 0 && (
  <div className="space-y-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  {orders.map((order) => (
    <div
      key={order._id}
      className="p-3 border flex flex-col h-50  border-gray-800 rounded"
    >
      <p className="font-semibold text-sm mb-1 text-yellow-500">
        Order ID: {order._id.slice(21)}
      </p>


      {/* ORDER STATUS */}
      
        <div className="space-y-1">
        {order.items.map((item, idx) => (
          <p key={idx} className="text-gray-50 text-md">
           Food : <span className="text-gray-400">{item.productTitle} x {item.quantity}</span>
          </p>
        ))}
     
         <p className="text-gray-100 text-md">
           Status :
        <span
          className={`ml-2 px-2 py-0.5 rounded text-xs ${
            order.status === "Pending"
              ? "bg-yellow-500 text-black"
              : order.status === "Confirmed"
              ? "bg-green-500 text-white"
              : order.status === "Delivered"
              ? "bg-blue-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {order.status}
        </span>
      </p>

     
         
        <p className="text-slate-100 text-md mb-1">
        Ordred: <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</span>
      </p>
 

      {/* ITEMS */}


      {/* Delete button - only for orders with status "Pending" */}
      
        <button
          onClick={() => handleDeleteOrder(order._id)}
          className="mt-3 px-3 py-2 text-xs w-full rounded border border-red-500 text-gray-100 hover:bg-red-500 hover:text-white transition"
        >
          Delete Order
        </button>
  </div>
    </div>
  ))}
</div>
  )}
</div>

    </div>
  );
};

export default Profile;
