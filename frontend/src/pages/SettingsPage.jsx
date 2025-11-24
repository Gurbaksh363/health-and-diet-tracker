import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const navigate = useNavigate();
  
  // Settings state
  const [units, setUnits] = useState({
    calories: 'kcal',
    weight: 'kg',
    distance: 'km'
  });
  
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    mealReminders: true,
    workoutReminders: true,
    goalAchievements: true,
    weeklyReport: false
  });
  
  const [autoExport, setAutoExport] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Add theme change logic here
    document.documentElement.classList.toggle('dark');
  };

  const handleDeleteAccount = () => {
    // API call to delete account
    console.log('Deleting account...');
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">⚙️ Settings</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        
        {/* Units Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📏 Units</h2>
          
          <div className="space-y-4">
            {/* Calories */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Energy</span>
              <div className="flex gap-2">
                {['kcal', 'kJ'].map((unit) => (
                  <button
                    key={unit}
                    onClick={() => setUnits({ ...units, calories: unit })}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      units.calories === unit
                        ? 'bg-[#06D6A0] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Weight</span>
              <div className="flex gap-2">
                {['kg', 'lb'].map((unit) => (
                  <button
                    key={unit}
                    onClick={() => setUnits({ ...units, weight: unit })}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      units.weight === unit
                        ? 'bg-[#06D6A0] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>

            {/* Distance */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Distance</span>
              <div className="flex gap-2">
                {['km', 'mi'].map((unit) => (
                  <button
                    key={unit}
                    onClick={() => setUnits({ ...units, distance: unit })}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      units.distance === unit
                        ? 'bg-[#06D6A0] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Theme Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🎨 Appearance</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 font-medium">Dark Mode</p>
              <p className="text-sm text-gray-500">Toggle between light and dark theme</p>
            </div>
            <button
              onClick={handleThemeToggle}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[#073B4C]' : 'bg-gray-300'
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
                animate={{ x: theme === 'dark' ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </motion.div>
            </button>
          </div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🔔 Notifications</h2>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 font-medium">
                    {key === 'mealReminders' && 'Meal Reminders'}
                    {key === 'workoutReminders' && 'Workout Reminders'}
                    {key === 'goalAchievements' && 'Goal Achievements'}
                    {key === 'weeklyReport' && 'Weekly Report Email'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {key === 'mealReminders' && 'Get reminded to log your meals'}
                    {key === 'workoutReminders' && 'Daily workout motivation'}
                    {key === 'goalAchievements' && 'Celebrate your milestones'}
                    {key === 'weeklyReport' && 'Summary sent every Monday'}
                  </p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, [key]: !value })}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                    value ? 'bg-[#06D6A0]' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ x: value ? 28 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">💾 Data Export</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 font-medium">Auto-Export</p>
                <p className="text-sm text-gray-500">Monthly data backup to email</p>
              </div>
              <button
                onClick={() => setAutoExport(!autoExport)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                  autoExport ? 'bg-[#06D6A0]' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ x: autoExport ? 28 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            <button
              onClick={() => navigate('/reports')}
              className="w-full py-3 bg-[#073B4C] text-white rounded-lg font-medium hover:bg-[#0a4d61] transition-colors"
            >
              📊 View Reports & Export Data
            </button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-red-50 rounded-xl p-6 border border-red-200"
        >
          <h2 className="text-lg font-semibold text-red-900 mb-4">⚠️ Danger Zone</h2>
          
          <div className="space-y-3">
            <p className="text-sm text-red-700">
              Once you delete your account, there is no going back. All your data will be permanently removed.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Delete Account & All Data
            </button>
          </div>
        </motion.div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. All your nutrition data, workout logs, and personal information will be permanently deleted.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete Forever
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
