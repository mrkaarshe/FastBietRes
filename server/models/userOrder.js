import mongoose from "mongoose";

const userOrderSchema = new mongoose.Schema(
  {
    // user-ka sameeyay order-ka
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // liiska alaabta uu dalbaday
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
        productTitle: { type: String, required: true },
        quantity: { type: Number, required: true },
        status: {
          type: String,
          enum: ["Pending", "Confirmed", "Delivered", "Cancelled"],
          default: "Pending",
        },
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: false } } // Kaliya createdAt
);

export default mongoose.model("UserOrder", userOrderSchema);
