import axiosClient from './axiosClient';

export const workoutApi = {
  // Add workout
  addWorkout: async (data) => {
    const response = await axiosClient.post('/user/workouts', data);
    return response.data;
  },

  // Get workouts for a specific date
  getWorkoutByDate: async (date) => {
    const response = await axiosClient.get(`/user/workouts/date?date=${date}`);
    return response.data;
  },

  // Get workouts for a date range
  getWorkoutRange: async (startDate, endDate) => {
    const response = await axiosClient.get(
      `/user/workouts/range?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },

  // Get all workouts (paginated)
  getAllWorkouts: async (page = 1, limit = 10) => {
    const response = await axiosClient.get(
      `/user/workouts?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  // Get weekly stats
  getWeeklyStats: async () => {
    const response = await axiosClient.get('/user/workouts/stats/weekly');
    return response.data;
  },

  // Update workout
  updateWorkout: async (id, data) => {
    const response = await axiosClient.put(`/user/workouts/${id}`, data);
    return response.data;
  },

  // Delete workout
  deleteWorkout: async (id) => {
    const response = await axiosClient.delete(`/user/workouts/${id}`);
    return response.data;
  }
};

export default workoutApi;
