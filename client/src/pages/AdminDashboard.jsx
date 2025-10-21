import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../Store/adminOrdersSlice";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminOrders);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (user?.role !== "admin") {
      toast.error("Access denied. Admins only.");
      // Redirect logic here if you want
      return;
    }
    dispatch(fetchAllOrders());
  }, [dispatch, user]);

  const handleConfirmOrder = (orderId) => {
    dispatch(updateOrderStatus({ orderId, status: "Confirmed" }))
      .unwrap()
      .then(() => {
        toast.success("Order confirmed!");
      })
      .catch(() => {
        toast.error("Failed to update order status");
      });
  };

  if (!user || user.role !== "admin") {
    return <p className="text-red-500">You do not have permission to view this page.</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-yellow-500">Admin Dashboard - Orders</h1>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && orders.length === 0 && <p>No orders found.</p>}

      {!loading && !error && orders.length > 0 && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-700 rounded p-4 bg-black text-gray-300 flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Order ID:</strong> {order._id.slice(-6)}
                </p>
                <p>
                  <strong>User:</strong> {order.userName || order.userEmail || "Unknown"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`px-2 py-1 rounded ${
                    order.status === "Pending" ? "bg-yellow-500 text-black" :
                    order.status === "Confirmed" ? "bg-green-500 text-white" :
                    "bg-gray-500 text-white"
                  }`}>
                    {order.status}
                  </span>
                </p>
                <p>
                  <strong>Items:</strong> {order.items.map(item => `${item.title} (x${item.quantity})`).join(", ")}
                </p>
              </div>

              <div>
                {order.status === "Pending" && (
                  <button
                    onClick={() => handleConfirmOrder(order._id)}
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
                  >
                    Confirm Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
