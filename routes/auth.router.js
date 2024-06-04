import express from 'express';
import * as authController from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/otp/verify', authController.verifyOTP);
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected endpoint accessed' });
});

export default router;