import express from "express"
import Order from "../models/Order.js"

const router = express.Router()

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.foodId").sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single order
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.foodId")
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body)
    const newOrder = await order.save()
    res.status(201).json(newOrder)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update order status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.json(order)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete order
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.json({ message: "Order deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
