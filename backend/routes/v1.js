import express from 'express';
import testRouter from './test.js';
import userRoutes from './user/index.js'
const router = express.Router();

router.use('/test', testRouter);
router.use('/user', userRoutes);


export default router;