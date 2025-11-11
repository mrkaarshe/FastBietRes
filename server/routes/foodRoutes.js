import express from "express";
import { getFoods, addFood, getFoodById } from "../controllers/foodController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { upload } from "../config/cloudinary.js";// hubi in folder-ka uu sax yahay
import { deleteFood } from "../controllers/foodController.js";

const router = express.Router();

router.get("/getfood", getFoods);
router.delete("/delete/:id", deleteFood);

router.post("/addFood", protect, adminOnly, upload.single("image"), addFood);
router.get("/:id", getFoodById);
export default router;
