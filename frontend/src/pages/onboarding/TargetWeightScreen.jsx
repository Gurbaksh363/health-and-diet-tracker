import { useState } from 'react';
import { motion } from 'framer-motion';

const TargetWeightScreen = ({ onNext, onBack, onSkip, initialValue = {}, currentWeight }) => {
    const [targetWeight, setTargetWeight] = useState(initialValue.value || '');
    const [unit, setUnit] = useState(initialValue.unit || 'kg');

    const handleNext = () => {
        if (!targetWeight) {
            return;
        }
        onNext({ targetWeight: parseFloat(targetWeight), weightUnit: unit });
    };

    const getWeightDifference = () => {
        if (!targetWeight || !currentWeight) return null;
        const diff = parseFloat(currentWeight) - parseFloat(targetWeight);
        return diff;
    };

    const weightDiff = getWeightDifference();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4">
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="max-w-2xl w-full"
            >
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>Step 6 of 11</span>
                        <span>55% complete</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                        <motion.div
                            initial={{ width: '45%' }}
                            animate={{ width: '55%' }}
                            className="bg-primary h-2 rounded-full"
                        />
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-surface rounded-2xl p-8 shadow-lg">
                    {/* Optional Badge */}
                    <div className="flex justify-center mb-4">
                        <span className="bg-secondary/20 text-secondary px-4 py-1 rounded-full text-sm font-semibold">
                            Optional
                        </span>
                    </div>

                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="text-6xl mb-6 text-center"
                    >
                        🎯
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-text text-center mb-2">
                        What's Your Target Weight?
                    </h1>

                    {/* Subtitle */}
                    <p className="text-text-secondary text-center mb-8">
                        Set a realistic goal weight to track your progress
                    </p>

                    {/* Current Weight Display */}
                    {currentWeight && (
                        <div className="bg-bg rounded-xl p-4 mb-6 text-center">
                            <p className="text-sm text-text-secondary mb-1">Current Weight</p>
                            <p className="text-2xl font-bold text-text">
                                {currentWeight} {unit}
                            </p>
                        </div>
                    )}

                    {/* Input */}
                    <div className="mb-6">
                        <motion.input
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            type="number"
                            placeholder={`Enter target weight (${unit})`}
                            value={targetWeight}
                            onChange={(e) => setTargetWeight(e.target.value)}
                            className="w-full text-4xl font-bold text-center text-text bg-bg border-2 border-border rounded-xl p-4 focus:outline-none focus:border-primary transition"
                            step="0.1"
                            min="0"
                        />
                    </div>

                    {/* Unit Toggle */}
                    <div className="flex justify-center gap-2 mb-6">
                        <button
                            onClick={() => setUnit('kg')}
                            className={`px-6 py-2 rounded-lg font-semibold transition ${
                                unit === 'kg'
                                    ? 'bg-primary text-white'
                                    : 'bg-bg text-text-secondary border border-border'
                            }`}
                        >
                            kg
                        </button>
                        <button
                            onClick={() => setUnit('lbs')}
                            className={`px-6 py-2 rounded-lg font-semibold transition ${
                                unit === 'lbs'
                                    ? 'bg-primary text-white'
                                    : 'bg-bg text-text-secondary border border-border'
                            }`}
                        >
                            lbs
                        </button>
                    </div>

                    {/* Weight Difference Display */}
                    {weightDiff !== null && targetWeight && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`rounded-xl p-4 mb-6 text-center ${
                                weightDiff > 0
                                    ? 'bg-red-50 border border-red-200'
                                    : weightDiff < 0
                                    ? 'bg-green-50 border border-green-200'
                                    : 'bg-blue-50 border border-blue-200'
                            }`}
                        >
                            <p className="text-sm text-text-secondary mb-1">Goal</p>
                            <p className="text-2xl font-bold">
                                {weightDiff > 0 && (
                                    <span className="text-red-600">
                                        Lose {Math.abs(weightDiff).toFixed(1)} {unit}
                                    </span>
                                )}
                                {weightDiff < 0 && (
                                    <span className="text-green-600">
                                        Gain {Math.abs(weightDiff).toFixed(1)} {unit}
                                    </span>
                                )}
                                {weightDiff === 0 && (
                                    <span className="text-blue-600">Maintain Weight</span>
                                )}
                            </p>
                        </motion.div>
                    )}

                    {/* Info Box */}
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                        <p className="text-sm text-text-secondary">
                            💡 <strong>Tip:</strong> A healthy rate of weight loss is 0.5-1 kg (1-2 lbs) per week. Set realistic goals for sustainable results.
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
                            onClick={onSkip}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-3 bg-bg border-2 border-border text-text rounded-lg font-semibold hover:bg-surface transition"
                        >
                            Skip
                        </motion.button>
                        <motion.button
                            onClick={handleNext}
                            disabled={!targetWeight}
                            whileHover={{ scale: targetWeight ? 1.02 : 1 }}
                            whileTap={{ scale: targetWeight ? 0.98 : 1 }}
                            className={`flex-2 py-3 rounded-lg font-semibold shadow-md transition ${
                                targetWeight
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

export default TargetWeightScreen;
