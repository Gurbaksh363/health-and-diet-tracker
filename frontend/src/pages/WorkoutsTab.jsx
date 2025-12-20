import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Zap, 
    Footprints, 
    Timer, 
    MapPin, 
    Flame,
    Plus,
    Clock,
    Edit2,
    Trash2,
    PersonStanding,
    Bike,
    Waves,
    Dumbbell,
    Sparkles,
    Heart,
    Trophy,
    Target,
    TrendingUp,
    Loader
} from 'lucide-react';
import { toast } from 'sonner';
import workoutApi from '@/api/workoutApi';

const WorkoutsTab = () => {
    const navigate = useNavigate();
    const [selectedView, setSelectedView] = useState('today'); // today, week, month
    const [selectedFilter, setSelectedFilter] = useState('all'); // all, cardio, strength, flexibility, sports
    const [todaysWorkouts, setTodaysWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [weeklyStats, setWeeklyStats] = useState(null);

    useEffect(() => {
        fetchTodaysWorkouts();
        fetchWeeklyStats();
    }, []);

    const [weeklyWorkouts, setWeeklyWorkouts] = useState([]);

    useEffect(() => {
        if (selectedView === 'week') {
            fetchWeeklyWorkouts();
        } else {
            fetchTodaysWorkouts();
        }
    }, [selectedView]);

    const fetchTodaysWorkouts = async () => {
        try {
            setLoading(true);
            const today = new Date().toISOString().split('T')[0];
                const response = await workoutApi.getWorkoutByDate(today);
                // workoutApi returns response.data shape: { success, data: { workouts, totals } }
                const workouts = response?.data?.workouts || response?.data?.data?.workouts || [];
                setTodaysWorkouts(workouts);
        } catch (error) {
            console.error('Failed to load workouts:', error);
            toast.error('Failed to load workouts');
        } finally {
            setLoading(false);
        }
    };

    const fetchWeeklyStats = async () => {
        try {
            const response = await workoutApi.getWeeklyStats();
            setWeeklyStats(response.data);
        } catch (error) {
            console.error('Failed to load weekly stats:', error);
        }
    };

    const fetchWeeklyWorkouts = async () => {
        try {
            setLoading(true);
            const end = new Date();
            const start = new Date();
            start.setDate(end.getDate() - 6);
            const startDate = start.toISOString().split('T')[0];
            const endDate = end.toISOString().split('T')[0];
                const response = await workoutApi.getWorkoutRange(startDate, endDate);
                const workouts = response?.data?.workouts || response?.data?.data?.workouts || [];
                setWeeklyWorkouts(workouts);
        } catch (error) {
            console.error('Failed to load weekly workouts:', error);
            toast.error('Failed to load weekly workouts');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteWorkout = async (workoutId) => {
        if (!window.confirm('Are you sure you want to delete this workout?')) {
            return;
        }

        try {
            await workoutApi.deleteWorkout(workoutId);
            toast.success('Workout deleted');
            if (selectedView === 'week') {
                fetchWeeklyWorkouts();
            } else {
                fetchTodaysWorkouts();
            }
        } catch (error) {
            toast.error('Failed to delete workout');
        }
    };

    const handleEditWorkout = (workout) => {
        navigate('/workouts/add', { state: { workout, mode: 'edit' } });
    };

    // Derive current dataset and metrics
    const currentWorkouts = selectedView === 'week' ? weeklyWorkouts : todaysWorkouts;
    const burnedCalories = currentWorkouts.reduce((sum, workout) => sum + (workout.calories || 0), 0);
    const targetSteps = 10000;
    const distanceTargetKm = 10;
    const userData = {
        targetCalories: 1780,
        consumedCalories: 1245,
        burnedCalories,
        netCalories: 1245 - burnedCalories,
        targetBurn: 500,
        activeMinutes: currentWorkouts.reduce((sum, workout) => sum + (workout.duration || 0), 0),
        targetActiveMinutes: 60,
    };

    // Calculate workout counts by type
    const workoutCounts = currentWorkouts.reduce((acc, workout) => {
        acc[workout.type] = (acc[workout.type] || 0) + 1;
        return acc;
    }, {});

    const activityTypes = [
        { name: 'Cardio', value: 'cardio', icon: Heart, color: 'text-accent', count: workoutCounts.cardio || 0 },
        { name: 'Strength', value: 'strength', icon: Dumbbell, color: 'text-primary', count: workoutCounts.strength || 0 },
        { name: 'Flexibility', value: 'flexibility', icon: Sparkles, color: 'text-secondary', count: workoutCounts.flexibility || 0 },
        { name: 'Sports', value: 'sports', icon: Trophy, color: 'text-info', count: workoutCounts.sports || 0 },
    ];

    const formatWorkoutDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    };

    // Calculate max calories and average duration
    const maxCalories = currentWorkouts.length > 0 
        ? Math.max(...currentWorkouts.map(w => w.calories || 0))
        : 0;
    const avgDuration = currentWorkouts.length > 0
        ? Math.round(currentWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0) / currentWorkouts.length)
        : 0;

    const maxCaloriesTarget = 600;
    const avgDurationTarget = 45;
    const maxCaloriesProgress = (maxCalories / maxCaloriesTarget) * 100;
    const avgDurationProgress = (avgDuration / avgDurationTarget) * 100;

    const burnProgress = (userData.burnedCalories / userData.targetBurn) * 100;
    const activeMinutesProgress = (userData.activeMinutes / userData.targetActiveMinutes) * 100;

    // Filter workouts based on selected type
    const filteredWorkouts = selectedFilter === 'all' 
        ? currentWorkouts 
        : currentWorkouts.filter(workout => workout.type === selectedFilter);

    const quickAddExercises = [
        { name: 'Running', icon: PersonStanding, type: 'cardio', avgCalPerMin: 9, color: 'text-accent', suggestedDuration: 30 },
        { name: 'Walking', icon: Footprints, type: 'cardio', avgCalPerMin: 4, color: 'text-blue-500', suggestedDuration: 45 },
        { name: 'Cycling', icon: Bike, type: 'cardio', avgCalPerMin: 8, color: 'text-green-500', suggestedDuration: 40 },
        { name: 'Swimming', icon: Waves, type: 'cardio', avgCalPerMin: 10, color: 'text-cyan-500', suggestedDuration: 30 },
        { name: 'Weights', icon: Dumbbell, type: 'strength', avgCalPerMin: 3, color: 'text-purple-500', suggestedDuration: 45 },
        { name: 'Yoga', icon: Sparkles, type: 'flexibility', avgCalPerMin: 2.5, color: 'text-pink-500', suggestedDuration: 60 },
    ];

    return (
        <div className="min-h-screen bg-bg pb-20 pt-16">
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
                    <div className="bg-surface rounded-2xl p-8 flex flex-col items-center gap-4">
                        <Loader className="w-12 h-12 animate-spin text-primary" />
                        <p className="text-text font-medium">Loading workouts...</p>
                    </div>
                </div>
            )}
            {/* Header */}
            <div className="bg-gradient-to-r from-accent to-primary text-white px-4 pt-6 pb-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-1">Workouts & Activity</h1>
                            <p className="text-white/80">Thursday, Nov 21, 2025</p>
                        </div>
                        <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition">
                            <Zap className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Net Calories Card */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 animate-fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-white/80 text-sm mb-1">Net Calories</p>
                                <p className="text-4xl font-bold">
                                    {userData.netCalories}
                                    <span className="text-xl text-white/60"> cal</span>
                                </p>
                                <p className="text-white/60 text-sm mt-1">
                                    {userData.consumedCalories} eaten - {userData.burnedCalories} burned
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/80 text-sm mb-1">Daily Burn</p>
                                <p className="text-2xl font-bold">{userData.burnedCalories}</p>
                                <p className="text-white/60 text-xs">of {userData.targetBurn} cal</p>
                            </div>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                            <div
                                className="h-3 bg-white rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${Math.min(burnProgress, 100)}%` }}
                            />
                        </div>
                        <p className="text-white/60 text-xs mt-2 text-right">
                            {burnProgress.toFixed(0)}% of daily burn goal
                        </p>
                    </div>
                </div>
            </div>

            {/* Activity Rings */}
            <div className="max-w-6xl mx-auto px-4 -mt-6">
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {/* Max Calories */}
                    <div className="bg-surface rounded-xl p-4 shadow-lg text-center animate-fade-in">
                        <div className="relative w-20 h-20 mx-auto mb-2">
                            <svg className="transform -rotate-90 w-20 h-20">
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="none"
                                    className="text-border"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeLinecap="round"
                                    className="text-accent transition-all duration-1000 ease-out"
                                    strokeDasharray={`${(maxCaloriesProgress / 100) * 201} 999`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Flame className="w-6 h-6 text-accent" />
                            </div>
                        </div>
                        <p className="text-xl font-bold text-text">{maxCalories}</p>
                        <p className="text-xs text-text-secondary">of {maxCaloriesTarget} cal</p>
                    </div>

                    {/* Active Minutes Ring */}
                    <div className="bg-surface rounded-xl p-4 shadow-lg text-center animate-fade-in delay-100">
                        <div className="relative w-20 h-20 mx-auto mb-2">
                            <svg className="transform -rotate-90 w-20 h-20">
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="none"
                                    className="text-border"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeLinecap="round"
                                    className="text-primary transition-all duration-1000 ease-out"
                                    strokeDasharray={`${(activeMinutesProgress / 100) * 201} 999`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Timer className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                        <p className="text-xl font-bold text-text">{userData.activeMinutes}</p>
                        <p className="text-xs text-text-secondary">of {userData.targetActiveMinutes} min</p>
                    </div>

                    {/* Average Duration */}
                    <div className="bg-surface rounded-xl p-4 shadow-lg text-center animate-fade-in delay-200">
                        <div className="relative w-20 h-20 mx-auto mb-2">
                            <svg className="transform -rotate-90 w-20 h-20">
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="none"
                                    className="text-border"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeLinecap="round"
                                    className="text-secondary transition-all duration-1000 ease-out"
                                    strokeDasharray={`${(avgDurationProgress / 100) * 201} 999`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-secondary" />
                            </div>
                        </div>
                        <p className="text-xl font-bold text-text">{avgDuration}</p>
                        <p className="text-xs text-text-secondary">of {avgDurationTarget} min</p>
                    </div>
                </div>

                {/* Quick Add Exercises */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-text mb-3">Quick Add</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {quickAddExercises.map((exercise, index) => {
                            const IconComponent = exercise.icon;
                            const handleQuickAdd = () => {
                                console.log('Quick add clicked:', exercise);
                                navigate('/workouts/add', { 
                                    state: { 
                                        exercise: {
                                            name: exercise.name,
                                            type: exercise.type,
                                            suggestedDuration: exercise.suggestedDuration,
                                            avgCalPerMin: exercise.avgCalPerMin,
                                            color: exercise.color
                                        },
                                        isQuickAdd: true 
                                    } 
                                });
                            };
                            return (
                                <button
                                    key={exercise.name}
                                    type="button"
                                    onClick={handleQuickAdd}
                                    className="w-full bg-surface hover:bg-primary/10 rounded-xl p-4 text-center transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 hover:-translate-y-1 active:scale-95 animate-fade-in cursor-pointer"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <IconComponent className={`w-8 h-8 mx-auto mb-2 ${exercise.color}`} strokeWidth={2} />
                                    <p className="text-xs font-semibold text-text">{exercise.name}</p>
                                    <p className="text-xs text-text-secondary">{exercise.suggestedDuration} min</p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Activity Type Filter */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <button 
                        onClick={() => setSelectedFilter('all')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium shadow-md whitespace-nowrap transition ${
                            selectedFilter === 'all' 
                                ? 'bg-primary text-white' 
                                : 'bg-surface text-text hover:bg-primary/10'
                        }`}
                    >
                        <Flame className="w-5 h-5" />
                        <span>All Activities</span>
                        {currentWorkouts.length > 0 && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                                selectedFilter === 'all' ? 'bg-white/20' : 'bg-primary/10 text-primary'
                            }`}>
                                {currentWorkouts.length}
                            </span>
                        )}
                    </button>
                    {activityTypes.map((type) => {
                        const IconComponent = type.icon;
                        const isActive = selectedFilter === type.value;
                        return (
                            <button
                                key={type.name}
                                onClick={() => setSelectedFilter(type.value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition whitespace-nowrap ${
                                    isActive 
                                        ? 'bg-primary text-white shadow-md' 
                                        : 'bg-surface text-text hover:bg-primary/10'
                                }`}
                            >
                                <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : type.color}`} />
                                <span>{type.name}</span>
                                {type.count > 0 && (
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        isActive ? 'bg-white/20' : 'bg-primary/10 text-primary'
                                    }`}>
                                        {type.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Today's Workouts */}
                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-text">
                            {selectedView === 'week' ? "This Week's Workouts" : "Today's Workouts"}
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedView('today')}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                                    selectedView === 'today' ? 'bg-primary text-white' : 'bg-surface text-text'
                                }`}
                            >
                                Today
                            </button>
                            <button
                                onClick={() => setSelectedView('week')}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                                    selectedView === 'week' ? 'bg-primary text-white' : 'bg-surface text-text'
                                }`}
                            >
                                Week
                            </button>
                        </div>
                    </div>

                    {filteredWorkouts.length > 0 ? (
                        filteredWorkouts.map((workout, index) => (
                            <div
                                key={workout._id}
                                className="bg-surface rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-200 group animate-slide-in-left"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                            workout.type === 'cardio' ? 'bg-accent/10' :
                                            workout.type === 'strength' ? 'bg-primary/10' : 'bg-secondary/10'
                                        }`}>
                                            {workout.type === 'cardio' ? (
                                                <Heart className={`w-6 h-6 text-accent`} />
                                            ) : workout.type === 'strength' ? (
                                                <Dumbbell className={`w-6 h-6 text-primary`} />
                                            ) : (
                                                <Sparkles className={`w-6 h-6 text-secondary`} />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-lg text-text">{workout.name}</h4>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                    workout.intensity === 'high' ? 'bg-red-100 text-red-600' :
                                                    workout.intensity === 'moderate' ? 'bg-yellow-100 text-yellow-600' :
                                                    'bg-green-100 text-green-600'
                                                }`}>
                                                    {workout.intensity}
                                                </span>
                                            </div>
                                            <p className="text-sm text-text-secondary mb-2">
                                                {selectedView === 'week'
                                                    ? `${formatWorkoutDate(workout.date)}${workout.time ? ` · ${workout.time}` : ''}`
                                                    : workout.time}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="flex items-center gap-1 text-text-secondary">
                                                    <Clock className="w-4 h-4" />
                                                    {workout.duration} min
                                                </span>
                                                <span className="flex items-center gap-1 font-semibold text-accent">
                                                    <Flame className="w-4 h-4" />
                                                    {workout.calories} cal
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                        <button 
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditWorkout(workout);
                                            }}
                                            className="p-2 hover:bg-primary/10 rounded-lg transition"
                                        >
                                            <Edit2 className="w-4 h-4 text-primary" />
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteWorkout(workout._id);
                                            }}
                                            className="p-2 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-surface rounded-2xl p-12 text-center animate-fade-in">
                            <Target className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
                            <h3 className="text-xl font-bold text-text mb-2">
                                {selectedFilter === 'all' 
                                    ? (selectedView === 'week' ? 'No workouts logged this week' : 'No workouts logged yet')
                                    : (selectedView === 'week' ? `No ${selectedFilter} workouts this week` : `No ${selectedFilter} workouts today`)
                                }
                            </h3>
                            <p className="text-text-secondary mb-6">
                                {selectedFilter === 'all' 
                                    ? 'Start tracking your activity to reach your goals!'
                                    : 'Try a different filter or log a new workout!'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Add Button */}
            <button 
                onClick={() => navigate('/workouts/add')}
                className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-accent to-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-90 transition-transform duration-200 cursor-pointer"
            >
                <Plus className="w-8 h-8" strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default WorkoutsTab;
