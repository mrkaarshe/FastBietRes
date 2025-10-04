import express from 'express';
const userRouter = express.Router();
import userAuth from '../middleware/userAuth.js';
import { getUserDetails } from '../controllers/userController.js';
userRouter.get('/data', userAuth, getUserDetails);

export default userRouter;