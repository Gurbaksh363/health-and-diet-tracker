import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function GoalsPage() {
  const navigate = useNavigate();
  
  const [goals, setGoals] = useState({
    dailyCalories: 2000,
    startWeight: 75,
    currentWeight: 72.5,
    targetWeight: 68,
    waist: 85,
    hips: 95,
    weeklyGoalDays: 5,
    targetDate: '2025-12-31'
  });

  const [isEditing, setIsEditing] = useState(false);

  // Calculate BMI
  const height = 175; // cm - would come from user profile
  const bmi = (goals.currentWeight / ((height / 100) ** 2)).toFixed(1);
  
  // Calculate progress
  const weightProgress = ((goals.startWeight - goals.currentWeight) / (goals.startWeight - goals.targetWeight)) * 100;
  const weeklyCompletion = 85; // Mock data

  // Auto-calculate macros based on calorie goal
  const macros = {
    protein: Math.round(goals.dailyCalories * 0.3 / 4), // 30% calories, 4 cal/g
    carbs: Math.round(goals.dailyCalories * 0.4 / 4), // 40% calories
    fats: Math.round(goals.dailyCalories * 0.3 / 9) // 30% calories, 9 cal/g
  };

  const handleSaveGoals = () => {
    // Save to backend
    console.log('Saving goals:', goals);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">🎯 My Goals</h1>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-[#06D6A0] text-white rounded-lg font-medium hover:bg-[#05c28f] transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit Goals'}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        
        {/* Daily Calorie Target */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">🔥 Daily Calorie Target</h2>
            {isEditing && (
              <button className="text-sm text-[#073B4C] hover:text-[#06D6A0] transition">
                Recalculate
              </button>
            )}
          </div>

          <div className="flex items-center gap-6">
            {isEditing ? (
              <input
                type="number"
                value={goals.dailyCalories}
                onChange={(e) => setGoals({ ...goals, dailyCalories: parseInt(e.target.value) })}
                className="text-4xl font-bold bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-[#06D6A0]"
              />
            ) : (
              <div className="text-4xl font-bold bg-gradient-to-r from-[#06D6A0] to-[#073B4C] bg-clip-text text-transparent">
                {goals.dailyCalories}
              </div>
            )}
            <span className="text-xl text-gray-600">calories per day</span>
          </div>

          {/* Auto-calculated Macros */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-[#06D6A0]/10 to-[#06D6A0]/5 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{macros.protein}g</div>
              <div className="text-sm text-gray-600">Protein (30%)</div>
            </div>
            <div className="bg-gradient-to-br from-[#FFD166]/10 to-[#FFD166]/5 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{macros.carbs}g</div>
              <div className="text-sm text-gray-600">Carbs (40%)</div>
            </div>
            <div className="bg-gradient-to-br from-[#073B4C]/10 to-[#073B4C]/5 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{macros.fats}g</div>
              <div className="text-sm text-gray-600">Fats (30%)</div>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500 italic">
            💡 Macros auto-adjust when you change your calorie goal
          </p>
        </motion.div>

        {/* Weight Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">⚖️ Weight Goals</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Starting Weight */}
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Starting Weight</div>
              {isEditing ? (
                <input
                  type="number"
                  step="0.1"
                  value={goals.startWeight}
                  onChange={(e) => setGoals({ ...goals, startWeight: parseFloat(e.target.value) })}
                  className="text-3xl font-bold bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-32 mx-auto text-center focus:outline-none focus:ring-2 focus:ring-[#06D6A0]"
                />
              ) : (
                <div className="text-3xl font-bold text-gray-900">{goals.startWeight}</div>
              )}
              <div className="text-sm text-gray-500 mt-1">kg</div>
            </div>

            {/* Current Weight */}
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Current Weight</div>
              {isEditing ? (
                <input
                  type="number"
                  step="0.1"
                  value={goals.currentWeight}
                  onChange={(e) => setGoals({ ...goals, currentWeight: parseFloat(e.target.value) })}
                  className="text-3xl font-bold bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-32 mx-auto text-center focus:outline-none focus:ring-2 focus:ring-[#06D6A0]"
                />
              ) : (
                <div className="text-3xl font-bold bg-gradient-to-r from-[#06D6A0] to-[#073B4C] bg-clip-text text-transparent">
                  {goals.currentWeight}
                </div>
              )}
              <div className="text-sm text-gray-500 mt-1">kg</div>
            </div>

            {/* Target Weight */}
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Target Weight</div>
              {isEditing ? (
                <input
                  type="number"
                  step="0.1"
                  value={goals.targetWeight}
                  onChange={(e) => setGoals({ ...goals, targetWeight: parseFloat(e.target.value) })}
                  className="text-3xl font-bold bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-32 mx-auto text-center focus:outline-none focus:ring-2 focus:ring-[#06D6A0]"
                />
              ) : (
                <div className="text-3xl font-bold text-gray-900">{goals.targetWeight}</div>
              )}
              <div className="text-sm text-gray-500 mt-1">kg</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span className="font-semibold">{Math.min(weightProgress, 100).toFixed(0)}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#06D6A0] to-[#073B4C] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(weightProgress, 100)}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">
              🎉 You've lost {(goals.startWeight - goals.currentWeight).toFixed(1)} kg! 
              Only {(goals.currentWeight - goals.targetWeight).toFixed(1)} kg to go!
            </p>
          </div>
        </motion.div>

        {/* Body Measurements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">📏 Body Measurements</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Waist */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Waist</label>
              {isEditing ? (
                <div className="relative">
                  <input
                    type="number"
                    value={goals.waist}
                    onChange={(e) => setGoals({ ...goals, waist: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06D6A0]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">cm</span>
                </div>
              ) : (
                <div className="text-2xl font-bold text-gray-900">{goals.waist} <span className="text-base text-gray-500">cm</span></div>
              )}
            </div>

            {/* Hips */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Hips</label>
              {isEditing ? (
                <div className="relative">
                  <input
                    type="number"
                    value={goals.hips}
                    onChange={(e) => setGoals({ ...goals, hips: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06D6A0]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">cm</span>
                </div>
              ) : (
                <div className="text-2xl font-bold text-gray-900">{goals.hips} <span className="text-base text-gray-500">cm</span></div>
              )}
            </div>

            {/* BMI (auto-calculated) */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">BMI (Auto-calculated)</label>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#06D6A0] to-[#073B4C] bg-clip-text text-transparent">
                {bmi}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Weekly Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">📅 Weekly Goal Completion</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Target Days */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Target Active Days per Week</label>
              {isEditing ? (
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={goals.weeklyGoalDays}
                  onChange={(e) => setGoals({ ...goals, weeklyGoalDays: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06D6A0]"
                />
              ) : (
                <div className="text-3xl font-bold text-gray-900">{goals.weeklyGoalDays} <span className="text-lg text-gray-500">days</span></div>
              )}
            </div>

            {/* This Week's Progress */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">This Week's Completion</label>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#06D6A0] to-[#073B4C] bg-clip-text text-transparent">
                {weeklyCompletion}%
              </div>
              <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#06D6A0] to-[#073B4C]"
                  initial={{ width: 0 }}
                  animate={{ width: `${weeklyCompletion}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              💪 You're doing great! Keep up the consistency to reach your goals faster.
            </p>
          </div>
        </motion.div>

        {/* Save Button */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end gap-4"
          >
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveGoals}
              className="px-6 py-3 bg-gradient-to-r from-[#06D6A0] to-[#073B4C] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Save Goals
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
