import { useState } from 'react';
import { Scale } from 'lucide-react';
import { useOnboarding } from '@/context/OnboardingContext';

const WeightScreen = ({ onNext, onBack}) => {
    const { form, updateForm } = useOnboarding();
    const [weight, setWeight] = useState(form.weight || "");
    const [error, setError] = useState('');

    const handleNext = () => {
        const weightNum = parseFloat(weight);
        
        if (!weight || weightNum < 30 || weightNum > 300) {
            setError('Please enter a valid weight between 30-300 kg');
            return;
        }

        setError('');
        updateForm({ weight: weightNum });
        onNext();
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4">
            <div className="max-w-lg w-full animate-slide-in-right">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>Step 5 of 11</span>
                        <span>45% complete</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '45%' }} />
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-surface rounded-2xl p-8 shadow-lg">
                    {/* Icon */}
                    <div className="mb-6 text-center flex justify-center animate-bounce-in">
                        <Scale className="w-16 h-16 text-blue-500" strokeWidth={2} />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-text text-center mb-2">
                        What's your current weight?
                    </h1>

                    {/* Subtitle */}
                    <p className="text-text-secondary text-center mb-8">
                        This is your starting point for tracking progress
                    </p>

                    {/* Unit Toggle */}
                    <div className="flex bg-bg rounded-lg p-1 mb-6">
                        <button
                            className={`flex-1 py-2 rounded-md font-semibold transition`}
                        >
                            Kilograms
                        </button>
                    </div>

                    {/* Input */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder={'70'}
                                autoFocus
                                step="0.1"
                                min={'30'}
                                max={'300'}
                                className="w-full px-6 py-4 bg-bg border-2 border-border rounded-xl text-center text-3xl font-semibold text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            />
                            {/* <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-text-secondary font-semibold">
                                {unit}
                            </span> */}
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm mt-2 text-center animate-fade-in">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Quick Select */}
                    <div className="grid grid-cols-4 gap-2 mb-6">
                        {[60, 70, 80, 90].map((quickWeight) => (
                            <button
                                key={quickWeight}
                                onClick={() => setWeight(quickWeight.toString())}
                                className="py-2 bg-bg border border-border rounded-lg text-text hover:bg-primary hover:text-white hover:border-primary transition"
                            >
                                {quickWeight}
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

export default WeightScreen;
