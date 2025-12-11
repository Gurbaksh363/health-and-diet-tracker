import { useState } from 'react';
import { Target, Lightbulb } from 'lucide-react';
import { useOnboarding } from '@/context/OnboardingContext';

const TargetWeightScreen = ({ onNext, onBack, currentWeight }) => {
    const { form, updateForm } = useOnboarding();

    // Only KG is allowed
    const unit = "kg";

    // initial value (if user comes back from next screens)
    const [targetWeight, setTargetWeight] = useState(
        form?.goals?.weightGoal?.toString() || ""
    );

    const handleNext = () => {
        if (!targetWeight) return;

        updateForm({
            goals: {
                ...form.goals,
                weightGoal: parseFloat(targetWeight)
            }
        });

        onNext();
    };

    const getWeightDifference = () => {
        if (!targetWeight || !currentWeight) return null;
        return parseFloat(currentWeight) - parseFloat(targetWeight);
    };

    const weightDiff = getWeightDifference();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4">
            <div className="max-w-2xl w-full animate-slide-in-right">
                
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>Step 6 of 11</span>
                        <span>55% complete</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '55%' }} />
                    </div>
                </div>

                {/* Card */}
                <div className="bg-surface rounded-2xl p-8 shadow-lg">

                    {/* Icon */}
                    <div className="mb-6 text-center flex justify-center animate-bounce-in">
                        <Target className="w-16 h-16 text-green-500" strokeWidth={2} />
                    </div>

                    <h1 className="text-3xl font-bold text-text text-center mb-2">
                        What's Your Target Weight?
                    </h1>

                    <p className="text-text-secondary text-center mb-8">
                        Set a realistic goal weight to track your progress
                    </p>

                    {/* Current Weight */}
                    {currentWeight && (
                        <div className="bg-bg rounded-xl p-4 mb-6 text-center">
                            <p className="text-sm text-text-secondary mb-1">Current Weight</p>
                            <p className="text-2xl font-bold text-text">
                                {currentWeight} {unit}
                            </p>
                        </div>
                    )}

                    {/* Input */}
                    <div className="mb-6">
                        <input
                            type="number"
                            placeholder={`Enter target weight (${unit})`}
                            value={targetWeight}
                            onChange={(e) => setTargetWeight(e.target.value)}
                            className="w-full text-4xl font-bold text-center text-text bg-bg border-2 border-border rounded-xl p-4 focus:outline-none focus:border-primary transition"
                            step="0.1"
                            min="1"
                        />
                    </div>

                    {/* Difference Display */}
                    {weightDiff !== null && targetWeight && (
                        <div className={`rounded-xl p-4 mb-6 text-center animate-fade-in ${
                            weightDiff > 0
                                ? 'bg-red-50 border border-red-200'
                                : weightDiff < 0
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-blue-50 border border-blue-200'
                        }`}>
                            <p className="text-sm text-text-secondary mb-1">Goal</p>
                            <p className="text-2xl font-bold">
                                {weightDiff > 0 && (
                                    <span className="text-destructive">
                                        Lose {Math.abs(weightDiff).toFixed(1)} {unit}
                                    </span>
                                )}
                                {weightDiff < 0 && (
                                    <span className="text-primary">
                                        Gain {Math.abs(weightDiff).toFixed(1)} {unit}
                                    </span>
                                )}
                                {weightDiff === 0 && (
                                    <span className="text-secondary">Maintain Weight</span>
                                )}
                            </p>
                        </div>
                    )}

                    {/* Tip */}
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                        <p className="text-sm text-text-secondary flex items-start gap-2">
                            <Lightbulb className="w-5 h-5 shrink-0 text-accent mt-0.5" />
                            <span><strong>Tip:</strong> A healthy rate of weight loss is 0.5–1 kg per week. Set realistic goals.</span>
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={onBack}
                            className="flex-1 py-3 bg-bg border-2 border-border text-text rounded-lg font-semibold hover:bg-surface transition hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!targetWeight}
                            className={`flex-2 py-3 rounded-lg font-semibold shadow-md transition ${
                                targetWeight
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

export default TargetWeightScreen;
