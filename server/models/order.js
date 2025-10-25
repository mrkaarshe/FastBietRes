import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food", // or your product model
          required: true,
        },
        productTitle: { type: String, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number },
        status: { type: String, default: "Pending" },
      },
    ],
    contact: {
      email: { type: String, required: true },
      firstName: { type: String },
      lastName: { type: String },
      country: { type: String, default: "Somalia" },
      district: { type: String, required: true },
      address: { type: String, required: true },
      currency : {type :String },
      phone: { type: String, required: true },
      
    },
    paymentMethod: { 
      type: String, 
      enum: ["EVC", "BusinessAccount", "MobileMoney", "eDahab"], 
      required: true 
    },
    
    status: {
      type: String,
      default: "Pending", // Pending, Processing, Completed, Cancelled
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
