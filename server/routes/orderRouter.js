import express from "express";
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";
import { authenticateUser, authenticateAdmin } from "../middleware/userMiddleware.js";

const router = express.Router();

// USER routes
router.post("/orders", placeOrder);
router.get("/orders/myorders", authenticateUser, getUserOrders);

router.get("/admin/orders", authenticateAdmin, getAllOrders);
router.put("/admin/orders/:orderId", authenticateAdmin, updateOrderStatus);
router.delete("/admin/orders/:orderId", authenticateAdmin, deleteOrder);

export default router;
