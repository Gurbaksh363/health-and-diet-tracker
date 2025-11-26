import { Target, BarChart3, Flame, Sparkles, Clock, Rocket } from 'lucide-react';

const WelcomeScreen = ({ onNext }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4">
            <div className="max-w-2xl text-center animate-fade-in">
                {/* Icon */}
                <div className="mb-6 flex justify-center animate-scale-in">
                    <Target className="w-24 h-24 text-primary" strokeWidth={2} />
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-text mb-4 animate-fade-in-delay-1">
                    Welcome to Your Health Journey!
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-text-secondary mb-8 animate-fade-in-delay-2">
                    Let's personalize your experience to help you achieve your fitness goals
                </p>

                {/* Features List */}
                <div className="bg-surface rounded-2xl p-8 mb-8 shadow-lg animate-fade-in-delay-3">
                    <h2 className="text-2xl font-semibold text-text mb-6">What we'll do:</h2>
                    <div className="space-y-4 text-left">
                        <div className="flex items-start">
                            <BarChart3 className="w-6 h-6 text-blue-500 mr-4 mt-1" strokeWidth={2} />
                            <div>
                                <h3 className="font-semibold text-text">Collect Your Info</h3>
                                <p className="text-text-secondary text-sm">Age, height, weight, and activity level</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Target className="w-6 h-6 text-green-500 mr-4 mt-1" strokeWidth={2} />
                            <div>
                                <h3 className="font-semibold text-text">Set Your Goals</h3>
                                <p className="text-text-secondary text-sm">Define what you want to achieve</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Flame className="w-6 h-6 text-orange-500 mr-4 mt-1" strokeWidth={2} />
                            <div>
                                <h3 className="font-semibold text-text">Calculate Your Needs</h3>
                                <p className="text-text-secondary text-sm">Get personalized calorie and macro targets</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Sparkles className="w-6 h-6 text-purple-500 mr-4 mt-1" strokeWidth={2} />
                            <div>
                                <h3 className="font-semibold text-text">Create Your Plan</h3>
                                <p className="text-text-secondary text-sm">Receive a customized health plan</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Time Estimate */}
                <p className="text-text-secondary mb-8 flex items-center justify-center gap-2 animate-fade-in-delay-4">
                    <Clock className="w-5 h-5" />
                    Takes about 2 minutes
                </p>

                {/* CTA Button */}
                <button
                    onClick={onNext}
                    className="px-12 py-4 bg-primary text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 animate-fade-in-delay-5 inline-flex items-center gap-2"
                >
                    Let's Get Started!
                    <Rocket className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;
