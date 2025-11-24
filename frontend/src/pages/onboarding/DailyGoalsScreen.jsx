import { useState } from 'react';
import { motion } from 'framer-motion';

const DailyGoalsScreen = ({ onNext, onBack, onSkip, initialValue = {} }) => {
    const [waterIntake, setWaterIntake] = useState(initialValue.waterIntakeGoal || '2000');
    const [sleepHours, setSleepHours] = useState(initialValue.sleepGoal || '8');
    const [steps, setSteps] = useState(initialValue.stepsGoal || '10000');

    const handleNext = () => {
        onNext({
            waterIntakeGoal: parseFloat(waterIntake),
            sleepGoal: parseFloat(sleepHours),
            stepsGoal: parseInt(steps)
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4 py-8">
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="max-w-3xl w-full"
            >
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>Step 10 of 11</span>
                        <span>91% complete</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                        <motion.div
                            initial={{ width: '82%' }}
                            animate={{ width: '91%' }}
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
                        Set Your Daily Goals
                    </h1>

                    {/* Subtitle */}
                    <p className="text-text-secondary text-center mb-8">
                        Healthy lifestyle goals beyond just diet and exercise
                    </p>

                    {/* Water Intake Goal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-6"
                    >
                        <div className="flex items-center mb-3">
                            <span className="text-3xl mr-3">💧</span>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-text">Water Intake</h3>
                                <p className="text-sm text-text-secondary">Daily hydration goal</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <input
                                type="number"
                                value={waterIntake}
                                onChange={(e) => setWaterIntake(e.target.value)}
                                className="flex-1 text-2xl font-bold text-center text-text bg-bg border-2 border-border rounded-xl p-4 focus:outline-none focus:border-primary transition"
                                min="0"
                                step="100"
                            />
                            <span className="text-xl font-semibold text-text-secondary">ml</span>
                        </div>
                        <div className="flex justify-center gap-2 mt-3">
                            {[1500, 2000, 2500, 3000].map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => setWaterIntake(amount.toString())}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                                        waterIntake === amount.toString()
                                            ? 'bg-primary text-white'
                                            : 'bg-bg text-text-secondary hover:bg-surface'
                                    }`}
                                >
                                    {amount}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Sleep Goal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-6"
                    >
                        <div className="flex items-center mb-3">
                            <span className="text-3xl mr-3">😴</span>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-text">Sleep Duration</h3>
                                <p className="text-sm text-text-secondary">Target sleep hours</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <input
                                type="number"
                                value={sleepHours}
                                onChange={(e) => setSleepHours(e.target.value)}
                                className="flex-1 text-2xl font-bold text-center text-text bg-bg border-2 border-border rounded-xl p-4 focus:outline-none focus:border-primary transition"
                                min="0"
                                max="24"
                                step="0.5"
                            />
                            <span className="text-xl font-semibold text-text-secondary">hours</span>
                        </div>
                        <div className="flex justify-center gap-2 mt-3">
                            {[6, 7, 8, 9].map((hours) => (
                                <button
                                    key={hours}
                                    onClick={() => setSleepHours(hours.toString())}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                                        sleepHours === hours.toString()
                                            ? 'bg-primary text-white'
                                            : 'bg-bg text-text-secondary hover:bg-surface'
                                    }`}
                                >
                                    {hours}h
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Steps Goal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-6"
                    >
                        <div className="flex items-center mb-3">
                            <span className="text-3xl mr-3">👟</span>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-text">Daily Steps</h3>
                                <p className="text-sm text-text-secondary">Movement target</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <input
                                type="number"
                                value={steps}
                                onChange={(e) => setSteps(e.target.value)}
                                className="flex-1 text-2xl font-bold text-center text-text bg-bg border-2 border-border rounded-xl p-4 focus:outline-none focus:border-primary transition"
                                min="0"
                                step="1000"
                            />
                            <span className="text-xl font-semibold text-text-secondary">steps</span>
                        </div>
                        <div className="flex justify-center gap-2 mt-3">
                            {[5000, 8000, 10000, 12000].map((stepCount) => (
                                <button
                                    key={stepCount}
                                    onClick={() => setSteps(stepCount.toString())}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                                        steps === stepCount.toString()
                                            ? 'bg-primary text-white'
                                            : 'bg-bg text-text-secondary hover:bg-surface'
                                    }`}
                                >
                                    {stepCount / 1000}k
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Info Box */}
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                        <p className="text-sm text-text-secondary">
                            💡 <strong>Recommended:</strong> 8 hours of sleep, 2-3L of water, and 10,000 steps daily for optimal health.
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
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-2 py-3 bg-primary text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:bg-primary/90 transition"
                        >
                            Continue
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DailyGoalsScreen;
