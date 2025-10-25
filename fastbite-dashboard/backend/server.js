import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import foodRoutes from "./routes/foodRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/fastbite")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err))

// Routes
app.use("/api/foods", foodRoutes)
app.use("/api/orders", orderRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "FastBite API is running" })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
