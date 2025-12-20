import express from 'express';
const router = express.Router();
import authRouter from './auth.js';
import profileRouter from './profile.js';
import workoutRouter from './workout.js';
import foodRouter from './food.js';

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/workouts', workoutRouter);
router.use('/food', foodRouter);

export default router;