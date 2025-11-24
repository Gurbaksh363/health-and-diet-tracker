import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CompletionScreen = ({ userData }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Auto-redirect after 5 seconds
        const timer = setTimeout(() => {
            navigate('/dashboard');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    const handleGoToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-accent/10 via-bg to-primary/10 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full text-center"
            >
                {/* Success Animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="relative mb-8"
                >
                    {/* Confetti/Celebration circles */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, x: 0, y: 0 }}
                            animate={{
                                scale: [0, 1, 0],
                                x: [0, Math.cos(i * 45 * Math.PI / 180) * 100],
                                y: [0, Math.sin(i * 45 * Math.PI / 180) * 100],
                            }}
                            transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                            className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full"
                            style={{
                                backgroundColor: ['#06D6A0', '#FFD166', '#EF476F', '#118AB2'][i % 4],
                            }}
                        />
                    ))}

                    {/* Main Icon */}
                    <div className="text-9xl">
                        🎉
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl font-bold text-text mb-4"
                >
                    You're All Set!
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-text-secondary mb-8"
                >
                    Your personalized health plan is ready
                </motion.p>

                {/* Summary Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-surface rounded-2xl p-8 mb-8 shadow-xl"
                >
                    <h2 className="text-2xl font-bold text-text mb-6">Your Plan Summary</h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-linear-to-br from-primary/20 to-primary/10 p-4 rounded-xl">
                            <p className="text-3xl mb-1">🎯</p>
                            <p className="text-sm text-text-secondary">Target Weight</p>
                            <p className="text-lg font-bold text-text">{userData.targetWeight || userData.weight} kg</p>
                        </div>
                        <div className="bg-linear-to-br from-accent/20 to-accent/10 p-4 rounded-xl">
                            <p className="text-3xl mb-1">�</p>
                            <p className="text-sm text-text-secondary">Water Goal</p>
                            <p className="text-lg font-bold text-text">{userData.waterIntakeGoal} ml</p>
                        </div>
                        <div className="bg-linear-to-br from-secondary/20 to-secondary/10 p-4 rounded-xl">
                            <p className="text-3xl mb-1">😴</p>
                            <p className="text-sm text-text-secondary">Sleep Goal</p>
                            <p className="text-lg font-bold text-text">{userData.sleepGoal}h</p>
                        </div>
                        <div className="bg-linear-to-br from-info/20 to-info/10 p-4 rounded-xl">
                            <p className="text-3xl mb-1">�</p>
                            <p className="text-sm text-text-secondary">Steps Goal</p>
                            <p className="text-lg font-bold text-text">{userData.stepsGoal}</p>
                        </div>
                    </div>

                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                        <p className="text-sm text-text">
                            ✨ Your dashboard is ready with personalized meal plans, workout suggestions, and progress tracking tools!
                        </p>
                    </div>
                </motion.div>

                {/* What's Next */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-surface rounded-2xl p-6 mb-8 shadow-lg"
                >
                    <h3 className="text-xl font-bold text-text mb-4">What's Next?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                        <div className="flex items-start">
                            <span className="text-3xl mr-3">📝</span>
                            <div>
                                <p className="font-semibold text-text">Track Your Meals</p>
                                <p className="text-sm text-text-secondary">Log what you eat daily</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-3xl mr-3">📊</span>
                            <div>
                                <p className="font-semibold text-text">Monitor Progress</p>
                                <p className="text-sm text-text-secondary">See your trends & stats</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-3xl mr-3">🏆</span>
                            <div>
                                <p className="font-semibold text-text">Achieve Goals</p>
                                <p className="text-sm text-text-secondary">Reach your targets</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                    onClick={handleGoToDashboard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-primary/90 transition-all mb-4"
                >
                    Go to Dashboard 🚀
                </motion.button>

                {/* Auto-redirect message */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-sm text-text-secondary"
                >
                    Redirecting automatically in 5 seconds...
                </motion.p>
            </motion.div>
        </div>
    );
};

export default CompletionScreen;
