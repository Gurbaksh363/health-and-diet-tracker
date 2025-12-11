import { useState } from 'react';
import { Cake } from 'lucide-react';
import { useOnboarding } from '@/context/OnboardingContext';

const AgeScreen = ({ onNext, onBack }) => {
    const {form, updateForm} = useOnboarding();
    const [age, setAge] = useState(form.age || "");
    const [error, setError] = useState('');

    const handleNext = () => {
        const ageNum = parseInt(age);
        if (!age || ageNum < 13 || ageNum > 120) {
            setError('Please enter a valid age between 13 and 120');
            return;
        }
        setError('');
        updateForm({ age: ageNum });
        onNext();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleNext();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4">
            <div className="max-w-lg w-full animate-slide-in-right">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>Step 2 of 11</span>
                        <span>18% complete</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '18%' }} />
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-surface rounded-2xl p-8 shadow-lg">
                    {/* Icon */}
                    <div className="mb-6 text-center flex justify-center animate-bounce-in">
                        <Cake className="w-16 h-16 text-pink-500" strokeWidth={2} />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-text text-center mb-2">
                        What's your age?
                    </h1>

                    {/* Subtitle */}
                    <p className="text-text-secondary text-center mb-8">
                        We use this to calculate your personalized targets
                    </p>

                    {/* Input */}
                    <div className="mb-6">
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter your age"
                            autoFocus
                            min="13"
                            max="120"
                            className="w-full px-6 py-4 bg-bg border-2 border-border rounded-xl text-center text-3xl font-semibold text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-2 text-center animate-fade-in">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Quick Select Buttons */}
                    <div className="grid grid-cols-4 gap-2 mb-6">
                        {[18, 25, 35, 45].map((quickAge) => (
                            <button
                                key={quickAge}
                                onClick={() => setAge(quickAge.toString())}
                                className="py-2 bg-bg border border-border rounded-lg text-text hover:bg-primary hover:text-white hover:border-primary transition"
                            >
                                {quickAge}
                            </button>
                        ))}
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
                            className="flex-2 py-3 bg-primary text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:bg-primary/90 transition hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgeScreen;
