import express from "express"
import Food from "../models/Food.js"

const router = express.Router()

// Get all foods
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 })
    res.json(foods)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single food
router.get("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id)
    if (!food) {
      return res.status(404).json({ message: "Food not found" })
    }
    res.json(food)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create food
router.post("/", async (req, res) => {
  try {
    const food = new Food(req.body)
    const newFood = await food.save()
    res.status(201).json(newFood)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update food
router.put("/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!food) {
      return res.status(404).json({ message: "Food not found" })
    }
    res.json(food)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete food
router.delete("/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id)
    if (!food) {
      return res.status(404).json({ message: "Food not found" })
    }
    res.json({ message: "Food deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
