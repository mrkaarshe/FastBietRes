import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Food from "../models/Food.js";
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token
      console.log("Authorization Header: ", req.headers.authorization);

      // Validate the token format (check if it's a string and has 3 parts)
      if (!token || token.split('.').length !== 3) {
        return res.status(401).json({ message: "Token malformed" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Token invalid or expired" });
      console.log(error);
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};


export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    await food.remove();
    res.json({ message: "Food deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



