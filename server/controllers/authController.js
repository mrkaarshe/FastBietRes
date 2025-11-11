import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from '../models/userModel.js';
import { SendMyEmail } from "../config/nodeMailer.js"; 

// Helper function for FastBite styled email
const fastBiteEmail = (title, bodyHtml) => `
<html>
<body style=" color: #dfb407; font-family: Arial, sans-serif; padding: 0px;">
    <div style="border-radius: 15px; max-width: 600px; margin: auto; background-color: #1a1a1a; padding: 20px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);">
        <header style="background-color: #dfb407; border-radius: 10px 10px 0px 0px; color: #ffffff; text-align: center; font-weight: bold; padding: 10px;">
            <p style="font-size: 24px; margin: 0;">${title}</p>
        </header>
        
        <div style="padding: 20px; color: #fff;">
            <p style="font-size: 18px; color: #f4f4f4;">Hi there!</p>
            ${bodyHtml}
        </div>

        <hr style="border-color: #dfb407; margin: 20px 0; border-width: 2px;">
         <p style="text-align:center; font-size: 14px; color: #fff;">© ${new Date().getFullYear()} FastBite. All rights reserved.</p>

    </div>
</body>
</html>

</html>


`;



// ------------------ REGISTER ------------------
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing details' });
  }

  try {
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '50d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome to FastBite ',
      text: `Hello ${name}, Thank you for registering at FastBite!`,
      html: fastBiteEmail(`Welcome to FastBite, ${name}!`, `<p style="text-align:center; font-size:16px;">Your account has been successfully created with this email: <strong>${email}</strong></p><p style="text-align:center;"> Enjoy delicious meals delivered fast!</p>`),
    };
    await SendMyEmail(mailOptions);

    console.log('User created and email sent successfully');

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: { name: user.name, email: user.email },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------ LOGIN ------------------
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '50d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: { name: user.name, email: user.email, role: user.role },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------ EMAIL VERIFICATION ------------------
export const sendVerificationCode = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.isAccountVerified) return res.json({ success: false, message: 'Account already verified' });

    const OTP = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = OTP;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'FastBite Email Verification',
      text: `Your verification code is ${OTP}`,
      html: fastBiteEmail(`Verify Your FastBite Account`, `<p style="text-align:center; font-size:18px;">Your verification code is:</p><p style="text-align:center; font-size:24px; font-weight:bold;">${OTP}</p>`),
    };
    await SendMyEmail(mailOptions);

    res.json({ success: true, message: 'Verification code sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;
  if (!userId || !OTP) return res.status(400).json({ success: false, message: 'User ID and OTP required' });

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.isAccountVerified) return res.json({ success: false, message: 'Account already verified' });
    if (user.verifyOtp !== OTP) return res.json({ success: false, message: 'Invalid OTP' });
    if (user.verifyOtpExpireAt < Date.now()) return res.json({ success: false, message: 'OTP expired' });

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;
    await user.save();

    // Email after verification
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'FastBite Email Verified ✅',
      text: `Your email has been verified successfully`,
      html: fastBiteEmail(`Email Verified!`, `<p style="text-align:center; font-size:18px;">Congratulations ${user.name}, your FastBite account is now verified!</p>`),
    };
    await SendMyEmail(mailOptions);

    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------ PASSWORD RESET ------------------
export const sendResetPasswordOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const OTP = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = OTP;
    user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'FastBite Password Reset',
      text: `Your password reset code is ${OTP}`,
      html: fastBiteEmail(`Reset Your Password`, `<p style=" font-size:10px; color:white;">We received a request to reset your password. Use the code below to proceed:</p>
                <p style="text-align:center; width:full; font-size:24px; color:white;background-color:#353535; padding: 8px; border-radius: 10px; text-align: center;  font-weight:bold;">${OTP}</p>
                  <p style="color: #cecdcd; font-size: 10px; ">this code will expire in <strong>24hurs</strong></p>
        <p style="color: #cecdcd; font-size: 10px; ">If you didn’t request a password reset, you can safely ignore this email.</p>`),
    };
    await SendMyEmail(mailOptions);

    res.json({ success: true, message: 'Reset password OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, OTP, newPassword } = req.body;
  if (!email || !OTP || !newPassword) return res.status(400).json({ success: false, message: 'Email, OTP and new password required' });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.resetOtp !== OTP) return res.json({ success: false, message: 'Invalid OTP' });
    if (user.resetOtpExpireAt < Date.now()) return res.json({ success: false, message: 'OTP expired' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'FastBite Password Reset Successful',
      text: 'Your password has been reset successfully',
      html: fastBiteEmail(`Password Reset Successful`, `<p style="text-align:center; font-size:18px;">Hi ${user.name}, your FastBite password has been reset successfully!</p>`),
    };
    await SendMyEmail(mailOptions);

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const isAuthenticated = async (req, res) => {
  try {
  
    const userId = req.userId;

    if (!userId) {
      return res.json({ success: false, message: 'User ID is required' });
    }

    // hel user DB
    const user = await userModel.findById(userId).select("-password");
    
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (!user.isAccountVerified) {
      return res.json({ success: false, message: 'User is not verified' });
    }

    console.log('User is authenticated');
    res.json({ success: true, message: 'User is authenticated', user });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP required' });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (user.resetOtp !== otp) return res.json({ success: false, message: 'Invalid OTP' });
    if (user.resetOtpExpireAt < Date.now()) return res.json({ success: false, message: 'OTP expired' });

    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
