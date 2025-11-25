import express from 'express';
const router = express.Router();
import authRouter from './auth.js';
import profileRouter from './profile.js';

router.use('/auth', authRouter);
router.use('/profile', profileRouter);

export default router;