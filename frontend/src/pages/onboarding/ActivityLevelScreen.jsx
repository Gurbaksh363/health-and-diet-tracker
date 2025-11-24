import { useState } from 'react';
import { motion } from 'framer-motion';

const ActivityLevelScreen = ({ onNext, onBack, initialValue = '' }) => {
    const [activityLevel, setActivityLevel] = useState(initialValue);

    const activityOptions = [
        {
            value: 'sedentary',
            label: 'Sedentary',
            emoji: '🪑',
            description: 'Little or no exercise',
            detail: 'Desk job, minimal physical activity',
            multiplier: 1.2,
        },
        {
            value: 'lightly active',
            label: 'Lightly Active',
            emoji: '🚶',
            description: 'Light exercise 1-3 days/week',
            detail: 'Light walks, casual activities',
            multiplier: 1.375,
        },
        {
            value: 'moderately active',
            label: 'Moderately Active',
            emoji: '🏃',
            description: 'Moderate exercise 3-5 days/week',
            detail: 'Regular workouts, active lifestyle',
            multiplier: 1.55,
        },
        {
            value: 'very active',
            label: 'Very Active',
            emoji: '🏋️',
            description: 'Hard exercise 6-7 days/week',
            detail: 'Intense training, physical job',
            multiplier: 1.725,
        },
        {
            value: 'extra active',
            label: 'Extra Active',
            emoji: '🤸',
            description: 'Very hard exercise & physical job',
            detail: 'Athlete, multiple daily workouts',
            multiplier: 1.9,
        },
    ];

    const handleNext = () => {
        if (!activityLevel) return;
        onNext({ 
            goals: { activityLevel }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4 py-8">
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="max-w-2xl w-full"
            >
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>Step 7 of 11</span>
                        <span>64% complete</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                        <motion.div
                            initial={{ width: '55%' }}
                            animate={{ width: '64%' }}
                            className="bg-primary h-2 rounded-full"
                        />
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-surface rounded-2xl p-8 shadow-lg">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-text text-center mb-2">
                        What's your activity level?
                    </h1>

                    {/* Subtitle */}
                    <p className="text-text-secondary text-center mb-8">
                        This helps calculate your daily calorie needs
                    </p>

                    {/* Activity Options */}
                    <div className="space-y-3 mb-8 max-h-96 overflow-y-auto">
                        {activityOptions.map((option, index) => (
                            <motion.button
                                key={option.value}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setActivityLevel(option.value)}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                                    activityLevel === option.value
                                        ? 'border-primary bg-primary/10 shadow-lg'
                                        : 'border-border bg-bg hover:border-primary/50'
                                }`}
                            >
                                <div className="flex items-center">
                                    <div className="text-4xl mr-4">{option.emoji}</div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-text">
                                            {option.label}
                                        </h3>
                                        <p className="text-sm text-text-secondary">
                                            {option.description}
                                        </p>
                                        <p className="text-xs text-text-secondary mt-1">
                                            {option.detail}
                                        </p>
                                    </div>
                                    {activityLevel === option.value && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-primary text-2xl"
                                        >
                                            ✓
                                        </motion.div>
                                    )}
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Info Box */}
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                        <p className="text-sm text-text-secondary">
                            💡 <strong>Tip:</strong> Be honest about your activity level. Overestimating can lead to eating more calories than you burn.
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <motion.button
                            onClick={onBack}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-3 bg-bg border-2 border-border text-text rounded-lg font-semibold hover:bg-surface transition"
                        >
                            Back
                        </motion.button>
                        <motion.button
                            onClick={handleNext}
                            disabled={!activityLevel}
                            whileHover={{ scale: activityLevel ? 1.02 : 1 }}
                            whileTap={{ scale: activityLevel ? 0.98 : 1 }}
                            className={`flex-2 py-3 rounded-lg font-semibold shadow-md transition ${
                                activityLevel
                                    ? 'bg-primary text-white hover:shadow-lg hover:bg-primary/90'
                                    : 'bg-border text-text-secondary cursor-not-allowed'
                            }`}
                        >
                            Continue
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ActivityLevelScreen;
