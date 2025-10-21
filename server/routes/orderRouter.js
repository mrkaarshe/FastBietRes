import express from "express";
import { createOrder, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders", getAllOrders); // For Admin dashboard
router.patch("/orders/:orderId/status", updateOrderStatus);

export default router;
