import User from '../models/User.js';
import OTP from '../models/OTP.js';
import { sendOTP } from '../services/emailService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    await sendOTP(email);
    res.json({ message: 'User signed up successfully' });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    await sendOTP(email);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const otpDoc = await OTP.findOne({ email, otp });
    if (!otpDoc) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }
    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET);
    // Store refresh token in database
    // Delete OTP from database
    res.json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};