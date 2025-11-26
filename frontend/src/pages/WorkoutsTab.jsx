import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    TrendingUp
} from 'lucide-react';

const WorkoutsTab = () => {
    const [selectedView, setSelectedView] = useState('today'); // today, week, month

    // Mock data - replace with actual data from backend
    const userData = {
        targetCalories: 1780,
        consumedCalories: 1245,
        burnedCalories: 420,
        netCalories: 825, // consumed - burned
        targetBurn: 500,
        steps: 8234,
        targetSteps: 10000,
        activeMinutes: 45,
        targetActiveMinutes: 60,
        distance: 6.2, // km
    };

    const todaysWorkouts = [
        {
            id: 1,
            name: 'Morning Run',
            type: 'cardio',
            duration: 30,
            calories: 280,
            time: '07:00',
            intensity: 'moderate',
            source: 'manual',
        },
        {
            id: 2,
            name: 'Weight Training',
            type: 'strength',
            duration: 45,
            calories: 140,
            time: '18:30',
            intensity: 'high',
            source: 'manual',
        },
    ];

    const quickAddExercises = [
        { name: 'Running', icon: PersonStanding, type: 'cardio', avgCalPerMin: 9, color: 'text-accent' },
        { name: 'Walking', icon: Footprints, type: 'cardio', avgCalPerMin: 4, color: 'text-blue-500' },
        { name: 'Cycling', icon: Bike, type: 'cardio', avgCalPerMin: 8, color: 'text-green-500' },
        { name: 'Swimming', icon: Waves, type: 'cardio', avgCalPerMin: 10, color: 'text-cyan-500' },
        { name: 'Weights', icon: Dumbbell, type: 'strength', avgCalPerMin: 3, color: 'text-purple-500' },
        { name: 'Yoga', icon: Sparkles, type: 'flexibility', avgCalPerMin: 2.5, color: 'text-pink-500' },
    ];

    const activityTypes = [
        { name: 'Cardio', icon: Heart, color: 'text-accent', count: 1 },
        { name: 'Strength', icon: Dumbbell, color: 'text-primary', count: 1 },
        { name: 'Flexibility', icon: Sparkles, color: 'text-secondary', count: 0 },
        { name: 'Sports', icon: Trophy, color: 'text-info', count: 0 },
    ];

    const burnProgress = (userData.burnedCalories / userData.targetBurn) * 100;
    const stepsProgress = (userData.steps / userData.targetSteps) * 100;
    const activeMinutesProgress = (userData.activeMinutes / userData.targetActiveMinutes) * 100;

    return (
        <div className="min-h-screen bg-bg pb-20 pt-16">
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
                    {/* Steps Ring */}
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
                                    strokeDasharray={`${(stepsProgress / 100) * 201} 999`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Footprints className="w-6 h-6 text-accent" />
                            </div>
                        </div>
                        <p className="text-xl font-bold text-text">{userData.steps.toLocaleString()}</p>
                        <p className="text-xs text-text-secondary">of {userData.targetSteps.toLocaleString()} steps</p>
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

                    {/* Distance Ring */}
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
                                    strokeDasharray={`${((userData.distance / 10) * 100 / 100) * 201} 999`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-secondary" />
                            </div>
                        </div>
                        <p className="text-xl font-bold text-text">{userData.distance}</p>
                        <p className="text-xs text-text-secondary">kilometers</p>
                    </div>
                </div>

                {/* Quick Add Exercises */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-text mb-3">Quick Add</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {quickAddExercises.map((exercise, index) => {
                            const IconComponent = exercise.icon;
                            return (
                                <Link to="/workouts/add" key={exercise.name} state={{ exercise }}>
                                    <button
                                        className="w-full bg-surface hover:bg-primary/10 rounded-xl p-4 text-center transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 hover:-translate-y-1 active:scale-95 animate-fade-in"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <IconComponent className={`w-8 h-8 mx-auto mb-2 ${exercise.color}`} strokeWidth={2} />
                                        <p className="text-xs font-semibold text-text">{exercise.name}</p>
                                        <p className="text-xs text-text-secondary">{exercise.avgCalPerMin} cal/min</p>
                                    </button>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Activity Type Filter */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full font-medium shadow-md whitespace-nowrap">
                        <Flame className="w-5 h-5" />
                        <span>All Activities</span>
                        <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full">2</span>
                    </button>
                    {activityTypes.map((type) => {
                        const IconComponent = type.icon;
                        return (
                            <button
                                key={type.name}
                                className={`flex items-center gap-2 px-4 py-2 bg-surface hover:bg-primary/10 rounded-full font-medium transition whitespace-nowrap`}
                            >
                                <IconComponent className={`w-5 h-5 ${type.color}`} />
                                <span className="text-text">{type.name}</span>
                                {type.count > 0 && (
                                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{type.count}</span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Today's Workouts */}
                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-text">Today's Workouts</h3>
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

                    {todaysWorkouts.length > 0 ? (
                        todaysWorkouts.map((workout, index) => (
                            <div
                                key={workout.id}
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
                                            <p className="text-sm text-text-secondary mb-2">{workout.time}</p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="flex items-center gap-1 text-text-secondary">
                                                    <Clock className="w-4 h-4" />
                                                    {workout.duration} min
                                                </span>
                                                <span className="flex items-center gap-1 font-semibold text-primary">
                                                    <Flame className="w-4 h-4" />
                                                    {workout.calories} cal
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                        <button className="p-2 hover:bg-primary/10 rounded-lg transition">
                                            <Edit2 className="w-4 h-4 text-primary" />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 rounded-lg transition">
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-surface rounded-2xl p-12 text-center animate-fade-in">
                            <Target className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
                            <h3 className="text-xl font-bold text-text mb-2">No workouts logged yet</h3>
                            <p className="text-text-secondary mb-6">Start tracking your activity to reach your goals!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Add Button */}
            <Link to="/workouts/add">
                <button className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-accent to-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-90 transition-transform duration-200">
                    <Plus className="w-8 h-8" strokeWidth={2.5} />
                </button>
            </Link>
        </div>
    );
};

export default WorkoutsTab;
