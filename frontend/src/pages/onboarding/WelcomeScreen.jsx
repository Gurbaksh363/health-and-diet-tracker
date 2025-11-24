import { motion } from 'framer-motion';

const WelcomeScreen = ({ onNext }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl text-center"
            >
                {/* Icon/Emoji */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="text-8xl mb-6"
                >
                    🎯
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl font-bold text-text mb-4"
                >
                    Welcome to Your Health Journey!
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-text-secondary mb-8"
                >
                    Let's personalize your experience to help you achieve your fitness goals
                </motion.p>

                {/* Features List */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-surface rounded-2xl p-8 mb-8 shadow-lg"
                >
                    <h2 className="text-2xl font-semibold text-text mb-6">What we'll do:</h2>
                    <div className="space-y-4 text-left">
                        <div className="flex items-start">
                            <span className="text-2xl mr-4">📊</span>
                            <div>
                                <h3 className="font-semibold text-text">Collect Your Info</h3>
                                <p className="text-text-secondary text-sm">Age, height, weight, and activity level</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-4">🎯</span>
                            <div>
                                <h3 className="font-semibold text-text">Set Your Goals</h3>
                                <p className="text-text-secondary text-sm">Define what you want to achieve</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-4">🔥</span>
                            <div>
                                <h3 className="font-semibold text-text">Calculate Your Needs</h3>
                                <p className="text-text-secondary text-sm">Get personalized calorie and macro targets</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-4">✨</span>
                            <div>
                                <h3 className="font-semibold text-text">Create Your Plan</h3>
                                <p className="text-text-secondary text-sm">Receive a customized health plan</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Time Estimate */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-text-secondary mb-8"
                >
                    ⏱️ Takes about 2 minutes
                </motion.p>

                {/* CTA Button */}
                <motion.button
                    onClick={onNext}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-primary text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all"
                >
                    Let's Get Started! 🚀
                </motion.button>
            </motion.div>
        </div>
    );
};

export default WelcomeScreen;
