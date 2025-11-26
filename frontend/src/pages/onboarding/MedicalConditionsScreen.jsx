import { useState } from 'react';
import { Hospital, Syringe, Heart, HeartPulse, Flower2, Wind, Bone, TrendingUp, Ban, Stethoscope, Check, Lock, Lightbulb } from 'lucide-react';

const MedicalConditionsScreen = ({ onNext, onBack, onSkip, initialValue = [] }) => {
    const [selectedConditions, setSelectedConditions] = useState(initialValue);

    const conditions = [
        { value: 'diabetes', label: 'Diabetes', icon: Syringe, color: 'text-blue-500' },
        { value: 'hypertension', label: 'High Blood Pressure', icon: Heart, color: 'text-red-500' },
        { value: 'heart_disease', label: 'Heart Disease', icon: HeartPulse, color: 'text-rose-500' },
        { value: 'thyroid', label: 'Thyroid Issues', icon: Flower2, color: 'text-purple-500' },
        { value: 'pcos', label: 'PCOS', icon: Flower2, color: 'text-pink-500' },
        { value: 'asthma', label: 'Asthma', icon: Wind, color: 'text-cyan-500' },
        { value: 'arthritis', label: 'Arthritis', icon: Bone, color: 'text-amber-500' },
        { value: 'cholesterol', label: 'High Cholesterol', icon: TrendingUp, color: 'text-orange-500' },
        { value: 'food_allergies', label: 'Food Allergies', icon: Ban, color: 'text-yellow-500' },
        { value: 'other', label: 'Other Condition', icon: Stethoscope, color: 'text-gray-500' },
    ];

    const toggleCondition = (value) => {
        setSelectedConditions((prev) =>
            prev.includes(value)
                ? prev.filter((c) => c !== value)
                : [...prev, value]
        );
    };

    const handleNext = () => {
        onNext({ medicalConditions: selectedConditions });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4 py-8">
            <div className="max-w-3xl w-full animate-slide-in-right">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>Step 8 of 11</span>
                        <span>73% complete</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '73%' }} />
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-surface rounded-2xl p-8 shadow-lg">
                    {/* Optional Badge */}
                    <div className="flex justify-center mb-4">
                        <span className="bg-secondary/20 text-secondary px-4 py-1 rounded-full text-sm font-semibold">
                            Optional
                        </span>
                    </div>

                    {/* Icon */}
                    <div className="mb-6 text-center flex justify-center animate-bounce-in">
                        <Hospital className="w-16 h-16 text-red-500" strokeWidth={2} />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-text text-center mb-2">
                        Any Medical Conditions?
                    </h1>

                    {/* Subtitle */}
                    <p className="text-text-secondary text-center mb-8">
                        This helps us provide safer, more personalized recommendations
                    </p>

                    {/* Conditions Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 max-h-96 overflow-y-auto">
                        {conditions.map((condition, index) => {
                            const Icon = condition.icon;
                            return (
                                <button
                                    key={condition.value}
                                    onClick={() => toggleCondition(condition.value)}
                                    className={`relative p-4 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 animate-fade-in ${
                                        selectedConditions.includes(condition.value)
                                            ? 'border-primary bg-primary/10 shadow-md'
                                            : 'border-border bg-bg hover:border-primary/50'
                                    }`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <Icon className={`w-8 h-8 mb-2 mx-auto ${condition.color}`} strokeWidth={2} />
                                    <p className="text-sm font-semibold text-text text-center">
                                        {condition.label}
                                    </p>
                                    {selectedConditions.includes(condition.value) && (
                                        <div className="absolute top-2 right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center animate-scale-in">
                                            <Check className="w-4 h-4" strokeWidth={3} />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Info Box */}
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                        <p className="text-sm text-text-secondary flex items-start gap-2">
                            <Lock className="w-5 h-5 shrink-0 text-accent mt-0.5" />
                            <span><strong>Privacy:</strong> Your health information is confidential and used only to personalize your experience. Always consult your doctor before starting any new diet or exercise program.</span>
                        </p>
                    </div>

                    {/* Selected Count */}
                    {selectedConditions.length > 0 && (
                        <p className="text-center text-text-secondary mb-6 animate-fade-in">
                            {selectedConditions.length} condition{selectedConditions.length > 1 ? 's' : ''} selected
                        </p>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={onBack}
                            className="flex-1 py-3 bg-bg border-2 border-border text-text rounded-lg font-semibold hover:bg-surface transition hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Back
                        </button>
                        <button
                            onClick={onSkip}
                            className="flex-1 py-3 bg-bg border-2 border-border text-text rounded-lg font-semibold hover:bg-surface transition hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Skip
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

export default MedicalConditionsScreen;
