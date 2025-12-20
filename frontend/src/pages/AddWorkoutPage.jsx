import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Flame, Smartphone, Activity, Dumbbell, Sparkles, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import workoutApi from '@/api/workoutApi';

const AddWorkoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const preselectedExercise = location.state?.exercise;
    const editWorkout = location.state?.workout;
    const isQuickAdd = location.state?.isQuickAdd;
    const isEditMode = location.state?.mode === 'edit' && editWorkout;

    const [workoutData, setWorkoutData] = useState({
        name: editWorkout?.name || preselectedExercise?.name || '',
        type: editWorkout?.type || preselectedExercise?.type || 'cardio',
        duration: editWorkout?.duration || preselectedExercise?.suggestedDuration || 30,
        intensity: editWorkout?.intensity || 'moderate',
        calories: editWorkout?.calories || 0,
        steps: editWorkout?.steps || 0,
        distance: editWorkout?.distance || 0,
    });
    const [loading, setLoading] = useState(false);
    const [manualCalories, setManualCalories] = useState(false);
    const [manualDistance, setManualDistance] = useState(false);

    useEffect(() => {
        console.log('AddWorkoutPage mounted with state:', { preselectedExercise, editWorkout, isQuickAdd, isEditMode });
        console.log('Full location.state:', location.state);
        
        // Update form when navigating from quick add
        if (preselectedExercise && isQuickAdd) {
            console.log('Applying preselected exercise:', preselectedExercise);
            setWorkoutData(prev => ({
                ...prev,
                name: preselectedExercise.name || '',
                type: preselectedExercise.type || 'cardio',
                duration: preselectedExercise.suggestedDuration || 30,
            }));
        }
    }, [preselectedExercise, isQuickAdd]);

    const exerciseTypes = [
        { value: 'cardio', label: 'Cardio', icon: Activity, color: 'bg-accent/10 text-accent', iconColor: 'text-accent' },
        { value: 'strength', label: 'Strength', icon: Dumbbell, color: 'bg-primary/10 text-primary', iconColor: 'text-primary' },
        { value: 'flexibility', label: 'Flexibility', icon: Sparkles, color: 'bg-secondary/10 text-secondary', iconColor: 'text-secondary' },
        { value: 'sports', label: 'Sports', icon: Trophy, color: 'bg-info/10 text-info', iconColor: 'text-info' },
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

    // Auto-calculate calories (only when not in manual mode)
    useEffect(() => {
        if (!manualCalories) {
            const baseCalories = baseCaloriesPerMinute[workoutData.type] || 5;
            const intensityMultiplier = intensityLevels.find(i => i.value === workoutData.intensity)?.multiplier || 1;
            const calculatedCalories = Math.round(baseCalories * workoutData.duration * intensityMultiplier);
            setWorkoutData(prev => ({ ...prev, calories: calculatedCalories }));
        }
    }, [workoutData.duration, workoutData.type, workoutData.intensity, manualCalories]);

    // Auto-calculate distance from steps (only when not in manual mode)
    // Average stride: 0.762 meters, so 1 km = ~1312 steps
    useEffect(() => {
        if (!manualDistance && workoutData.steps > 0) {
            const calculatedDistance = (workoutData.steps * 0.762 / 1000).toFixed(2);
            setWorkoutData(prev => ({ ...prev, distance: parseFloat(calculatedDistance) }));
        }
    }, [workoutData.steps, manualDistance]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!workoutData.name.trim()) {
            toast.error('Please enter an exercise name');
            return;
        }

        if (workoutData.calories <= 0) {
            toast.error('Please enter calories burned');
            return;
        }

        setLoading(true);
        
        try {
            const payload = {
                name: workoutData.name,
                type: workoutData.type,
                duration: workoutData.duration,
                intensity: workoutData.intensity,
                calories: workoutData.calories,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
            };

            if (isEditMode) {
                await workoutApi.updateWorkout(editWorkout._id, payload);
                toast.success('Workout updated successfully! ✏️');
            } else {
                await workoutApi.addWorkout(payload);
                toast.success('Workout logged successfully! 💪');
            }
            
            navigate('/workouts');
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to log workout';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg pb-6 pt-16">
            {/* Header */}
            <div className="bg-linear-to-r from-accent to-primary text-white px-4 py-6 sticky top-16 z-10">
                <div className="max-w-2xl mx-auto flex items-center gap-4">
                    <button
                        onClick={() => navigate('/workouts')}
                        className="p-2 hover:bg-white/20 rounded-full transition"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Workout' : 'Log Workout'}</h1>
                        <p className="text-white/80 text-sm">
                            {isEditMode ? 'Update your activity' : isQuickAdd ? `Quick add: ${preselectedExercise?.name}` : 'Track your activity'}
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 mt-6">
                {/* Activity Type Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-text mb-3">Activity Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {exerciseTypes.map((type) => {
                            const IconComponent = type.icon;
                            return (
                                <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => setWorkoutData({ ...workoutData, type: type.value, name: '' })}
                                    className={`p-4 rounded-xl text-center transition active:scale-95 ${
                                        workoutData.type === type.value
                                            ? `${type.color} border-2 border-current shadow-md`
                                            : 'bg-surface border-2 border-transparent hover:bg-surface/80'
                                    }`}
                                >
                                    <div className="flex justify-center mb-2">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                            workoutData.type === type.value ? 'bg-white/50' : 'bg-gray-100'
                                        }`}>
                                            <IconComponent className={`w-7 h-7 ${type.iconColor}`} />
                                        </div>
                                    </div>
                                    <div className={`text-sm font-semibold ${
                                        workoutData.type === type.value ? '' : 'text-text'
                                    }`}>
                                        {type.label}
                                    </div>
                                </button>
                            );
                        })}
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
                                <button
                                    key={level.value}
                                    type="button"
                                    onClick={() => setWorkoutData({ ...workoutData, intensity: level.value })}
                                    className={`p-3 rounded-xl font-semibold text-sm transition active:scale-95 ${
                                        workoutData.intensity === level.value
                                            ? level.color
                                            : 'bg-bg border border-border text-text hover:bg-surface'
                                    }`}
                                >
                                    {level.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Steps and Distance Tracking */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Step Count */}
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Steps (Optional)</label>
                            <input
                                type="number"
                                min="0"
                                value={workoutData.steps || ''}
                                onChange={(e) => setWorkoutData({ ...workoutData, steps: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                                className="w-full px-4 py-3 bg-bg border-2 border-border rounded-xl focus:border-accent focus:outline-none text-text"
                            />
                            <p className="text-xs text-text-secondary mt-1">Track your steps</p>
                        </div>

                        {/* Distance */}
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">
                                Distance (km)
                                {!manualDistance && workoutData.steps > 0 && (
                                    <span className="text-xs text-accent ml-2">Auto-calculated</span>
                                )}
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={workoutData.distance || ''}
                                    onChange={(e) => {
                                        setManualDistance(true);
                                        setWorkoutData({ ...workoutData, distance: parseFloat(e.target.value) || 0 });
                                    }}
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 bg-bg border-2 border-border rounded-xl focus:border-accent focus:outline-none text-text"
                                />
                                {manualDistance && workoutData.steps > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setManualDistance(false)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-accent hover:text-primary"
                                        title="Reset to auto-calculate from steps"
                                    >
                                        Auto
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-text-secondary mt-1">
                                {!manualDistance && workoutData.steps > 0 
                                    ? `~${(workoutData.steps / 1312).toFixed(0)} steps per km`
                                    : 'Enter distance manually'}
                            </p>
                        </div>
                    </div>

                    {/* Auto-calculated Calories - Only show when activity name is entered */}
                    {workoutData.name.trim() && (
                        <div className="bg-linear-to-br from-accent/10 to-primary/10 rounded-xl p-4 border-2 border-accent/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-text-secondary mb-1">
                                        {manualCalories ? 'Manual Calories Input' : 'Estimated Calories Burned'}
                                    </p>
                                    <p className="text-3xl font-bold text-accent flex items-baseline gap-2">
                                        {workoutData.calories}
                                        <span className="text-sm font-normal text-text-secondary">calories</span>
                                    </p>
                                    <p className="text-xs text-text-secondary mt-1">
                                        {manualCalories 
                                            ? 'Manually entered value' 
                                            : `Based on ${workoutData.duration} min ${workoutData.intensity} intensity ${workoutData.type}`
                                        }
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Flame className="w-7 h-7 text-orange-500" />
                                </div>
                            </div>
                            
                            {/* Manual Override */}
                            <div className="mt-3 pt-3 border-t border-accent/20">
                                <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={manualCalories}
                                        className="rounded accent-accent cursor-pointer"
                                        onChange={(e) => {
                                            setManualCalories(e.target.checked);
                                            if (!e.target.checked) {
                                                // Recalculate when switching back to auto
                                                const baseCalories = baseCaloriesPerMinute[workoutData.type] || 5;
                                                const intensityMultiplier = intensityLevels.find(i => i.value === workoutData.intensity)?.multiplier || 1;
                                                const calculatedCalories = Math.round(baseCalories * workoutData.duration * intensityMultiplier);
                                                setWorkoutData(prev => ({ ...prev, calories: calculatedCalories }));
                                            }
                                        }}
                                    />
                                    Adjust manually
                                </label>
                                
                                {manualCalories && (
                                    <div className="mt-3">
                                        <input
                                            type="number"
                                            min="1"
                                            max="10000"
                                            value={workoutData.calories || ''}
                                            onChange={(e) => setWorkoutData({ ...workoutData, calories: parseInt(e.target.value) || 0 })}
                                            onFocus={(e) => e.target.select()}
                                            placeholder="Enter calories"
                                            className="w-full px-3 py-2 bg-white border-2 border-accent/30 rounded-lg focus:border-accent focus:outline-none text-text text-sm"
                                            autoFocus
                                        />
                                        <p className="text-xs text-text-secondary mt-1">Enter the calories burned manually</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-linear-to-r from-accent to-primary text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Logging Workout...' : 'Log Workout'}
                </button>
            </form>
        </div>
    );
};

export default AddWorkoutPage;
