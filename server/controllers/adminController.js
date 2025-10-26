import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import admin from '../models/admin'


const ganrateToken = (id)=> {
    return jwt.sign({id},process.env.JWT_SECRET , {expiresIn : '7d'})
}

export const registerUser = async (req,res) => {
    const  {email ,name , password , role } = req.body
    try {
        const exists = await admin.findOne({email})
        if (exists) return res.status(400).json({ message: "User already exists" });
        if(!exists){
            res.send('user not found!')
            console.log('user not found')
        }

        const hashedPassword = bcrypt.hash(password,10)
        const userAdmin = await admin.creat({email,name,role,password:hashedPassword}) 
           res.status(201).json({
            _id: userAdmin.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: ganrateToken(userAdmin.id),
            });

    } catch (error) {
         res.status(500).json({ message: err.message });
    }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};