import express from 'express';
import { OnboardUser } from '../../controllers/user/onboarding.js';
import { authenticate } from '../../middleware/auth.js';
const router = express.Router();

router.post('/onboard', authenticate, OnboardUser);

export default router;