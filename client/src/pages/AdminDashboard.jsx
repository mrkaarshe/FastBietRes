import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "../Store/orderSlice";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const { error } = useSelector((state) => state.adminOrders);
  const { user } = useSelector((state) => state.user);

  // Fetch orders
  const fetchData = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch(
        "https://fastbietres-1.onrender.com/api/history/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast.error("Access denied. Admins only.");
      return;
    }
    fetchData();
  }, [user]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrder({ orderId, statusUpdateData: { status: newStatus } }))
      .unwrap()
      .then(() => {
        toast.success("Order status updated!");
        fetchData();
      })
      .catch(() => toast.error("Failed to update order status."));
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(
        `https://fastbietres-1.onrender.com/api/history/admin/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete order");

      toast.success("Order deleted successfully!");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete order.");
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center text-red-500 mt-10 text-lg font-semibold">
        You do not have permission to view this page.
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto min-h-[70vh] mt-20 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400 text-center">
        Admin Dashboard - Orders
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={fetchData}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
        >
          Refresh Orders
        </button>
      </div>

      {loadingOrders && (
        <p className="text-center text-white">Loading orders...</p>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loadingOrders && !error && orders.length === 0 && (
        <p className="text-gray-400 text-center">No orders found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border border-gray-700 p-4 rounded-lg max-w-7xl min-h-[50vh] max-h-100 my-10 overflow-auto mx-auto">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-6 rounded-xl shadow-lg border border-gray-700 h-80 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-yellow-400 font-semibold mb-2 text-lg truncate">
                Order ID: {order._id.slice(21)}...
              </h2>
              <p className="text-gray-300 mb-1">
                <strong>Name:</strong> {order.contact?.firstName}{" "}
                {order.contact?.lastName}
              </p>
              <p className="text-gray-300 mb-1">
                <strong>Email:</strong> {order.contact?.email || "N/A"}
              </p>
              <p className="text-gray-300 mb-1">
                <strong>Phone:</strong> {order.contact?.phone || "N/A"}
              </p>
              <p className="text-gray-300 mb-1">
                <strong>Address:</strong> {order.contact?.address},{" "}
                {order.contact?.city}
              </p>
              <p className="text-gray-300 mb-2">
                <strong>Items:</strong>{" "}
                {order.items
                  .map((item) => `${item.productTitle} (x${item.quantity})`)
                  .join(", ")}
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Placed: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <span
                className={`px-3 py-2 rounded text-sm font-semibold ${
                  order.status === "Pending"
                    ? "bg-yellow-500 text-black"
                    : order.status === "Confirmed"
                    ? "bg-green-600 text-white"
                    : order.status === "Delivered"
                    ? "bg-blue-600 text-white"
                    : order.status === "Cancelled"
                    ? "bg-red-600 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {order.status}
              </span>

              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 focus:outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button
                onClick={() => handleDeleteOrder(order._id)}
                className="text-red-500 hover:text-red-700 ml-2"
                title="Delete Order"
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
