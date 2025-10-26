import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import connectDB from "./db.js";
import { loginUser, registerUser } from "./adminController.js";
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.post('/api/user/register',registerUser)
app.post('/api/user/login',loginUser)

 
app.get("/", (req, res) => {
  res.json({ message: "✅ API running successfully!" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
