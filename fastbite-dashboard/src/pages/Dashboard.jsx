"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Package, ShoppingCart, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"




import { ShoppingBag, CheckCircle, Clock, List, XCircle } from "lucide-react"

import { Button } from "../components/ui/button"
import { useToast } from "../hooks/use-toast"

export default function Dashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("https://fastbietres-1.onrender.com/api/history/admin/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (!res.ok) throw new Error("Failed to fetch orders")
      const orders = await res.json()
      setData(orders)
      console.log(data)
    } catch (err) {
      console.error(err)
      toast({
        title: "Error",
        description: "Failed to fetch orders",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // 🔹 Stats calculations
  const totalOrders = data.length
const totalPrice = data.reduce((sum, order) => {
  const orderTotal = order.items.reduce(
    (orderSum, item) => orderSum + (item.totalPrice || 0),
    0
  )
  return sum + orderTotal
}, 0)


  const pendingOrders = data.filter((o) => o.status === "Pending").length
  const confirmedOrders = data.filter((o) => o.status === "Confirmed").length
  const totalFoodItems = data.reduce(
    (acc, order) => acc + order.items.reduce((sum, i) => sum + i.quantity, 0),
    0
  )

  const handleStatusChange = (id, newStatus) => {
    setData(
      data.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    )
    toast({
      title: "Success",
      description: `Order #${id.slice(-6)} marked as ${newStatus}!`,
    })
  }

  return (
    <div className="p-6">
       <div className="mb-8">
        <h1 className="text-3xl mt-0 sm:mt-10 md:mt-0 font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your restaurant overview.</p>
      </div>
      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="bg-black border-zinc-800 p-5 hover:border-zinc-700 transition">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Orders</p>
              <h2 className="text-3xl font-bold text-white">{totalOrders}</h2>
            </div>
            <ShoppingBag className="h-10 w-10 text-yellow-500" />
          </CardContent>
        </Card>

        <Card className="bg-black border-zinc-800 p-5 hover:border-zinc-700 transition">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Orders</p>
              <h2 className="text-3xl font-bold text-yellow-400">{pendingOrders}</h2>
            </div>
            <Clock className="h-10 w-10 text-yellow-400" />
          </CardContent>
        </Card>

        <Card className="bg-black border-zinc-800 p-5 hover:border-zinc-700 transition">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Confirmed Orders</p>
              <h2 className="text-3xl font-bold text-green-400">{confirmedOrders}</h2>
            </div>
            <CheckCircle className="h-10 w-10 text-green-400" />
          </CardContent>
        </Card>

        <Card className="bg-black border-zinc-800 p-5 hover:border-zinc-700 transition">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Food Items</p>
              <h2 className="text-3xl font-bold text-blue-400">{totalFoodItems}</h2>
            </div>
            <List className="h-10 w-10 text-blue-400" />
          </CardContent>
        </Card>
                <Card className="bg-black border-zinc-800 p-5 hover:border-zinc-700 transition">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Food Items</p>
              <h2 className="text-3xl font-bold text-purple-500">{totalPrice}</h2>
            </div>
            <DollarSign className="h-10 w-10 text-purple-500" />
          </CardContent>
        </Card>
      </div>



      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className=" border-zinc-800  max-h-[400px] pb-5 overflow-auto bg-">
          <CardHeader>
            <CardTitle className="text-white">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
<div className="space-y-4 ">
  {data.map((item) => (
    <div
      key={item._id}
      className="flex items-center justify-between p-4 bg-black rounded-lg border border-zinc-800"
    >
      <div>
        <p className="font-medium text-white">Order #{item._id.slice(-6)}</p>

        {/* items badankood */}
        {item.items.map((food, i) => (
          <p key={i} className="text-sm text-gray-400">
            {food.productTitle} x {food.quantity}
          </p>
        ))}

        {/* Contact name (Optional, looks nice) */}
        <p className="text-xs text-gray-300 mt-1">
         Ordred: <span className="text-xs text-gray-400">{new Date  (item.createdAt).toLocaleString()}</span>
        </p>
        <p className="text-xs text-gray-300">peyment <span className="text-xs text-gray-400">{item.paymentMethod}</span></p>
      </div>

      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full border ${
          item.status === "Pending"
            ? "bg-yellow-400/10 text-yellow-400 border-yellow-400/20"
            : "bg-green-400/10 text-green-400 border-green-400/20"
        }`}
      >
        {item.status}
      </span>
    </div>
  ))}
</div>

          </CardContent>
        </Card>

        <Card className="bg- border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Popular Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Burger Deluxe", "Margherita Pizza", "Caesar Salad"].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-black rounded-lg border border-zinc-800"
                >
                  <div>
                    <p className="font-medium text-white">{item}</p>
                    <p className="text-sm text-gray-400">{45 - i * 5} orders</p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

  )
}
