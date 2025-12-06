import express from 'express';
import { forgotPassword, login, logout, refreshToken, register, resendVerificationEmail, resetPassword, verifyEmail } from '../../controllers/user/auth.js';
import { authenticate } from '../../middleware/auth.js';
const router = express.Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/resend-verify', resendVerificationEmail);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword)

export default router;