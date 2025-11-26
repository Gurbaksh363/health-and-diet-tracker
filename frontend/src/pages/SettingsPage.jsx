import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Settings,
  Ruler,
  Palette,
  Bell,
  Database,
  AlertTriangle,
  Sun,
  Moon,
  BarChart3,
  Trash2,
  Save
} from 'lucide-react';

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
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500/10 to-gray-500/5 flex items-center justify-center">
              <Settings className="w-5 h-5 text-gray-700" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        
        {/* Units Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 flex items-center justify-center">
              <Ruler className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Units</h2>
          </div>
          
          <div className="space-y-4">
            {/* Calories */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Energy</span>
              <div className="flex gap-2">
                {['kcal', 'kJ'].map((unit) => (
                  <button
                    key={unit}
                    onClick={() => setUnits({ ...units, calories: unit })}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      units.calories === unit
                        ? 'bg-[#06D6A0] text-white shadow-sm scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
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
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      units.weight === unit
                        ? 'bg-[#06D6A0] text-white shadow-sm scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
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
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      units.distance === unit
                        ? 'bg-[#06D6A0] text-white shadow-sm scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Theme Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in delay-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
          </div>
          
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
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center transition-transform duration-300 ease-out ${
                  theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
                }`}
              >
                {theme === 'dark' ? (
                  <Moon className="w-3 h-3 text-[#073B4C]" />
                ) : (
                  <Sun className="w-3 h-3 text-yellow-500" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in delay-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 flex items-center justify-center">
              <Bell className="w-5 h-5 text-green-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          
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
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ease-out ${
                      value ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Data Export Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in delay-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 flex items-center justify-center">
              <Database className="w-5 h-5 text-indigo-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Data Export</h2>
          </div>
          
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
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ease-out ${
                    autoExport ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <button
              onClick={() => navigate('/reports')}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#073B4C] text-white rounded-lg font-medium hover:bg-[#0a4d61] transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              View Reports & Export Data
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-xl p-6 border border-red-200 animate-fade-in delay-400">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-red-700">
              Once you delete your account, there is no going back. All your data will be permanently removed.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 active:scale-95 transition-all"
            >
              <Trash2 className="w-5 h-5" />
              Delete Account & All Data
            </button>
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-white rounded-xl p-6 max-w-md w-full animate-scale-in">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account?</h3>
                <p className="text-gray-600">
                  This action cannot be undone. All your nutrition data, workout logs, and personal information will be permanently deleted.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex items-center justify-center gap-2 flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 active:scale-95 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
