// routes/orderRouter.js

import express from 'express';
// sax oo sax ah:
import { updateOrderStatus , getAllOrders } from '../controllers/orderController.js';
import { createOrder } from '../controllers/orderController.js';


const router = express.Router();

router.post('/orders', createOrder);

router.get('/orders', getAllOrders);
router.patch('/orders/:orderId/status', updateOrderStatus);

export default router;

