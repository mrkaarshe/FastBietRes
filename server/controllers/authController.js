import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import { SendMyEmail } from "../config/nodeMailer.js"; 


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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // sending email 
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome to Our Service',
      text: `Hello ${name},\n\nThank you for registering. Your Account has been created on this email: ${email}.\n\nBest regards,\nYour Service Team`,
      html: `<p>Hello ${name},</p><p>Thank you for registering. Your Account has been created on this email: <strong>${email}</strong>.</p><p>Best regards,<br>Your Service Team</p>`,
    };
    await SendMyEmail(mailOptions)


    console.log('User created successfully');
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'Invalid email' });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.json({ success: false, message: 'Invalid password' });
    }

    // generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log('Login successful');

    // **kaliya hal res.json**
    return res.json({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};



export const Logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


export const sendverificationCode = async (req, res) => {
    try {
        const { userId} = req.body;
        const user = await userModel.findById(userId);
        if (user.isAccountVerified) {
            return res.json({ success: false, message: 'AAcount all ready vrified' });
        }
        const OTB = String(Math.floor(1000000 + Math.random() * 900000 ))
        user.verifyOtp = OTB;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Verification Code',
            text: `Your verification code is ${OTB}`,
            html: `<p>Your verification code is <strong>${OTB}</strong></p>`,
        };
        await SendMyEmail(mailOptions)
        res.json({ success: true, message: 'Verification code sent successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const verifyEmail = async (req, res) => {
    const { userId, OTP } = req.body;
     if(!userId || !OTP) {
            return res.json({ success: false, message: 'User ID and code are required' });
        }
    try {
       const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.isAccountVerified) {
            return res.json({ success: false, message: 'Account already verified' });
        }

        if (user.verifyOtp === '' || user.verifyOtp !==  OTP) {
            return res.json({ success: false, message: 'Invalid otp' });
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        res.json({ success: true, message: 'Email verified successfully' });
        
        // sending email 
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Email Verification Successful',
            text: `Hello ${user.name},\n\nYour email has been successfully verified.`,
            html: `<p>Hello ${user.name},</p><p>Your email has been successfully verified.</p>`,
        };
        await SendMyEmail(mailOptions)

        console.log('Email verified successfully');
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const isAuthenticated = async (req, res) => {
  try {
    // userId waxaa keenay middleware userAuth
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


export const sendResetPasswordOtp = async (req, res) => {
  const { email } = req.body;   // OTP lama qaadayo client-ka

  if (!email) {
    return res.json({ success: false, message: 'Email is required' });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const OTP = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit code
    user.resetOtp = OTP;
    user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset Request',
      text: `Your reset code is ${OTP}`,
      html: `<p>Your OTP for resetting your password is <b>${OTP}</b>. Use this code to proceed with resetting your password.</p>`,
    };

    await SendMyEmail(mailOptions);
    console.log("Generated OTP:", OTP);

    res.json({ success: true, message: 'Reset password email sent successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export const resetPassword = async (req, res) => {
  const { email, OTP, newPassword } = req.body;

  if (!email || !OTP || !newPassword) {
    return res.json({ success: false, message: 'Email, OTP, and new password are required' });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.resetOtp !== OTP) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: 'OTP expired' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;
    await user.save();

    res.json({ success: true, message: 'Password reset successfully' });
    
    // sending email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset Successful',
      text: `Hello ${user.name},\n\nYour password has been successfully reset.`,
      html: `<p>Hello ${user.name},</p><p>Your password has been successfully reset.</p>`,
    };
    await SendMyEmail(mailOptions);

    console.log('Password reset successfully');
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};