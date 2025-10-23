import jwt from "jsonwebtoken";
import User from "../models/User.js";

// USER Middleware
export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// ADMIN Middleware
export const authenticateAdmin = async (req, res, next) => {
  try {
    // Marka hore hubi in uu user yahay mid la xaqiijiyay
    await authenticateUser(req, res, async () => {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admins only" });
      }
      next();
    });
  } catch (error) {
    console.error("Admin authentication error:", error);
    res.status(403).json({ message: "Access denied" });
  }
};
