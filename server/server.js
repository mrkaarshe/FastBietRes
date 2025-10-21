import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import fs from "fs";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import orderRouter from "./routes/orderRouter.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Static uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/history", orderRouter); // Order routes: POST, GET, PATCH

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API running successfully!" });
});

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
