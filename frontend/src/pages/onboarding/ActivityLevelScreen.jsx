import { useState } from 'react';
import { Armchair, PersonStanding, Activity, Dumbbell, Zap, Check, Lightbulb } from 'lucide-react';

const ActivityLevelScreen = ({ onNext, onBack, initialValue = '' }) => {
    const [activityLevel, setActivityLevel] = useState(initialValue);

    const activityOptions = [
        {
            value: 'sedentary',
            label: 'Sedentary',
            icon: Armchair,
            description: 'Little or no exercise',
            detail: 'Desk job, minimal physical activity',
            multiplier: 1.2,
            color: 'text-gray-500',
        },
        {
            value: 'lightly active',
            label: 'Lightly Active',
            icon: PersonStanding,
            description: 'Light exercise 1-3 days/week',
            detail: 'Light walks, casual activities',
            multiplier: 1.375,
            color: 'text-blue-500',
        },
        {
            value: 'moderately active',
            label: 'Moderately Active',
            icon: Activity,
            description: 'Moderate exercise 3-5 days/week',
            detail: 'Regular workouts, active lifestyle',
            multiplier: 1.55,
            color: 'text-green-500',
        },
        {
            value: 'very active',
            label: 'Very Active',
            icon: Dumbbell,
            description: 'Hard exercise 6-7 days/week',
            detail: 'Intense training, physical job',
            multiplier: 1.725,
            color: 'text-orange-500',
        },
        {
            value: 'extra active',
            label: 'Extra Active',
            icon: Zap,
            description: 'Very hard exercise & physical job',
            detail: 'Athlete, multiple daily workouts',
            multiplier: 1.9,
            color: 'text-red-500',
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
            <div className="max-w-2xl w-full animate-slide-in-right">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>Step 7 of 11</span>
                        <span>64% complete</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '64%' }} />
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
                        {activityOptions.map((option, index) => {
                            const Icon = option.icon;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => setActivityLevel(option.value)}
                                    className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:scale-[1.01] active:scale-[0.99] animate-fade-in ${
                                        activityLevel === option.value
                                            ? 'border-primary bg-primary/10 shadow-lg'
                                            : 'border-border bg-bg hover:border-primary/50'
                                    }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-center">
                                        <Icon className={`w-10 h-10 mr-4 ${option.color}`} strokeWidth={2} />
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
                                            <div className="text-primary animate-scale-in">
                                                <Check className="w-6 h-6" strokeWidth={3} />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Info Box */}
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                        <p className="text-sm text-text-secondary flex items-start gap-2">
                            <Lightbulb className="w-5 h-5 shrink-0 text-accent mt-0.5" />
                            <span><strong>Tip:</strong> Be honest about your activity level. Overestimating can lead to eating more calories than you burn.</span>
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={onBack}
                            className="flex-1 py-3 bg-bg border-2 border-border text-text rounded-lg font-semibold hover:bg-surface transition hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!activityLevel}
                            className={`flex-2 py-3 rounded-lg font-semibold shadow-md transition ${
                                activityLevel
                                    ? 'bg-primary text-white hover:shadow-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]'
                                    : 'bg-border text-text-secondary cursor-not-allowed'
                            }`}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityLevelScreen;
