import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegCircleCheck } from "react-icons/fa6";
import { logout } from '../Store/userSlice';
import { clearCart } from '../Store/Cart';
import { statusUpdate } from "../Store/Cart";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { MdOutlineManageAccounts } from "react-icons/md";
import { FiUser } from "react-icons/fi"
import { AiOutlineMail } from "react-icons/ai";

const Profile = () => {
  const cart = useSelector((state) => state.cart.items);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cart.length === 0) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts = await Promise.all(
          cart.map(async (item) => {
            const response = await fetch(`https://fastbietres-1.onrender.com/api/foods/${item.productId}`);
            if (!response.ok) throw new Error("Failed to fetch product");
            return await response.json();
          })
        );
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cart]);

  const cartWithDetails = cart.map((item) => {
    const product = products.find((p) => p._id === item.productId);
    return {
      ...item,
      title: product?.title || "Loading...",
      price: product?.price || 0,
    };
  });

  const totalOrders = cart.length;
  const totalAmount = cartWithDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // UPDATED: Handle Confirm Order with async dispatch & toast
  const handleConfirmOrder = async (productId) => {
    try {
      await dispatch(statusUpdate({ productId, status: "Confirmed" })).unwrap();
      toast.success("Order confirmed successfully!");
    } catch (error) {
      toast.error("Failed to confirm order.");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate('/home');
    toast.success("Logged out successfully");
  };

  const handleClearCart = () => {
    if (cart.length === 0) {
      toast.info("Cart is already empty");
      return;
    }
    dispatch(clearCart());
    toast.success("Cart cleared successfully");
  };

  return (
    <div className="p-6 text-gray-300 space-y-6 min-h-[95vh] font-Poppins px-4 max-w-7xl mx-auto">
      <div className="mt-30">
        <p className="text-xl text-gray-300">
          Welcome, <strong className="text-yellow-500 text-2xl">@{user.name}</strong>
        </p>
        <p className="text-gray-400 text-sm">
          Manage your account and view your order history
        </p>
      </div>

      {/* Grid top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="p-4 bg-black shadow-2xl border border-gray-600 rounded-2xl">
          <h3 className="text-xl font-semibold mb-3 text-yellow-500">Profile Information</h3>
          <p className="text-yellow-500 font-light flex  items-center gap-2 mb-2">
            <FiUser /> <strong className="text-gray-300">@{user.name}</strong>
          </p>
          <p className="text-yellow-500 font-light flex  items-center gap-2 mb-2">
            <AiOutlineMail /> <strong className="text-gray-300">{user.email}</strong>
          </p>
          <p className="text-yellow-500 font-light flex  items-center gap-2 mb-2">
            <MdOutlineManageAccounts /> <strong className="text-gray-300">{user.role}</strong>
          </p>
        </div>

        {/* Quick Actions */}
        <div className="p-4 bg-black shadow-2xl border border-gray-600 rounded-2xl">
          <h3 className="text-xl font-semibold mb-3 text-yellow-500">Quick Actions</h3>
          <div className="flex flex-col gap-2 mt-5">
            <button
              onClick={() => navigate('/menu')}
              className="px-4 py-2 rounded bg-transparent border border-gray-800 hover:text-yellow-500 transition"
            >
              View Menu
            </button>
            <button
              onClick={handleClearCart}
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
        </div>

        {/* Order Summary */}
        <div className="p-4 bg-black shadow-2xl border border-gray-600 rounded-2xl">
          <h3 className="text-xl text-yellow-500 font-semibold mb-3">Order Summary</h3>
          <div className="flex flex-col justify-center items-center pt-5">
            {loading && <p className="text-slate-400">Loading products...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <>
                <p>Total Orders: <span className="text-2xl font-bold text-yellow-500">{totalOrders}</span></p>
                <p>Total: ${totalAmount.toFixed(2)}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="p-4 bg-black shadow-2xl border border-gray-600 rounded-2xl md:col-span-3 max-h-90 py-10 overflow-auto">
        <h3 className="text-xl font-semibold mb-3 text-yellow-500">Order History</h3>
        {loading && <p className="text-slate-400">Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            {cartWithDetails.length === 0 ? (
              <p className="text-slate-400">No orders yet.</p>
            ) : (
              <div className="space-y-4">
                {cartWithDetails.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-gray-800 rounded flex justify-between sm:flex-row gap-3"
                  >
                    <div className="flex flex-col gap-3">
                      <p className="font-semibold text-sm">
                        Order #{item.title}
                        <span
                          className={`ml-2 px-2 py-1 gap-3 max-w-23 text-xs rounded ${
                            item.status === "Pending"
                              ? "bg-green-300 gap-3 text-black"
                              : "bg-yellow-300 text-black"
                          }`}
                        >
                          {item.status}
                        </span>
                      </p>
                      <p className="text-slate-400 text-xs">
                        {(() => {
                          if (!item.createdAt) return "Time not available";
                          const diffMins = Math.floor((Date.now() - new Date(item.createdAt)) / 60000);
                          return diffMins <= 1 ? "Just now" : `${diffMins} minutes ago`;
                        })()} – {item.quantity} item(s) – ${(
                          item.price * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>

                    {/* Confirm Button (only for admin) */}
                    {user.role === "admin" && (
                      <button
                        onClick={() =>
                          item.status === "Pending" && handleConfirmOrder(item.productId)
                        }
                        className={`px-3 py-1 text-xs rounded transition ${
                          item.status === "Pending"
                            ? "border border-green-500 text-green-500 hover:text-white "
                            : "text-green-500"
                        }`}
                        disabled={item.status !== "Pending"}
                      >
                        {item.status === "Pending" ? "Confirm Order" : <FaRegCircleCheck size={20} />}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
