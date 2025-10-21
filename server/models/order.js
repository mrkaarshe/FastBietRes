import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  status: { type: String, default: "Pending" },  // Pending, Confirmed, etc.
  createdAt: { type: Date, default: Date.now },
  // add other fields if necessary (userId, price, etc)
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
