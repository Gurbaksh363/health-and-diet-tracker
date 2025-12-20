import Workout from '../../models/workout.js';
import ApiError from '../../middleware/error-handler.js';

// Add a new workout
export const addWorkout = async (req, res, next) => {
  try {
    const { name, type, duration, intensity, calories, date, time, notes, distance } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!name || !type || !duration || !intensity || !calories || !date) {
      throw new ApiError(400, 'Missing required fields', 'VALIDATION_ERROR');
    }

    // Create workout date object
    let workoutDate = new Date(date);
    if (time) {
      const [hours, minutes] = time.split(':');
      workoutDate.setHours(parseInt(hours), parseInt(minutes));
    }

    const workout = new Workout({
      userId,
      name,
      type,
      duration,
      intensity,
      calories,
      date: workoutDate,
      notes,
      distance
    });

    await workout.save();

    res.status(201).json({
      success: true,
      message: 'Workout logged successfully',
      data: workout
    });
  } catch (error) {
    next(error);
  }
};

// Get workouts for a specific date
export const getWorkoutByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    const userId = req.user._id;

    if (!date) {
      throw new ApiError(400, 'Date parameter is required', 'VALIDATION_ERROR');
    }

    // Parse date and get start and end of day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const workouts = await Workout.find({
      userId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).sort({ date: -1 });

    // Calculate totals
    const totals = workouts.reduce((acc, workout) => ({
      totalCalories: acc.totalCalories + workout.calories,
      totalDuration: acc.totalDuration + workout.duration,
      count: acc.count + 1
    }), { totalCalories: 0, totalDuration: 0, count: 0 });

    res.json({
      success: true,
      data: {
        workouts,
        totals
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get workouts for a date range
export const getWorkoutRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user._id;

    if (!startDate || !endDate) {
      throw new ApiError(400, 'Start date and end date are required', 'VALIDATION_ERROR');
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const workouts = await Workout.find({
      userId,
      date: {
        $gte: start,
        $lte: end
      }
    }).sort({ date: -1 });

    // Calculate totals
    const totals = workouts.reduce((acc, workout) => ({
      totalCalories: acc.totalCalories + workout.calories,
      totalDuration: acc.totalDuration + workout.duration,
      count: acc.count + 1
    }), { totalCalories: 0, totalDuration: 0, count: 0 });

    res.json({
      success: true,
      data: {
        workouts,
        totals
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all workouts with pagination
export const getAllWorkouts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const workouts = await Workout.find({ userId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Workout.countDocuments({ userId });

    res.json({
      success: true,
      data: {
        workouts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update a workout
export const updateWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const updates = req.body;

    const workout = await Workout.findOne({ _id: id, userId });

    if (!workout) {
      throw new ApiError(404, 'Workout not found', 'NOT_FOUND');
    }

    // Update workout date if provided
    if (updates.date || updates.time) {
      let workoutDate = updates.date ? new Date(updates.date) : workout.date;
      if (updates.time) {
        const [hours, minutes] = updates.time.split(':');
        workoutDate.setHours(parseInt(hours), parseInt(minutes));
      }
      updates.date = workoutDate;
    }

    Object.assign(workout, updates);
    await workout.save();

    res.json({
      success: true,
      message: 'Workout updated successfully',
      data: workout
    });
  } catch (error) {
    next(error);
  }
};

// Delete a workout
export const deleteWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const workout = await Workout.findOneAndDelete({ _id: id, userId });

    if (!workout) {
      throw new ApiError(404, 'Workout not found', 'NOT_FOUND');
    }

    res.json({
      success: true,
      message: 'Workout deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get weekly statistics
export const getWeeklyStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get date range for current week
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const workouts = await Workout.find({
      userId,
      date: {
        $gte: startOfWeek,
        $lt: endOfWeek
      }
    }).sort({ date: 1 });

    // Calculate stats
    const stats = {
      totalWorkouts: workouts.length,
      totalCalories: 0,
      totalDuration: 0,
      byType: {
        cardio: { count: 0, calories: 0, duration: 0 },
        strength: { count: 0, calories: 0, duration: 0 },
        flexibility: { count: 0, calories: 0, duration: 0 },
        sports: { count: 0, calories: 0, duration: 0 }
      },
      dailyBreakdown: []
    };

    workouts.forEach(workout => {
      stats.totalCalories += workout.calories;
      stats.totalDuration += workout.duration;

      if (stats.byType[workout.type]) {
        stats.byType[workout.type].count++;
        stats.byType[workout.type].calories += workout.calories;
        stats.byType[workout.type].duration += workout.duration;
      }
    });

    // Group by day
    const dailyMap = {};
    workouts.forEach(workout => {
      const dateKey = workout.date.toISOString().split('T')[0];
      if (!dailyMap[dateKey]) {
        dailyMap[dateKey] = {
          date: dateKey,
          count: 0,
          calories: 0,
          duration: 0
        };
      }
      dailyMap[dateKey].count++;
      dailyMap[dateKey].calories += workout.calories;
      dailyMap[dateKey].duration += workout.duration;
    });

    stats.dailyBreakdown = Object.values(dailyMap);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
