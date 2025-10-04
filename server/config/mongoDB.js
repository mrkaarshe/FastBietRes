import mongoose from "mongoose";


const connectDB = () => {
  return mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection failed:", err.message));
};



export default  connectDB