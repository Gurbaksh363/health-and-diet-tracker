import { useState } from 'react';
import { Ruler } from 'lucide-react';
import { useOnboarding } from '@/context/OnboardingContext';

const HeightScreen = ({ onNext, onBack }) => {
    const { form, updateForm } = useOnboarding();
    const [height, setHeight] = useState(form.height || "");
    const [unit, setUnit] = useState(form.heightUnit || "cm");
    const [feet, setFeet] = useState(form.feet || "");
    const [inches, setInches] = useState(form.inches || "");
    const [error, setError] = useState('');

    const handleNext = () => {
        let heightInCm;

        if (unit === 'cm') {    
            const heightNum = parseInt(height);
            if (!height || heightNum < 100 || heightNum > 250) {
                setError('Please enter a valid height between 100-250 cm');
                return;
            }
            heightInCm = heightNum;
        } else {
            const feetNum = parseInt(feet);
            const inchesNum = parseInt(inches);
            if (!feet || feetNum < 3 || feetNum > 8) {
                setError('Please enter valid feet (3-8)');
                return;
            }
            if (inchesNum < 0 || inchesNum > 11) {
                setError('Please enter valid inches (0-11)');
                return;
            }
            heightInCm = Math.round((feetNum * 12 + (inchesNum || 0)) * 2.54);
        }

        setError('');
        updateForm({
            height: heightInCm,
            heightUnit: unit,
            feet,
            inches
        });
        onNext();
    };

    const handleUnitToggle = (newUnit) => {
        setUnit(newUnit);
        setError('');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4">
            <div className="max-w-lg w-full animate-slide-in-right">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>Step 4 of 11</span>
                        <span>36% complete</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '36%' }} />
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-surface rounded-2xl p-8 shadow-lg">
                    {/* Icon */}
                    <div className="mb-6 text-center flex justify-center animate-bounce-in">
                        <Ruler className="w-16 h-16 text-green-500" strokeWidth={2} />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-text text-center mb-2">
                        What's your height?
                    </h1>

                    {/* Subtitle */}
                    <p className="text-text-secondary text-center mb-8">
                        We need this to calculate your BMI and calorie needs
                    </p>

                    {/* Unit Toggle */}
                    <div className="flex bg-bg rounded-lg p-1 mb-6">
                        <button
                            onClick={() => handleUnitToggle('cm')}
                            className={`flex-1 py-2 rounded-md font-semibold transition ${
                                unit === 'cm'
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-text-secondary hover:text-text'
                            }`}
                        >
                            Centimeters
                        </button>
                        <button
                            onClick={() => handleUnitToggle('ft')}
                            className={`flex-1 py-2 rounded-md font-semibold transition ${
                                unit === 'ft'
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-text-secondary hover:text-text'
                            }`}
                        >
                            Feet & Inches
                        </button>
                    </div>

                    {/* Input */}
                    {unit === 'cm' ? (
                        <div className="mb-6">
                            <div className="relative">
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    placeholder="170"
                                    autoFocus
                                    min="100"
                                    max="250"
                                    className="w-full px-6 py-4 bg-bg border-2 border-border rounded-xl text-center text-3xl font-semibold text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-text-secondary font-semibold">
                                    cm
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-6 grid grid-cols-2 gap-4">
                            <div className="relative">
                                <input
                                    type="number"
                                    value={feet}
                                    onChange={(e) => setFeet(e.target.value)}
                                    placeholder="5"
                                    autoFocus
                                    min="3"
                                    max="8"
                                    className="w-full px-6 py-4 bg-bg border-2 border-border rounded-xl text-center text-3xl font-semibold text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-text-secondary font-semibold">
                                    ft
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={inches}
                                    onChange={(e) => setInches(e.target.value)}
                                    placeholder="9"
                                    min="0"
                                    max="11"
                                    className="w-full px-6 py-4 bg-bg border-2 border-border rounded-xl text-center text-3xl font-semibold text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-text-secondary font-semibold">
                                    in
                                </span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center animate-fade-in">
                            {error}
                        </p>
                    )}

                    {/* Quick Select (for cm only) */}
                    {unit === 'cm' && (
                        <div className="grid grid-cols-4 gap-2 mb-6">
                            {[160, 170, 180, 190].map((quickHeight) => (
                                <button
                                    key={quickHeight}
                                    onClick={() => setHeight(quickHeight.toString())}
                                    className="py-2 bg-bg border border-border rounded-lg text-text hover:bg-primary hover:text-white hover:border-primary transition text-sm"
                                >
                                    {quickHeight}
                                </button>
                            ))}
                        </div>
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

export default HeightScreen;
