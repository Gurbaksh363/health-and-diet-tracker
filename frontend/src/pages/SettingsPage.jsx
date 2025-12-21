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
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-muted-foreground/10 to-muted-foreground/5 flex items-center justify-center">
              <Settings className="w-5 h-5 text-foreground/80" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        
        {/* Units Section */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 flex items-center justify-center">
              <Ruler className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Units</h2>
          </div>
          
          <div className="space-y-4">
            {/* Calories */}
            <div className="flex items-center justify-between">
              <span className="text-foreground/80">Energy</span>
              <div className="flex gap-2">
                {['kcal', 'kJ'].map((unit) => (
                  <button
                    key={unit}
                    onClick={() => setUnits({ ...units, calories: unit })}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      units.calories === unit
                        ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight */}
            <div className="flex items-center justify-between">
              <span className="text-foreground/80">Weight</span>
              <div className="flex gap-2">
                {['kg', 'lb'].map((unit) => (
                  <button
                    key={unit}
                    onClick={() => setUnits({ ...units, weight: unit })}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      units.weight === unit
                        ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>

            {/* Distance */}
            <div className="flex items-center justify-between">
              <span className="text-foreground/80">Distance</span>
              <div className="flex gap-2">
                {['km', 'mi'].map((unit) => (
                  <button
                    key={unit}
                    onClick={() => setUnits({ ...units, distance: unit })}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      units.distance === unit
                        ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105'
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
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in delay-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
            </div>
            <button
              onClick={handleThemeToggle}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                theme === 'dark' ? 'bg-accent' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-card rounded-full shadow-md flex items-center justify-center transition-transform duration-300 ease-out ${
                  theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
                }`}
              >
                {theme === 'dark' ? (
                  <Moon className="w-3 h-3 text-accent" />
                ) : (
                  <Sun className="w-3 h-3 text-chart-4" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in delay-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium">
                    {key === 'mealReminders' && 'Meal Reminders'}
                    {key === 'workoutReminders' && 'Workout Reminders'}
                    {key === 'goalAchievements' && 'Goal Achievements'}
                    {key === 'weeklyReport' && 'Weekly Report Email'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {key === 'mealReminders' && 'Get reminded to log your meals'}
                    {key === 'workoutReminders' && 'Daily workout motivation'}
                    {key === 'goalAchievements' && 'Celebrate your milestones'}
                    {key === 'weeklyReport' && 'Summary sent every Monday'}
                  </p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, [key]: !value })}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                    value ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-card rounded-full shadow-md transition-transform duration-300 ease-out ${
                      value ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Data Export Section */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in delay-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 flex items-center justify-center">
              <Database className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Data Export</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Auto-Export</p>
                <p className="text-sm text-muted-foreground">Monthly data backup to email</p>
              </div>
              <button
                onClick={() => setAutoExport(!autoExport)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                  autoExport ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-card rounded-full shadow-md transition-transform duration-300 ease-out ${
                    autoExport ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <button
              onClick={() => navigate('/reports')}
              className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              View Reports & Export Data
            </button>
          </div>
        </div>



      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-card rounded-xl p-6 max-w-md w-full animate-scale-in">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Delete Account?</h3>
                <p className="text-muted-foreground">
                  This action cannot be undone. All your nutrition data, workout logs, and personal information will be permanently deleted.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex items-center justify-center gap-2 flex-1 py-3 bg-destructive text-white rounded-lg font-medium hover:bg-destructive/90 active:scale-95 transition-all"
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
