import express from 'express';
import {
  addFood,
  getFoodByDate,
  getFoodRange,
  updateFood,
  deleteFood,
  getWeeklyNutritionStats,
} from '../../controllers/user/food.js';
import { authenticate } from '../../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Add food
router.post('/', addFood);

// Get food by date
router.get('/date', getFoodByDate);

// Get food by date range
router.get('/range', getFoodRange);

// Get weekly nutrition stats
router.get('/stats/weekly', getWeeklyNutritionStats);

// Update food
router.put('/:id', updateFood);

// Delete food
router.delete('/:id', deleteFood);

export default router;
