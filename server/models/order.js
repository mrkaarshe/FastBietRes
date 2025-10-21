import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: String,
      title: String,
      quantity: Number,
      price: Number
    }
  ],
  subtotal: Number,
  delivery: Number,
  taxes: Number,
  total: Number,
  status: { type: String, enum: ["Pending", "Confirmed", "Delivered"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
