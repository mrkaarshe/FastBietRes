import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDB.js";
import router from "./routers/authRout.js";
import userRouter from "./routers/userRoutes.js";

const app = express();

const allowedOrigins = ['https://fast-biet-res.vercel.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 4000;

connectDB();

app.get('/', (req, res) => {
  res.send('hello from server');
  console.log('hello from server');
});

app.use('/api/auth', router);
app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
