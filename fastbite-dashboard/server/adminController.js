import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import admin from './adminSchema.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register User
export const registerUser = async (req, res) => {
  const { email, name, password, role } = req.body;
  try {
    const exists = await admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userAdmin = await admin.create({ email, name, role, password: hashedPassword });

    res.status(201).json({
      _id: userAdmin.id,
      name: userAdmin.name,
      email: userAdmin.email,
      role: userAdmin.role,
      token: generateToken(userAdmin.id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
