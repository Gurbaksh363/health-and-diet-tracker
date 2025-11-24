import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const AddWorkoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const preselectedExercise = location.state?.exercise;

    const [workoutData, setWorkoutData] = useState({
        name: preselectedExercise?.name || '',
        type: preselectedExercise?.type || 'cardio',
        duration: 30,
        intensity: 'moderate',
        calories: 0,
    });

    const exerciseTypes = [
        { value: 'cardio', label: 'Cardio', emoji: '🏃', color: 'bg-accent/10 text-accent' },
        { value: 'strength', label: 'Strength', emoji: '🏋️', color: 'bg-primary/10 text-primary' },
        { value: 'flexibility', label: 'Flexibility', emoji: '🧘', color: 'bg-secondary/10 text-secondary' },
        { value: 'sports', label: 'Sports', emoji: '⚽', color: 'bg-info/10 text-info' },
    ];

    const intensityLevels = [
        { value: 'light', label: 'Light', multiplier: 0.7, color: 'bg-green-100 text-green-600' },
        { value: 'moderate', label: 'Moderate', multiplier: 1.0, color: 'bg-yellow-100 text-yellow-600' },
        { value: 'high', label: 'High', multiplier: 1.3, color: 'bg-red-100 text-red-600' },
    ];

    const suggestedExercises = {
        cardio: ['Running', 'Walking', 'Cycling', 'Swimming', 'Rowing', 'Dancing', 'Jump Rope'],
        strength: ['Weight Training', 'Bodyweight', 'Resistance Bands', 'Kettlebells', 'CrossFit'],
        flexibility: ['Yoga', 'Pilates', 'Stretching', 'Tai Chi'],
        sports: ['Basketball', 'Soccer', 'Tennis', 'Badminton', 'Volleyball', 'Golf'],
    };

    const baseCaloriesPerMinute = {
        cardio: 9,
        strength: 3,
        flexibility: 2.5,
        sports: 7,
    };

    // Auto-calculate calories
    useEffect(() => {
        const baseCalories = baseCaloriesPerMinute[workoutData.type] || 5;
        const intensityMultiplier = intensityLevels.find(i => i.value === workoutData.intensity)?.multiplier || 1;
        const calculatedCalories = Math.round(baseCalories * workoutData.duration * intensityMultiplier);
        setWorkoutData(prev => ({ ...prev, calories: calculatedCalories }));
    }, [workoutData.duration, workoutData.type, workoutData.intensity]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Adding workout:', workoutData);
        // Add to backend/state
        navigate('/workouts');
    };

    return (
        <div className="min-h-screen bg-bg pb-6 pt-16">
            {/* Header */}
            <div className="bg-gradient-to-r from-accent to-primary text-white px-4 py-6 sticky top-16 z-10">
                <div className="max-w-2xl mx-auto flex items-center gap-4">
                    <button
                        onClick={() => navigate('/workouts')}
                        className="p-2 hover:bg-white/20 rounded-full transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">Log Workout</h1>
                        <p className="text-white/80 text-sm">Track your activity</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 mt-6">
                {/* Activity Type Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-text mb-3">Activity Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {exerciseTypes.map((type) => (
                            <motion.button
                                key={type.value}
                                type="button"
                                onClick={() => setWorkoutData({ ...workoutData, type: type.value, name: '' })}
                                whileTap={{ scale: 0.95 }}
                                className={`p-4 rounded-xl text-center transition ${
                                    workoutData.type === type.value
                                        ? `${type.color} border-2 border-current shadow-md`
                                        : 'bg-surface border-2 border-transparent hover:bg-surface/80'
                                }`}
                            >
                                <div className="text-3xl mb-2">{type.emoji}</div>
                                <div className={`text-sm font-semibold ${
                                    workoutData.type === type.value ? '' : 'text-text'
                                }`}>
                                    {type.label}
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="bg-surface rounded-2xl p-6 mb-6 space-y-6">
                    {/* Exercise Name */}
                    <div>
                        <label className="block text-sm font-semibold text-text mb-2">
                            Exercise Name *
                        </label>
                        <input
                            type="text"
                            value={workoutData.name}
                            onChange={(e) => setWorkoutData({ ...workoutData, name: e.target.value })}
                            placeholder="e.g., Morning Run"
                            className="w-full px-4 py-3 bg-bg border-2 border-border rounded-xl focus:border-accent focus:outline-none text-text"
                            required
                        />
                        
                        {/* Quick Suggestions */}
                        {workoutData.name.length < 3 && (
                            <div className="mt-3">
                                <p className="text-xs text-text-secondary mb-2">Suggestions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedExercises[workoutData.type]?.slice(0, 5).map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            type="button"
                                            onClick={() => setWorkoutData({ ...workoutData, name: suggestion })}
                                            className="px-3 py-1 bg-bg hover:bg-accent/10 border border-border hover:border-accent rounded-full text-xs text-text transition"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Duration Slider */}
                    <div>
                        <label className="block text-sm font-semibold text-text mb-2">
                            Duration: <span className="text-accent">{workoutData.duration} minutes</span>
                        </label>
                        <div className="relative pt-2">
                            <input
                                type="range"
                                min="5"
                                max="180"
                                step="5"
                                value={workoutData.duration}
                                onChange={(e) => setWorkoutData({ ...workoutData, duration: parseInt(e.target.value) })}
                                className="w-full h-3 bg-border rounded-full appearance-none cursor-pointer accent-accent"
                                style={{
                                    background: `linear-gradient(to right, rgb(6, 214, 160) 0%, rgb(6, 214, 160) ${(workoutData.duration / 180) * 100}%, rgb(229, 231, 235) ${(workoutData.duration / 180) * 100}%, rgb(229, 231, 235) 100%)`
                                }}
                            />
                            <div className="flex justify-between text-xs text-text-secondary mt-2">
                                <span>5 min</span>
                                <span>1 hour</span>
                                <span>3 hours</span>
                            </div>
                        </div>
                        
                        {/* Quick Duration Buttons */}
                        <div className="flex gap-2 mt-3">
                            {[15, 30, 45, 60].map((mins) => (
                                <button
                                    key={mins}
                                    type="button"
                                    onClick={() => setWorkoutData({ ...workoutData, duration: mins })}
                                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                                        workoutData.duration === mins
                                            ? 'bg-accent text-white'
                                            : 'bg-bg hover:bg-accent/10 text-text border border-border'
                                    }`}
                                >
                                    {mins}m
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Intensity Level */}
                    <div>
                        <label className="block text-sm font-semibold text-text mb-3">Intensity</label>
                        <div className="grid grid-cols-3 gap-3">
                            {intensityLevels.map((level) => (
                                <motion.button
                                    key={level.value}
                                    type="button"
                                    onClick={() => setWorkoutData({ ...workoutData, intensity: level.value })}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-3 rounded-xl font-semibold text-sm transition ${
                                        workoutData.intensity === level.value
                                            ? level.color
                                            : 'bg-bg border border-border text-text hover:bg-surface'
                                    }`}
                                >
                                    {level.label}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Auto-calculated Calories */}
                    <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-4 border-2 border-accent/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-secondary mb-1">Estimated Calories Burned</p>
                                <p className="text-3xl font-bold text-accent flex items-baseline gap-2">
                                    {workoutData.calories}
                                    <span className="text-sm font-normal text-text-secondary">calories</span>
                                </p>
                                <p className="text-xs text-text-secondary mt-1">
                                    Based on {workoutData.duration} min {workoutData.intensity} intensity {workoutData.type}
                                </p>
                            </div>
                            <div className="text-4xl">🔥</div>
                        </div>
                        
                        {/* Manual Override */}
                        <div className="mt-3 pt-3 border-t border-accent/20">
                            <label className="flex items-center gap-2 text-xs text-text-secondary">
                                <input
                                    type="checkbox"
                                    className="rounded accent-accent"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            // Allow manual input
                                        }
                                    }}
                                />
                                Adjust manually
                            </label>
                        </div>
                    </div>
                </div>

                {/* Google Fit Integration Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-surface rounded-xl p-4 mb-6 border-2 border-dashed border-border hover:border-primary transition cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                            📱
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-text">Connect Google Fit</h3>
                            <p className="text-xs text-text-secondary">Auto-sync steps, distance & activities</p>
                        </div>
                        <button
                            type="button"
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition"
                        >
                            Connect
                        </button>
                    </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-accent to-primary text-white font-bold rounded-xl shadow-lg"
                >
                    Log Workout
                </motion.button>
            </form>
        </div>
    );
};

export default AddWorkoutPage;
