import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import fs from "fs";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import orderRouter from "./routes/orderRouter.js";
import userOrderRouter from "./routes/userOrderRoutes.js";
import router from "./routes/contactRouter.js";
import { deleteOrder } from "./controllers/userOrderController.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Static folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/history", orderRouter);
app.use("/api/userOrders", userOrderRouter);
app.use('/api/contact', router); // Updated route for contact form submission
app.delete('/api/userOrders/orders/:orderId', deleteOrder);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "✅ API running successfully!" });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
