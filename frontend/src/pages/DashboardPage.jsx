import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  TrendingDown,
  Calendar,
  Flame,
  Lightbulb,
  Target,
  ArrowLeft,
  Activity,
} from "lucide-react";

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
    stepsTarget: 10000,
  };

  const weeklyData = {
    avgCalories: 1891,
    goalCompletion: 86,
    daysActive: 6,
    weightChange: -0.7,
  };

  const streak = {
    current: 12,
    longest: 28,
  };

  // Last 7 days calorie data
  const weeklyCalories = [
    { day: "Mon", consumed: 1780, target: 2000 },
    { day: "Tue", consumed: 1950, target: 2000 },
    { day: "Wed", consumed: 1820, target: 2000 },
    { day: "Thu", consumed: 2100, target: 2000 },
    { day: "Fri", consumed: 1890, target: 2000 },
    { day: "Sat", consumed: 1760, target: 2000 },
    { day: "Sun", consumed: 1940, target: 2000 },
  ];

  // Weight trend (last 7 days)
  const weightTrend = [72.5, 72.3, 72.4, 72.2, 72.0, 71.9, 71.8];

  const maxCalories = Math.max(
    ...weeklyCalories.map((d) => d.consumed),
    ...weeklyCalories.map((d) => d.target)
  );

  return (
    <div className="min-h-screen bg-background pt-1">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-1 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              </div>
              <p className="text-sm text-muted-foreground">Track your daily progress and trends</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Daily Overview Card */}
        <div className="bg-linear-to-br from-primary/10 via-card to-accent/10 rounded-2xl p-6 shadow-lg border border-border animate-fade-in">

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Today's Overview</h2>
            </div>
            <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Calories In */}
            <div className="bg-card rounded-xl p-4 shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Calories In</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-chart-4 to-destructive bg-clip-text text-transparent">
                {today.caloriesConsumed}
              </div>
              <div className="text-xs text-muted-foreground mt-1">from nutrition</div>
            </div>

            {/* Calories Out */}
            <div className="bg-card rounded-xl p-4 shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Calories Out</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {today.caloriesBurned}
              </div>
              <div className="text-xs text-muted-foreground mt-1">from workouts</div>
            </div>

            {/* Remaining */}
            <div className="bg-card rounded-xl p-4 shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Remaining</div>
              <div className="text-3xl font-bold text-foreground">
                {today.remainingCalories}
              </div>
              <div className="text-xs text-muted-foreground mt-1">to reach goal</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Daily Progress</span>
              <span className="font-semibold text-foreground">
                {Math.round((today.caloriesConsumed / today.caloriesTarget) * 100)}%
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                style={{ width: `${Math.min((today.caloriesConsumed / today.caloriesTarget) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0</span>
              <span>Target: {today.caloriesTarget} kcal</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Calorie Bar Chart */}
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in">

            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Weekly Calories</h3>
            </div>

            <div className="space-y-3">
              {weeklyCalories.map((day, i) => {
                const percentage = (day.consumed / maxCalories) * 100;
                const isOverTarget = day.consumed > day.target;

                return (
                  <div key={day.day}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground w-12">{day.day}</span>
                      <span className="font-medium text-foreground">{day.consumed} kcal</span>
                    </div>
                    <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
                      <div
                        className={`h-full rounded-lg transition-all duration-700 ease-out ${
                          isOverTarget 
                            ? 'bg-gradient-to-r from-destructive to-chart-4' 
                            : 'bg-gradient-to-r from-primary to-accent'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                      {/* Target line */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-muted-foreground"
                        style={{ left: `${(day.target / maxCalories) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded"></div>
                <span>On track</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-destructive to-chart-4 rounded"></div>
                <span>Over target</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-0.5 h-3 bg-muted-foreground"></div>
                <span>Target</span>
              </div>
            </div>
          </div>

          {/* Weight Line Chart */}
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in">

            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingDown className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Weight Trend (7 Days)</h3>
            </div>

            <div className="relative h-48">
              <svg
                className="w-full h-full"
                viewBox="0 0 700 200"
                preserveAspectRatio="none"
              >
                {/* Grid lines */}
                {[0, 50, 100, 150, 200].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="700"
                    y2={y}
                    className="stroke-muted"
                    strokeWidth="1"
                  />
                ))}

                {/* Line path */}
                <path
                  d={`${weightTrend
                    .map((w, i) => {
                      const x = (i / (weightTrend.length - 1)) * 700;
                      const minWeight = Math.min(...weightTrend);
                      const maxWeight = Math.max(...weightTrend);
                      const y =
                        180 - ((w - minWeight) / (maxWeight - minWeight)) * 160;
                      return `${i === 0 ? "M" : "L"} ${x},${y}`;
                    })
                    .join(" ")}`}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Area under line */}
                {/* Area under line */}
                <path
                  d={`${weightTrend
                    .map((w, i) => {
                      const x = (i / (weightTrend.length - 1)) * 700;
                      const minWeight = Math.min(...weightTrend);
                      const maxWeight = Math.max(...weightTrend);
                      const y =
                        180 - ((w - minWeight) / (maxWeight - minWeight)) * 160;
                      return `${i === 0 ? "M" : "L"} ${x},${y}`;
                    })
                    .join(" ")} L 700,200 L 0,200 Z`}
                  fill="url(#areaGradient)"
                  className="animate-fade-in"
                />

                {/* Data points */}
                {weightTrend.map((w, i) => {
                  const x = (i / (weightTrend.length - 1)) * 700;
                  const minWeight = Math.min(...weightTrend);
                  const maxWeight = Math.max(...weightTrend);
                  const y =
                    180 - ((w - minWeight) / (maxWeight - minWeight)) * 160;

                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="5"
                      className="fill-card stroke-primary"
                      strokeWidth="2"
                    />
                  );
                })}

                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--accent)" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary">
                ↓ {Math.abs(weeklyData.weightChange)} kg this week - Great progress!
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Summary & Streak */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Weekly Summary */}
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in">

            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Weekly Summary</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Avg Daily Calories</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {weeklyData.avgCalories}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Goal Completion</div>
                <div className="text-2xl font-bold text-foreground mb-2">{weeklyData.goalCompletion}%</div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                    style={{ width: `${weeklyData.goalCompletion}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Active Days</div>
                <div className="text-2xl font-bold text-foreground">{weeklyData.daysActive}/7</div>
              </div>
            </div>
          </div>

          {/* Streak Counter */}
          <div className="bg-gradient-to-br from-chart-4 to-destructive rounded-xl p-6 shadow-lg text-white animate-fade-in">

            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">Streak</h3>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold mb-2">{streak.current}</div>
              <div className="text-sm opacity-90 mb-4">days in a row!</div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-xs opacity-75">Longest Streak</div>
                <div className="text-2xl font-bold">{streak.longest} days</div>
              </div>
            </div>
          </div>

          {/* Motivational Insights */}
          <div className="bg-gradient-to-br from-accent to-secondary rounded-xl p-6 shadow-lg text-white animate-fade-in">

            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">Insights</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-start gap-2">
                <div className="p-1.5 bg-white/20 rounded-md mt-0.5">
                  <Activity className="w-4 h-4 shrink-0" />
                </div>
                <span>
                  Your consistency improved by <strong>12%</strong> this month!
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-start gap-2">
                <div className="p-1.5 bg-white/20 rounded-md mt-0.5">
                  <Target className="w-4 h-4 shrink-0" />
                </div>
                <span>
                  You're <strong>86%</strong> on track to reach your weekly
                  goal.
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-start gap-2">
                <div className="p-1.5 bg-white/20 rounded-md mt-0.5">
                  <Flame className="w-4 h-4 shrink-0" />
                </div>
                <span>
                  Keep it up! You've logged workouts <strong>6 days</strong>{" "}
                  this week.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
