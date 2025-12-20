import express from 'express';
import {
  addWorkout,
  getWorkoutByDate,
  getWorkoutRange,
  getAllWorkouts,
  updateWorkout,
  deleteWorkout,
  getWeeklyStats
} from '../../controllers/user/workout.js';
import { authenticate } from '../../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/', addWorkout);                      // POST /user/workouts
router.get('/', getAllWorkouts);                   // GET /user/workouts (paginated)
router.get('/date', getWorkoutByDate);             // GET /user/workouts/date?date=YYYY-MM-DD
router.get('/range', getWorkoutRange);             // GET /user/workouts/range?startDate=&endDate=
router.get('/stats/weekly', getWeeklyStats);       // GET /user/workouts/stats/weekly
router.put('/:id', updateWorkout);                 // PUT /user/workouts/:id
router.delete('/:id', deleteWorkout);              // DELETE /user/workouts/:id

export default router;
