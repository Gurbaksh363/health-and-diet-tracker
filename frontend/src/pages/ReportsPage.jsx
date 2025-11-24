import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ReportsPage() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('week'); // week or month
  const [showExportModal, setShowExportModal] = useState(false);

  // Mock data
  const weeklyData = {
    caloriesConsumed: [1780, 1950, 1820, 2100, 1890, 1760, 1940],
    caloriesTarget: 2000,
    caloriesBurned: [420, 380, 500, 320, 450, 410, 390],
    weight: [72.5, 72.3, 72.4, 72.2, 72.0, 71.9, 71.8],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    insights: {
      avgCalories: 1891,
      consistency: 86,
      weightChange: -0.7,
      activeDays: 7
    }
  };

  const monthlyData = {
    avgCalories: 1920,
    consistency: 78,
    weightChange: -2.3,
    activeDays: 27,
    bestWeek: 2
  };

  const data = period === 'week' ? weeklyData : null;

  const handleExport = (format) => {
    console.log(`Exporting as ${format}...`);
    setShowExportModal(false);
  };

  const handleEmailReport = () => {
    console.log('Sending email report...');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">📊 Reports</h1>
            </div>

            {/* Period Toggle */}
            <div className="flex gap-2">
              {['week', 'month'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    period === p
                      ? 'bg-[#06D6A0] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {p === 'week' ? 'Weekly' : 'Monthly'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        
        {/* Insights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#06D6A0] to-[#073B4C] rounded-xl p-6 text-white"
          >
            <div className="text-3xl mb-2">🍽️</div>
            <div className="text-2xl font-bold">{data.insights.avgCalories}</div>
            <div className="text-sm opacity-90">Avg Daily Calories</div>
            <div className="mt-2 text-xs opacity-75">
              {data.insights.avgCalories > weeklyData.caloriesTarget ? '↑' : '↓'} 
              {Math.abs(data.insights.avgCalories - weeklyData.caloriesTarget)} from target
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#FFD166] to-[#EF476F] rounded-xl p-6 text-white"
          >
            <div className="text-3xl mb-2">⚖️</div>
            <div className="text-2xl font-bold">{data.insights.weightChange} kg</div>
            <div className="text-sm opacity-90">Weight Change</div>
            <div className="mt-2 text-xs opacity-75">
              {data.insights.weightChange < 0 ? 'Great progress! 🎉' : 'Keep going 💪'}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#073B4C] to-[#118AB2] rounded-xl p-6 text-white"
          >
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold">{data.insights.consistency}%</div>
            <div className="text-sm opacity-90">Consistency Score</div>
            <div className="mt-2 text-xs opacity-75">
              {data.insights.consistency >= 80 
                ? 'Excellent tracking! 🌟' 
                : 'Room to improve 📈'}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#118AB2] to-[#06D6A0] rounded-xl p-6 text-white"
          >
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold">{data.insights.activeDays}</div>
            <div className="text-sm opacity-90">Active Days</div>
            <div className="mt-2 text-xs opacity-75">
              {data.insights.activeDays === 7 ? 'Perfect week! 🏆' : `${7 - data.insights.activeDays} days missed`}
            </div>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Calories Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Calories Consumed vs Target</h3>
            
            <div className="space-y-3">
              {data.days.map((day, i) => {
                const consumed = data.caloriesConsumed[i];
                const target = data.caloriesTarget;
                const percentage = (consumed / target) * 100;
                
                return (
                  <div key={day}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{day}</span>
                      <span className="font-medium text-gray-900">{consumed} kcal</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                        className={`h-full ${
                          percentage > 110 ? 'bg-red-500' :
                          percentage > 90 ? 'bg-[#06D6A0]' :
                          'bg-[#FFD166]'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#06D6A0] rounded-full"></div>
                <span className="text-gray-600">On track</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FFD166] rounded-full"></div>
                <span className="text-gray-600">Under target</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">Over target</span>
              </div>
            </div>
          </motion.div>

          {/* Weight Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚖️ Weight Trend</h3>
            
            <div className="relative h-48 flex items-end justify-between gap-2">
              {data.weight.map((weight, i) => {
                const maxWeight = Math.max(...data.weight);
                const minWeight = Math.min(...data.weight);
                const height = ((weight - minWeight) / (maxWeight - minWeight)) * 100 || 50;
                
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.6 + i * 0.05, duration: 0.5 }}
                      className="w-full bg-gradient-to-t from-[#073B4C] to-[#06D6A0] rounded-t-lg relative group"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {weight} kg
                      </div>
                    </motion.div>
                    <span className="text-xs text-gray-500">{data.days[i]}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-3 bg-green-50 rounded-lg text-center">
              <p className="text-green-800 font-medium">
                {data.insights.weightChange < 0 ? '↓' : '↑'} 
                {Math.abs(data.insights.weightChange)} kg this week
              </p>
              <p className="text-sm text-green-600 mt-1">
                {data.insights.weightChange < 0 
                  ? 'You\'re making great progress!' 
                  : 'Keep up the good work!'}
              </p>
            </div>
          </motion.div>

        </div>

        {/* Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💾 Export Data</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setShowExportModal(true)}
              className="py-3 bg-[#073B4C] text-white rounded-lg font-medium hover:bg-[#0a4d61] transition-colors flex items-center justify-center gap-2"
            >
              <span>📄</span> Export CSV
            </button>
            
            <button
              onClick={() => handleExport('pdf')}
              className="py-3 bg-[#EF476F] text-white rounded-lg font-medium hover:bg-[#d63b5f] transition-colors flex items-center justify-center gap-2"
            >
              <span>📑</span> Export PDF
            </button>
            
            <button
              onClick={handleEmailReport}
              className="py-3 bg-[#06D6A0] text-white rounded-lg font-medium hover:bg-[#05c28f] transition-colors flex items-center justify-center gap-2"
            >
              <span>📧</span> Email Report
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Your data includes nutrition logs, workout history, and progress metrics
          </p>
        </motion.div>

      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Export to CSV</h3>
            
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-[#06D6A0]" />
                <span className="text-gray-700">Nutrition data</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-[#06D6A0]" />
                <span className="text-gray-700">Workout logs</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-[#06D6A0]" />
                <span className="text-gray-700">Weight history</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="checkbox" className="w-4 h-4 text-[#06D6A0]" />
                <span className="text-gray-700">Progress photos</span>
              </label>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="flex-1 py-3 bg-[#06D6A0] text-white rounded-lg font-medium hover:bg-[#05c28f] transition-colors"
              >
                Download
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
