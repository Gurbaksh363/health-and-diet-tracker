import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

  // Mock data
  const today = {
    caloriesConsumed: 1780,
    caloriesBurned: 420,
    caloriesTarget: 2000,
    remainingCalories: 640,
    water: 2.5,
    waterTarget: 3.0,
    steps: 8420,
    stepsTarget: 10000
  };

  const weeklyData = {
    avgCalories: 1891,
    goalCompletion: 86,
    daysActive: 6,
    weightChange: -0.7
  };

  const streak = {
    current: 12,
    longest: 28
  };

  // Last 7 days calorie data
  const weeklyCalories = [
    { day: 'Mon', consumed: 1780, target: 2000 },
    { day: 'Tue', consumed: 1950, target: 2000 },
    { day: 'Wed', consumed: 1820, target: 2000 },
    { day: 'Thu', consumed: 2100, target: 2000 },
    { day: 'Fri', consumed: 1890, target: 2000 },
    { day: 'Sat', consumed: 1760, target: 2000 },
    { day: 'Sun', consumed: 1940, target: 2000 }
  ];

  // Weight trend (last 7 days)
  const weightTrend = [72.5, 72.3, 72.4, 72.2, 72.0, 71.9, 71.8];

  const maxCalories = Math.max(...weeklyCalories.map(d => d.consumed), ...weeklyCalories.map(d => d.target));

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">📊 Dashboard</h1>
              <p className="text-sm text-gray-500">Track your daily progress and trends</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        
        {/* Daily Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#06D6A0]/10 via-white to-[#073B4C]/10 rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">🌟 Today's Overview</h2>
            <div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Calories In */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Calories In</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#FFD166] to-[#EF476F] bg-clip-text text-transparent">
                {today.caloriesConsumed}
              </div>
              <div className="text-xs text-gray-500 mt-1">from nutrition</div>
            </div>

            {/* Calories Out */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Calories Out</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#06D6A0] to-[#073B4C] bg-clip-text text-transparent">
                {today.caloriesBurned}
              </div>
              <div className="text-xs text-gray-500 mt-1">from workouts</div>
            </div>

            {/* Remaining */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Remaining</div>
              <div className="text-3xl font-bold text-gray-900">
                {today.remainingCalories}
              </div>
              <div className="text-xs text-gray-500 mt-1">to reach goal</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Daily Progress</span>
              <span className="font-semibold text-gray-900">
                {Math.round((today.caloriesConsumed / today.caloriesTarget) * 100)}%
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#06D6A0] to-[#073B4C]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((today.caloriesConsumed / today.caloriesTarget) * 100, 100)}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0</span>
              <span>Target: {today.caloriesTarget} kcal</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Calorie Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">📊 Weekly Calories</h3>
            
            <div className="space-y-3">
              {weeklyCalories.map((day, i) => {
                const percentage = (day.consumed / maxCalories) * 100;
                const isOverTarget = day.consumed > day.target;
                
                return (
                  <div key={day.day}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 w-12">{day.day}</span>
                      <span className="font-medium text-gray-900">{day.consumed} kcal</span>
                    </div>
                    <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <motion.div
                        className={`h-full rounded-lg ${
                          isOverTarget 
                            ? 'bg-gradient-to-r from-[#EF476F] to-[#FFD166]' 
                            : 'bg-gradient-to-r from-[#06D6A0] to-[#073B4C]'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
                      />
                      {/* Target line */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-gray-400"
                        style={{ left: `${(day.target / maxCalories) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-[#06D6A0] to-[#073B4C] rounded"></div>
                <span>On track</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-[#EF476F] to-[#FFD166] rounded"></div>
                <span>Over target</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-0.5 h-3 bg-gray-400"></div>
                <span>Target</span>
              </div>
            </div>
          </motion.div>

          {/* Weight Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">📈 Weight Trend (7 Days)</h3>
            
            <div className="relative h-48">
              <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 50, 100, 150, 200].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="700"
                    y2={y}
                    stroke="#f3f4f6"
                    strokeWidth="1"
                  />
                ))}

                {/* Line path */}
                <motion.path
                  d={`M ${weightTrend.map((w, i) => {
                    const x = (i / (weightTrend.length - 1)) * 700;
                    const minWeight = Math.min(...weightTrend);
                    const maxWeight = Math.max(...weightTrend);
                    const y = 180 - ((w - minWeight) / (maxWeight - minWeight)) * 160;
                    return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
                  }).join(' ')}`}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />

                {/* Area under line */}
                <motion.path
                  d={`M ${weightTrend.map((w, i) => {
                    const x = (i / (weightTrend.length - 1)) * 700;
                    const minWeight = Math.min(...weightTrend);
                    const maxWeight = Math.max(...weightTrend);
                    const y = 180 - ((w - minWeight) / (maxWeight - minWeight)) * 160;
                    return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
                  }).join(' ')} L 700,200 L 0,200 Z`}
                  fill="url(#areaGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />

                {/* Data points */}
                {weightTrend.map((w, i) => {
                  const x = (i / (weightTrend.length - 1)) * 700;
                  const minWeight = Math.min(...weightTrend);
                  const maxWeight = Math.max(...weightTrend);
                  const y = 180 - ((w - minWeight) / (maxWeight - minWeight)) * 160;
                  
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="5"
                      fill="white"
                      stroke="#06D6A0"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    />
                  );
                })}

                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06D6A0" />
                    <stop offset="100%" stopColor="#073B4C" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06D6A0" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#06D6A0" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="mt-4 flex justify-between text-xs text-gray-500">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                ↓ {Math.abs(weeklyData.weightChange)} kg this week - Great progress!
              </p>
            </div>
          </motion.div>

        </div>

        {/* Weekly Summary & Streak */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Weekly Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Weekly Summary</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600">Avg Daily Calories</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-[#06D6A0] to-[#073B4C] bg-clip-text text-transparent">
                  {weeklyData.avgCalories}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">Goal Completion</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{weeklyData.goalCompletion}%</div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#06D6A0] to-[#073B4C]"
                    initial={{ width: 0 }}
                    animate={{ width: `${weeklyData.goalCompletion}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600">Active Days</div>
                <div className="text-2xl font-bold text-gray-900">{weeklyData.daysActive}/7</div>
              </div>
            </div>
          </motion.div>

          {/* Streak Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[#FFD166] to-[#EF476F] rounded-xl p-6 shadow-lg text-white"
          >
            <h3 className="text-lg font-semibold mb-4">🔥 Streak</h3>
            
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">{streak.current}</div>
              <div className="text-sm opacity-90 mb-4">days in a row!</div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-xs opacity-75">Longest Streak</div>
                <div className="text-2xl font-bold">{streak.longest} days</div>
              </div>
            </div>
          </motion.div>

          {/* Motivational Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-[#073B4C] to-[#118AB2] rounded-xl p-6 shadow-lg text-white"
          >
            <h3 className="text-lg font-semibold mb-4">💡 Insights</h3>
            
            <div className="space-y-3 text-sm">
              <p className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                ✨ Your consistency improved by <strong>12%</strong> this month!
              </p>
              <p className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                🎯 You're <strong>86%</strong> on track to reach your weekly goal.
              </p>
              <p className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                💪 Keep it up! You've logged workouts <strong>6 days</strong> this week.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
