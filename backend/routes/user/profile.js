import express from 'express';
import { OnboardUser } from '../../controllers/user/onboarding.js';
import { authenticate } from '../../middleware/auth.js';
import { getMe } from '../../controllers/user/me.js';
const router = express.Router();

router.get('/', authenticate, getMe);
router.post('/onboard', authenticate, OnboardUser);

export default router;