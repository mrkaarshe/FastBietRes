import bcrypt from "bcryptjs";
import User from "./models/User.js";

async function createDefaultAdmin() {
  const adminExists = await User.findOne({ email: "admin@gmail.com" });
  if (!adminExists) {
    const hashed = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashed,
      role: "admin",
    });
    console.log("✅ Default admin created (email: admin@gmail.com, pass: admin123)");
  }
}
createDefaultAdmin();
