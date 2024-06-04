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
    otpDoc.refreshTokens.push({ token: refreshToken });
    otpDoc.otp = null;
    await otpDoc.save();
    res.json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};


export const refreshToken = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) return res.sendStatus(400);
      const user = await User.findOne({ 'refreshTokens.token': refreshToken });
      if (!user) return res.sendStatus(403);
      const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
      res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  }