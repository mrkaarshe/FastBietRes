import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "../Store/orderSlice";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const { error } = useSelector((state) => state.adminOrders);
  const { user } = useSelector((state) => state.user);

  // Fetch orders from backend
  const fetchData = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch("https://fastbietres-1.onrender.com/api/history/admin/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrder(data); // or setOrder(data.data) if response is { data: [...] }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  // Run on mount
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
        fetchData(); // refresh after update
      })
      .catch(() => toast.error("Failed to update order status."));
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(`https://fastbietres-1.onrender.com/history/admin/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete order");

      toast.success("Order deleted successfully!");
      fetchData(); // Refresh list
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
    <div className="p-6 mx-auto min-h-[70vh] mt-20">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400 text-center">
        Admin Dashboard - Orders
      </h1>

      {loadingOrders && <p className="text-center text-white">Loading orders...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loadingOrders && !error && order.length === 0 && (
        <p className="text-gray-400 text-center">No orders found.</p>
      )}

      <div className="overflow-x-auto relative rounded-xl">
        <button
          onClick={fetchData}
          className="bg-blue-500 hover:bg-blue-600 flex flex-1 text-white px-4 py-2 rounded-md mt-4"
        >
          Refresh Orders
        </button>
        <table className="min-w-full text-white border-2 max-h-[70vh] overflow-auto rounded-xl border-gray-600 ">
          <thead className="bg-gray-200 text-gray-800 h-20 rounded-xl">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Items</th>
              <th className="px-4 py-2 text-left">Placed</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Change Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order) => (
              <tr key={order._id}>
                <td className="px-4 py-2">{order._id.slice(3)}_</td>
                <td className="px-4 py-2">
                  {order.contact?.firstName || ""} {order.contact?.lastName || ""}
                </td>
                <td className="px-4 py-2">{order.contact?.email || "N/A"}</td>
                <td className="px-4 py-2">{order.contact?.phone || "N/A"}</td>
                <td className="px-4 py-2">
                  {order.contact?.address}, {order.contact?.city}
                </td>
                <td className="px-4 py-2">
                  {order.items
                    .map((item) => `${item.productTitle || "Food"} (x${item.quantity})`)
                    .join(", ")}
                </td>
                <td className="px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      order.status === "Pending"
                        ? "bg-yellow-500 text-black"
                        : order.status === "Confirmed"
                        ? "bg-green-500 text-white"
                        : order.status === "Delivered"
                        ? "bg-blue-500 text-white"
                        : order.status === "Cancelled"
                        ? "bg-red-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="hover:text-red-600 text-white px-3 py-1 rounded"
                  >
                    <FaTrash/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
