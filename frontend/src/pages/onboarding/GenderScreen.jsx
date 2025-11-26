import { useState } from 'react';
import { User, UserRound, Users, Check } from 'lucide-react';

const GenderScreen = ({ onNext, onBack, initialValue = '' }) => {
    const [gender, setGender] = useState(initialValue);

    const genderOptions = [
        { value: 'male', label: 'Male', icon: User, color: 'text-blue-500', bgColor: 'bg-blue-500/20' },
        { value: 'female', label: 'Female', icon: UserRound, color: 'text-pink-500', bgColor: 'bg-pink-500/20' },
        { value: 'other', label: 'Other', icon: Users, color: 'text-purple-500', bgColor: 'bg-purple-500/20' },
    ];

    const handleNext = () => {
        if (!gender) return;
        onNext({ gender });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4">
            <div className="max-w-lg w-full animate-slide-in-right">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>Step 3 of 11</span>
                        <span>27% complete</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-500 animate-progress" style={{ width: '27%' }} />
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
                        {genderOptions.map((option, index) => {
                            const Icon = option.icon;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => setGender(option.value)}
                                    className={`relative p-6 rounded-xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98] animate-fade-in ${
                                        gender === option.value
                                            ? 'border-primary bg-primary/10 shadow-lg'
                                            : 'border-border bg-bg hover:border-primary/50'
                                    }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-center">
                                        <div className={`p-3 rounded-full ${option.bgColor}`}>
                                            <Icon className={`w-8 h-8 ${option.color}`} strokeWidth={2} />
                                        </div>
                                        <div className="text-left flex-1 ml-4">
                                            <h3 className="text-2xl font-semibold text-text">
                                                {option.label}
                                            </h3>
                                        </div>
                                        {gender === option.value && (
                                            <div className="text-primary animate-scale-in">
                                                <Check className="w-8 h-8" strokeWidth={3} />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
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
                            disabled={!gender}
                            className={`flex-2 py-3 rounded-lg font-semibold shadow-md transition ${
                                gender
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

export default GenderScreen;
