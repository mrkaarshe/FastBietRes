import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: String,
      productTitle: String,
      quantity: Number,
      status: { type: String, default: "Pending" }, // item-level status
    }
  ],
status: {
  type: String,
  enum: ["Pending", "Delivered", "Confirmed", "Cancelled"], // note the capital "P"!
  default: "Pending",
},

  contact: {
    email: String,
    address: String,
    city: String,
    phone: String,
    firstName: String,
    lastName: String,
    postal: String,
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
