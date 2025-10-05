import dotenv from 'dotenv';
dotenv.config();

import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from "./config/mongoDB.js";
import router from './routers/authRout.js';
import userRouter from './routers/userRoutes.js';


const app = express()
app.use(express.json())
app.use(cors({
  origin: 'https://fast-biet-res.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
const allowedOrigns = ['https://fastbietres.onrender.com/']
app.use(cookieParser())

const port = process.env.PORT || 4000;

connectDB()


app.get('/',(req,res) =>{
    res.send('hello from server')
    console.log('hello from server')
})

app.use('/api/auth',router)
app.use('/api/user',userRouter);


app.listen(port , ()=>{
    console.log(`app listenin on  ${port}`)
})