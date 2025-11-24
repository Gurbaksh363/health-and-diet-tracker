import { useState } from 'react';
import { motion } from 'framer-motion';

const GenderScreen = ({ onNext, onBack, initialValue = '' }) => {
    const [gender, setGender] = useState(initialValue);

    const genderOptions = [
        { value: 'male', label: 'Male', emoji: '👨', color: 'from-blue-400 to-blue-600' },
        { value: 'female', label: 'Female', emoji: '👩', color: 'from-pink-400 to-pink-600' },
        { value: 'other', label: 'Other', emoji: '🧑', color: 'from-purple-400 to-purple-600' },
    ];

    const handleNext = () => {
        if (!gender) return;
        onNext({ gender });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4">
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="max-w-lg w-full"
            >
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>Step 3 of 11</span>
                        <span>27% complete</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                        <motion.div
                            initial={{ width: '18%' }}
                            animate={{ width: '27%' }}
                            className="bg-primary h-2 rounded-full"
                        />
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-surface rounded-2xl p-8 shadow-lg">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-text text-center mb-2">
                        What's your gender?
                    </h1>

                    {/* Subtitle */}
                    <p className="text-text-secondary text-center mb-8">
                        This helps us calculate your calorie needs more accurately
                    </p>

                    {/* Gender Options */}
                    <div className="grid grid-cols-1 gap-4 mb-8">
                        {genderOptions.map((option, index) => (
                            <motion.button
                                key={option.value}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setGender(option.value)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`relative p-6 rounded-xl border-2 transition-all ${
                                    gender === option.value
                                        ? 'border-primary bg-primary/10 shadow-lg'
                                        : 'border-border bg-bg hover:border-primary/50'
                                }`}
                            >
                                <div className="flex items-center">
                                    <div className={`text-5xl mr-4 p-3 rounded-full bg-linear-to-br ${option.color}`}>
                                        {option.emoji}
                                    </div>
                                    <div className="text-left flex-1">
                                        <h3 className="text-2xl font-semibold text-text">
                                            {option.label}
                                        </h3>
                                    </div>
                                    {gender === option.value && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-primary text-3xl"
                                        >
                                            ✓
                                        </motion.div>
                                    )}
                                </div>
                            </motion.button>
                        ))}
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
                            disabled={!gender}
                            whileHover={{ scale: gender ? 1.02 : 1 }}
                            whileTap={{ scale: gender ? 0.98 : 1 }}
                            className={`flex-2 py-3 rounded-lg font-semibold shadow-md transition ${
                                gender
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

export default GenderScreen;
