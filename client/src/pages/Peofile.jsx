import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/userSlice";
import { FiRefreshCcw } from "react-icons/fi";
import { clearCart } from "../Store/Cart";
import { LuLayoutDashboard } from "react-icons/lu";
import { ShoppingBag } from "lucide-react"
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
    localStorage.removeItem('token')
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
          {user?.role === "admin" &&(   
              <p className="text-yellow-500 font-light flex items-center gap-2 mb-2">
           <LuLayoutDashboard/> <a className="text-white" href="https://fast-biet-res-admin-dahshboard.vercel.app/login">Admin Dashboard</a>
          </p>)}
        </div>

        {/* Quick Actions */}
        <div className="p-4 bg-black shadow-2xl border border-gray-600 rounded-2xl flex flex-col gap-3">
          <h3 className="text-xl font-semibold mb-3 text-yellow-500">
            Quick Actions
          </h3>
          <button
            onClick={() => navigate("/menu")}
            className="px-4 py-2 rounded bg-transparent border border-zinc-800 hover:text-yellow-500 transition"
          >
            View Menu
          </button>
          <button
            onClick={() => dispatch(clearCart())}
            className="px-4 py-2 rounded bg-transparent border border-zinc-800 hover:text-yellow-500 transition"
          >
            Clear Cart
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-red-500 border border-zinc-800 rounded hover:text-gray-300 transition"
          >
            Sign Out
          </button>
        </div>

        {/* Summary */}
<div className="p-4 bg-black shadow-2xl border border-gray-600 rounded-2xl transition-all hover:shadow-xl">
  <p className="text-yellow-400 text-lg font-semibold">Summary</p>

  <div className="flex justify-between items-center gap- mt-4">
    
    <div className="flex justify-between items-center gap-2">
      <h2 className="flex justify-center items-center text-xl gap-1 text-white font-medium">
        Total Orders
        <span className="text-2xl font-bold text-yellow-400"> {orders.length}</span>
      </h2>
    </div>
    
    <div className="p-4 bg-yellow-400 rounded-full shadow-lg hover:shadow-xl">
      <ShoppingBag className="h-10 w-10 text-gray-800" />
    </div>
    
  </div>
</div>

      </div>

      {/* ORDER HISTORY */}
<div className="p-4 bg-black shadow-2xl border border-gray-600 rounded-2xl md:col-span-3 max-h-80 overflow-auto">
<div className="flex justify-center relative">
    <h3 className="text-3xl border-b pb-3 border-white mb-5 m mx-auto font-semibold text-center text-yellow-500">Order History</h3>
  <button
  onClick={() => dispatch(fetchUserOrders())}
  className={`h-10 w-10 flex items-center justify-center absolute right-0 
    ${loading ? "animate-spin" : ""}`}
>
  <FiRefreshCcw size={20} />
</button>

</div>
  {loading && <p className="text-slate-400 text-center" >Loading your orders...</p>}
  {error && <p className="text-red-500">{error}</p>}
  {!loading && !error && orders.length === 0 && (
    <p className="text-slate-400 text-center">No orders found.</p>
  )}

  {!loading && !error && orders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-h-[420px]  overflow-auto">
      {!loading ? (
  orders.map((item) => {
    const total = item.items.reduce((sum, f) => sum + (f.totalPrice || 0), 0)

    return (
      <div
        key={item._id}
        className="bg-zinc-950 border border-zinc-700 rounded-2xl p-5 hover:border-yellow-400/40 transition-all duration-300 shadow-md hover:shadow-yellow-400/10"
      >
        {/* Order Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">
            Order #{item._id.slice(21)}
          </h3>

          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full border transition ${
              item.status === "Pending"
                ? "bg-yellow-400/10 text-yellow-400 border-yellow-400/30"
                : "bg-green-400/10 text-green-400 border-green-400/30"
            }`}
          >
            {item.status}
          </span>
        </div>

        {/* Order Items */}
        <div className="space-y-1 mb-4">
          {item.items.map((food, i) => (
            <p
              key={i}
              className="text-sm text-gray-300 flex justify-between"
            >
              {food.productTitle} 
              <span className="text-gray-400">x{food.quantity}</span>
            </p>
          ))}
        </div>

        {/* Info */}
        <div className="text-xs text-gray-400 space-y-1 border-t border-zinc-800 pt-3">
          <p>
            Ordered:{" "}
            <span className="text-gray-300">
              {new Date(item.createdAt).toLocaleString()}
            </span>
          </p>
          <p>
            Payment:{" "}
            <span className="text-gray-300">{item.paymentMethod}</span>
          </p>
          <p className="text-sm font-semibold text-yellow-400 pt-1">
            Total${total.toFixed(2)}
          </p>
        </div>
      </div>
    )
  })) : (<div className="flex justify-center items-center w-full min-h-full font-bold text-xl">fetching orders </div>)}
</div>

  )}
</div>

    </div>
  );
};

export default Profile;
