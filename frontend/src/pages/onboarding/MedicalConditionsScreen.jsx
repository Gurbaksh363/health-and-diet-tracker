import { useState } from 'react';
import { motion } from 'framer-motion';

const MedicalConditionsScreen = ({ onNext, onBack, onSkip, initialValue = [] }) => {
    const [selectedConditions, setSelectedConditions] = useState(initialValue);

    const conditions = [
        { value: 'diabetes', label: 'Diabetes', emoji: '💉' },
        { value: 'hypertension', label: 'High Blood Pressure', emoji: '❤️' },
        { value: 'heart_disease', label: 'Heart Disease', emoji: '🫀' },
        { value: 'thyroid', label: 'Thyroid Issues', emoji: '🦋' },
        { value: 'pcos', label: 'PCOS', emoji: '🌸' },
        { value: 'asthma', label: 'Asthma', emoji: '🫁' },
        { value: 'arthritis', label: 'Arthritis', emoji: '🦴' },
        { value: 'cholesterol', label: 'High Cholesterol', emoji: '📊' },
        { value: 'food_allergies', label: 'Food Allergies', emoji: '🚫' },
        { value: 'other', label: 'Other Condition', emoji: '⚕️' },
    ];

    const toggleCondition = (value) => {
        setSelectedConditions((prev) =>
            prev.includes(value)
                ? prev.filter((c) => c !== value)
                : [...prev, value]
        );
    };

    const handleNext = () => {
        onNext({ medicalConditions: selectedConditions });
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
                        <span>Step 8 of 11</span>
                        <span>73% complete</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                        <motion.div
                            initial={{ width: '64%' }}
                            animate={{ width: '73%' }}
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
                        🏥
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-text text-center mb-2">
                        Any Medical Conditions?
                    </h1>

                    {/* Subtitle */}
                    <p className="text-text-secondary text-center mb-8">
                        This helps us provide safer, more personalized recommendations
                    </p>

                    {/* Conditions Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 max-h-96 overflow-y-auto">
                        {conditions.map((condition, index) => (
                            <motion.button
                                key={condition.value}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => toggleCondition(condition.value)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative p-4 rounded-xl border-2 transition-all ${
                                    selectedConditions.includes(condition.value)
                                        ? 'border-primary bg-primary/10 shadow-md'
                                        : 'border-border bg-bg hover:border-primary/50'
                                }`}
                            >
                                <div className="text-3xl mb-2">{condition.emoji}</div>
                                <p className="text-sm font-semibold text-text text-center">
                                    {condition.label}
                                </p>
                                {selectedConditions.includes(condition.value) && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute top-2 right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                    >
                                        ✓
                                    </motion.div>
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Info Box */}
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                        <p className="text-sm text-text-secondary">
                            🔒 <strong>Privacy:</strong> Your health information is confidential and used only to personalize your experience. Always consult your doctor before starting any new diet or exercise program.
                        </p>
                    </div>

                    {/* Selected Count */}
                    {selectedConditions.length > 0 && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-text-secondary mb-6"
                        >
                            {selectedConditions.length} condition{selectedConditions.length > 1 ? 's' : ''} selected
                        </motion.p>
                    )}

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

export default MedicalConditionsScreen;
