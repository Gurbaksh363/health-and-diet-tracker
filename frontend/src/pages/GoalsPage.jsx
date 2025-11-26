import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  Flame,
  Scale,
  TrendingDown,
  Ruler,
  Calendar,
  ChevronLeft,
  Edit3,
  Save,
  X,
  Calculator,
  PartyPopper,
  Trophy,
  Info
} from 'lucide-react';

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
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06D6A0]/10 to-[#06D6A0]/5 flex items-center justify-center">
                <Target className="w-5 h-5 text-[#06D6A0]" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">My Goals</h1>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-[#06D6A0] text-white rounded-lg font-medium hover:bg-[#05c28f] transition-colors"
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" />
                Cancel
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                Edit Goals
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        
        {/* Daily Calorie Target */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Daily Calorie Target</h2>
            </div>
            {isEditing && (
              <button className="flex items-center gap-1 text-sm text-[#073B4C] hover:text-[#06D6A0] transition-colors">
                <div className="w-6 h-6 rounded-lg bg-[#073B4C]/10 flex items-center justify-center">
                  <Calculator className="w-3.5 h-3.5" />
                </div>
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
            <div className="bg-gradient-to-br from-[#06D6A0]/10 to-[#06D6A0]/5 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="text-2xl font-bold text-gray-900">{macros.protein}g</div>
              <div className="text-sm text-gray-600">Protein (30%)</div>
            </div>
            <div className="bg-gradient-to-br from-[#FFD166]/10 to-[#FFD166]/5 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="text-2xl font-bold text-gray-900">{macros.carbs}g</div>
              <div className="text-sm text-gray-600">Carbs (40%)</div>
            </div>
            <div className="bg-gradient-to-br from-[#073B4C]/10 to-[#073B4C]/5 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="text-2xl font-bold text-gray-900">{macros.fats}g</div>
              <div className="text-sm text-gray-600">Fats (30%)</div>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 text-sm text-gray-500 italic">
            <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Info className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <p>Macros auto-adjust when you change your calorie goal</p>
          </div>
        </div>

        {/* Weight Goals */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in delay-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 flex items-center justify-center">
              <Scale className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Weight Goals</h2>
          </div>

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
              <div
                className="h-full bg-gradient-to-r from-[#06D6A0] to-[#073B4C] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(weightProgress, 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-600/10 flex items-center justify-center flex-shrink-0">
                <PartyPopper className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-green-800 font-medium">
                You've lost {(goals.startWeight - goals.currentWeight).toFixed(1)} kg! 
                Only {(goals.currentWeight - goals.targetWeight).toFixed(1)} kg to go!
              </p>
            </div>
          </div>
        </div>

        {/* Body Measurements */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in delay-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 flex items-center justify-center">
              <Ruler className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Body Measurements</h2>
          </div>

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
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06D6A0] transition-all"
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
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06D6A0] transition-all"
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
        </div>

        {/* Weekly Goals */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in delay-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-indigo-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Weekly Goal Completion</h2>
          </div>

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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06D6A0] transition-all"
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
                <div
                  className="h-full bg-gradient-to-r from-[#06D6A0] to-[#073B4C] transition-all duration-1000 ease-out"
                  style={{ width: `${weeklyCompletion}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-blue-800">
                You're doing great! Keep up the consistency to reach your goals faster.
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-end gap-4 animate-fade-in">
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSaveGoals}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#06D6A0] to-[#073B4C] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              Save Goals
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
