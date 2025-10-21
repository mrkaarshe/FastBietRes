import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../Store/adminOrdersSlice";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.role !== "admin") {
      toast.error("Access denied. Admins only.");
      // You can add redirect here if needed
      return;
    }
    dispatch(fetchAllOrders());
  }, [dispatch, user]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }))
      .unwrap()
      .then(() => toast.success("Order status updated!"))
      .catch(() => toast.error("Failed to update order status."));
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
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-700 rounded p-6 bg-black text-gray-300 flex justify-between items-start gap-6"
            >
              {/* Order Info */}
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <p>
                  <strong>Order ID:</strong> {order._id.slice(-6)}
                </p>
                <p>
                  <strong>User:</strong> {order.userName || order.userEmail || "Unknown"}
                </p>
                <p>
                  <strong>Items:</strong>{" "}
                  <span className="inline-block max-w-full overflow-x-auto whitespace-nowrap">
                    {order.items.map((item) => `${item.title} (x${item.quantity})`).join(", ")}
                  </span>
                </p>
              </div>

              {/* Status Badge and Update */}
              <div className="flex flex-col items-end gap-4 min-w-[160px]">
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold ${
                      order.status === "Pending"
                        ? "bg-yellow-500 text-black"
                        : order.status === "Confirmed"
                        ? "bg-green-600 text-white"
                        : order.status === "Delivered"
                        ? "bg-blue-500 text-white"
                        : order.status === "Cancelled"
                        ? "bg-red-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>

                <div className="flex flex-col items-end">
                  <label
                    htmlFor={`status-${order._id}`}
                    className="mb-1 text-sm text-gray-400"
                  >
                    Update Status
                  </label>
                  <select
                    id={`status-${order._id}`}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
