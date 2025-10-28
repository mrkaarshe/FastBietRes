import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    name: { type: String },  // Name is optional
    email: { type: String, required: true },  // Email is required  // Password is required
    message: { type: String, required: true },  // Message is required
    phone: { type: Number, required: true }  // Phone is required
  },
  { timestamps: true }  // This will automatically add createdAt and updatedAt fields
);

export default mongoose.model("Contact", contactSchema);
