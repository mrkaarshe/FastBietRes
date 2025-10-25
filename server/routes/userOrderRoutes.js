import express from "express";
import { createUserOrder, deleteOrder, getUserOrders } from "../controllers/userOrderController.js";
import { authenticateUser, isAuthenticated } from "../middleware/usreOrderMiddlewares.js";

const router = express.Router();

router.post("/orders", authenticateUser, createUserOrder);
router.delete("/orders/:orderId", authenticateUser, deleteOrder);


router.get("/getOrders", authenticateUser, getUserOrders);
router.get("/profile", isAuthenticated, (req, res) => {
  res.send(`Welcome back, ${req.user.name}!`);
});
export default router;
