import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

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
        { name: 'Running', emoji: '🏃', type: 'cardio', avgCalPerMin: 9 },
        { name: 'Walking', emoji: '🚶', type: 'cardio', avgCalPerMin: 4 },
        { name: 'Cycling', emoji: '🚴', type: 'cardio', avgCalPerMin: 8 },
        { name: 'Swimming', emoji: '🏊', type: 'cardio', avgCalPerMin: 10 },
        { name: 'Weights', emoji: '🏋️', type: 'strength', avgCalPerMin: 3 },
        { name: 'Yoga', emoji: '🧘', type: 'flexibility', avgCalPerMin: 2.5 },
    ];

    const activityTypes = [
        { name: 'Cardio', emoji: '🏃', color: 'text-accent', count: 1 },
        { name: 'Strength', emoji: '🏋️', color: 'text-primary', count: 1 },
        { name: 'Flexibility', emoji: '🧘', color: 'text-secondary', count: 0 },
        { name: 'Sports', emoji: '⚽', color: 'text-info', count: 0 },
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
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </button>
                    </div>

                    {/* Net Calories Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
                    >
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
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(burnProgress, 100)}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-3 bg-white rounded-full"
                            />
                        </div>
                        <p className="text-white/60 text-xs mt-2 text-right">
                            {burnProgress.toFixed(0)}% of daily burn goal
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Activity Rings */}
            <div className="max-w-6xl mx-auto px-4 -mt-6">
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {/* Steps Ring */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-surface rounded-xl p-4 shadow-lg text-center"
                    >
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
                                <motion.circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeLinecap="round"
                                    className="text-accent"
                                    initial={{ strokeDasharray: '0 999' }}
                                    animate={{ strokeDasharray: `${(stepsProgress / 100) * 201} 999` }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-bold">👟</span>
                            </div>
                        </div>
                        <p className="text-xl font-bold text-text">{userData.steps.toLocaleString()}</p>
                        <p className="text-xs text-text-secondary">of {userData.targetSteps.toLocaleString()} steps</p>
                    </motion.div>

                    {/* Active Minutes Ring */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-surface rounded-xl p-4 shadow-lg text-center"
                    >
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
                                <motion.circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeLinecap="round"
                                    className="text-primary"
                                    initial={{ strokeDasharray: '0 999' }}
                                    animate={{ strokeDasharray: `${(activeMinutesProgress / 100) * 201} 999` }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-bold">⏱️</span>
                            </div>
                        </div>
                        <p className="text-xl font-bold text-text">{userData.activeMinutes}</p>
                        <p className="text-xs text-text-secondary">of {userData.targetActiveMinutes} min</p>
                    </motion.div>

                    {/* Distance Ring */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-surface rounded-xl p-4 shadow-lg text-center"
                    >
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
                                <motion.circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeLinecap="round"
                                    className="text-secondary"
                                    initial={{ strokeDasharray: '0 999' }}
                                    animate={{ strokeDasharray: `${((userData.distance / 10) * 100 / 100) * 201} 999` }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-bold">📍</span>
                            </div>
                        </div>
                        <p className="text-xl font-bold text-text">{userData.distance}</p>
                        <p className="text-xs text-text-secondary">kilometers</p>
                    </motion.div>
                </div>

                {/* Quick Add Exercises */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-text mb-3">Quick Add</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {quickAddExercises.map((exercise, index) => (
                            <Link to="/workouts/add" key={exercise.name} state={{ exercise }}>
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-surface hover:bg-primary/10 rounded-xl p-4 text-center transition shadow-sm hover:shadow-md"
                                >
                                    <span className="text-3xl mb-2 block">{exercise.emoji}</span>
                                    <p className="text-xs font-semibold text-text">{exercise.name}</p>
                                    <p className="text-xs text-text-secondary">{exercise.avgCalPerMin} cal/min</p>
                                </motion.button>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Activity Type Filter */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full font-medium shadow-md whitespace-nowrap">
                        <span className="text-lg">🔥</span>
                        <span>All Activities</span>
                        <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full">2</span>
                    </button>
                    {activityTypes.map((type) => (
                        <button
                            key={type.name}
                            className={`flex items-center gap-2 px-4 py-2 bg-surface hover:bg-primary/10 rounded-full font-medium transition whitespace-nowrap ${type.color}`}
                        >
                            <span className="text-lg">{type.emoji}</span>
                            <span className="text-text">{type.name}</span>
                            {type.count > 0 && (
                                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{type.count}</span>
                            )}
                        </button>
                    ))}
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

                    <AnimatePresence mode="wait">
                        {todaysWorkouts.length > 0 ? (
                            todaysWorkouts.map((workout, index) => (
                                <motion.div
                                    key={workout.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-surface rounded-2xl p-5 shadow-md hover:shadow-lg transition group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                                                workout.type === 'cardio' ? 'bg-accent/10' :
                                                workout.type === 'strength' ? 'bg-primary/10' : 'bg-secondary/10'
                                            }`}>
                                                {workout.type === 'cardio' ? '🏃' : 
                                                 workout.type === 'strength' ? '🏋️' : '🧘'}
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
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {workout.duration} min
                                                    </span>
                                                    <span className="flex items-center gap-1 font-semibold text-primary">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                                        </svg>
                                                        {workout.calories} cal
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                            <button className="p-2 hover:bg-primary/10 rounded-lg transition">
                                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button className="p-2 hover:bg-red-50 rounded-lg transition">
                                                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-surface rounded-2xl p-12 text-center"
                            >
                                <p className="text-6xl mb-4">💪</p>
                                <h3 className="text-xl font-bold text-text mb-2">No workouts logged yet</h3>
                                <p className="text-text-secondary mb-6">Start tracking your activity to reach your goals!</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Floating Add Button */}
            <Link to="/workouts/add">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-accent to-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                </motion.button>
            </Link>
        </div>
    );
};

export default WorkoutsTab;
