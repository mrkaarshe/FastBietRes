import express from "express";
import { authenticateUser, authenticateAdmin } from "../middleware/userMiddleware.js";
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// USER: place an order
router.post("/orders", authenticateUser, placeOrder);

// USER: get orders of logged-in user
router.get("/orders/myorders", authenticateUser, getUserOrders);

// ADMIN: get all orders
router.get("/admin/orders", authenticateAdmin, getAllOrders);

// ADMIN: update order status
router.put("/admin/orders/:orderId", authenticateAdmin, updateOrderStatus);


router.delete("/admin/orders/:orderId", authenticateAdmin, deleteOrder)


export default router;
