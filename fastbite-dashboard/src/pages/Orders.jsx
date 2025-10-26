"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Trash2, Clock } from "lucide-react"
import { Button } from "../components/ui/button"
import { useToast } from "../hooks/use-toast"

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch("https://fastbietres-1.onrender.com/api/history/admin/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      if (!res.ok) throw new Error("Failed to fetch orders")
      const data = await res.json()
      setOrders(data)
    } catch (err) {
      toast({ title: "Error", description: "Failed to fetch orders", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`https://fastbietres-1.onrender.com/api/history/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error("Failed to update order")
      toast({ title: "Order updated", description: `Status changed to ${newStatus}` })
      fetchOrders()
    } catch {
      toast({ title: "Error", description: "Failed to update order", variant: "destructive" })
    }
  }

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return
    try {
      const res = await fetch(`https://fastbietres-1.onrender.com/api/history/admin/orders/${orderId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      if (!res.ok) throw new Error("Failed to delete order")
      toast({ title: "Deleted", description: "Order removed successfully" })
      fetchOrders()
    } catch {
      toast({ title: "Error", description: "Failed to delete order", variant: "destructive" })
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500"
      case "Confirmed":
        return "text-green-500"
      case "Delivered":
        return "text-blue-500"
      case "Cancelled":
        return "text-red-500"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4 mr-1 text-yellow-500" />
      case "Confirmed":
        return <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
      case "Delivered":
        return <CheckCircle className="w-4 h-4 mr-1 text-blue-500" />
      case "Cancelled":
        return <XCircle className="w-4 h-4 mr-1 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="p-6 min-h-[20vh] ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <Button onClick={fetchOrders} className="bg-zinc-700  text-white rounded-2xl">
          Refresh Orders
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-400">No orders found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full text-left text-sm border-collapse rounded-lg">
            <thead className="bg-zinc-900 text-gray-400 uppercase text-sm">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Curency</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Placed</th>
                <th className="px-4 py-3">TotalPrice</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-zinc-800 hover:bg-zinc-800 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-200 font-medium">{order._id.slice(-6)}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {order.contact?.firstName} {order.contact?.lastName}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{order.contact?.email}</td>
                  <td className="px-4 py-3 text-gray-400">{order.contact?.phone}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {order.items.map((item) => `${item.productTitle} (x${item.quantity})`).join(", ")}
                  </td>
                  <td className="px-4 py-3 text-gray-300">{order.paymentMethod}</td>
                  <td className="px-4 py-3 text-gray-300">{order.contact?.currency}</td>


                  {/* STATUS COLUMN */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`bg-zinc-900 text-sm border border-zinc-700 rounded-md px-2 py-1 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 ${getStatusColor(order.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-gray-400">
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
            <td className="px-4 py-3 text-gray-300">
              {order.items
                .map((item) => {
                  const price = item.totalPrice ? item.totalPrice.toFixed(2) : "0.00"
                  return `$${price}`
                })
                .join(", ")}
            </td>
                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteOrder(order._id)}
                      className="flex items-center gap-1  hover:bg-zinc-700 text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
