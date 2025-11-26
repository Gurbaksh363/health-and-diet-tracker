import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PartyPopper, Target, Droplets, MoonStar, Footprints, Sparkles, FileText, TrendingUp, Trophy, Rocket } from 'lucide-react';

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
            <div className="max-w-2xl w-full text-center animate-fade-in">
                {/* Success Animation */}
                <div className="relative mb-8">
                    {/* Celebration circles */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full animate-ping"
                            style={{
                                backgroundColor: ['#06D6A0', '#FFD166', '#EF476F', '#118AB2'][i % 4],
                                animationDelay: `${i * 100}ms`,
                                transform: `translate(-50%, -50%) translate(${Math.cos(i * 45 * Math.PI / 180) * 50}px, ${Math.sin(i * 45 * Math.PI / 180) * 50}px)`,
                            }}
                        />
                    ))}

                    {/* Main Icon */}
                    <div className="flex justify-center animate-bounce-in">
                        <PartyPopper className="w-32 h-32 text-primary" strokeWidth={2} />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-5xl font-bold text-text mb-4 animate-fade-in-delay-1">
                    You're All Set!
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-text-secondary mb-8 animate-fade-in-delay-2">
                    Your personalized health plan is ready
                </p>

                {/* Summary Cards */}
                <div className="bg-surface rounded-2xl p-8 mb-8 shadow-xl animate-fade-in-delay-3">
                    <h2 className="text-2xl font-bold text-text mb-6">Your Plan Summary</h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-linear-to-br from-primary/20 to-primary/10 p-4 rounded-xl">
                            <Target className="w-8 h-8 text-primary mb-1 mx-auto" strokeWidth={2} />
                            <p className="text-sm text-text-secondary">Target Weight</p>
                            <p className="text-lg font-bold text-text">{userData.targetWeight || userData.weight} kg</p>
                        </div>
                        <div className="bg-linear-to-br from-accent/20 to-accent/10 p-4 rounded-xl">
                            <Droplets className="w-8 h-8 text-blue-500 mb-1 mx-auto" strokeWidth={2} />
                            <p className="text-sm text-text-secondary">Water Goal</p>
                            <p className="text-lg font-bold text-text">{userData.waterIntakeGoal} ml</p>
                        </div>
                        <div className="bg-linear-to-br from-secondary/20 to-secondary/10 p-4 rounded-xl">
                            <MoonStar className="w-8 h-8 text-indigo-500 mb-1 mx-auto" strokeWidth={2} />
                            <p className="text-sm text-text-secondary">Sleep Goal</p>
                            <p className="text-lg font-bold text-text">{userData.sleepGoal}h</p>
                        </div>
                        <div className="bg-linear-to-br from-info/20 to-info/10 p-4 rounded-xl">
                            <Footprints className="w-8 h-8 text-green-500 mb-1 mx-auto" strokeWidth={2} />
                            <p className="text-sm text-text-secondary">Steps Goal</p>
                            <p className="text-lg font-bold text-text">{userData.stepsGoal}</p>
                        </div>
                    </div>

                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                        <p className="text-sm text-text flex items-center justify-center gap-2">
                            <Sparkles className="w-5 h-5 text-accent" />
                            Your dashboard is ready with personalized meal plans, workout suggestions, and progress tracking tools!
                        </p>
                    </div>
                </div>

                {/* What's Next */}
                <div className="bg-surface rounded-2xl p-6 mb-8 shadow-lg animate-fade-in-delay-4">
                    <h3 className="text-xl font-bold text-text mb-4">What's Next?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                        <div className="flex items-start">
                            <FileText className="w-8 h-8 text-blue-500 mr-3" strokeWidth={2} />
                            <div>
                                <p className="font-semibold text-text">Track Your Meals</p>
                                <p className="text-sm text-text-secondary">Log what you eat daily</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <TrendingUp className="w-8 h-8 text-green-500 mr-3" strokeWidth={2} />
                            <div>
                                <p className="font-semibold text-text">Monitor Progress</p>
                                <p className="text-sm text-text-secondary">See your trends & stats</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Trophy className="w-8 h-8 text-yellow-500 mr-3" strokeWidth={2} />
                            <div>
                                <p className="font-semibold text-text">Achieve Goals</p>
                                <p className="text-sm text-text-secondary">Reach your targets</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <button
                    onClick={handleGoToDashboard}
                    className="px-12 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 mb-4 inline-flex items-center gap-2 animate-fade-in-delay-5"
                >
                    Go to Dashboard
                    <Rocket className="w-6 h-6" />
                </button>

                {/* Auto-redirect message */}
                <p className="text-sm text-text-secondary animate-fade-in-delay-6">
                    Redirecting automatically in 5 seconds...
                </p>
            </div>
        </div>
    );
};

export default CompletionScreen;
