import express from 'express';
import { login, register, resendVerificationEmail, verifyEmail } from '../../controllers/user/auth.js';
const router = express.Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/resend-verify', resendVerificationEmail);
router.post('/login', login);

export default router;