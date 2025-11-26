import { useState } from 'react';
import { Scale } from 'lucide-react';

const WeightScreen = ({ onNext, onBack, initialValue = { value: '', unit: 'kg' } }) => {
    const [weight, setWeight] = useState(initialValue.value);
    const [unit, setUnit] = useState(initialValue.unit);
    const [error, setError] = useState('');

    const handleNext = () => {
        const weightNum = parseFloat(weight);
        
        if (unit === 'kg') {
            if (!weight || weightNum < 30 || weightNum > 300) {
                setError('Please enter a valid weight between 30-300 kg');
                return;
            }
        } else {
            if (!weight || weightNum < 66 || weightNum > 660) {
                setError('Please enter a valid weight between 66-660 lbs');
                return;
            }
        }

        const weightInKg = unit === 'kg' ? weightNum : Math.round(weightNum / 2.205);
        
        setError('');
        onNext({ weight: weightInKg, weightUnit: unit });
    };

    const handleUnitToggle = (newUnit) => {
        // Convert the current weight when switching units
        if (weight) {
            const weightNum = parseFloat(weight);
            if (unit === 'kg' && newUnit === 'lbs') {
                setWeight((weightNum * 2.205).toFixed(1));
            } else if (unit === 'lbs' && newUnit === 'kg') {
                setWeight((weightNum / 2.205).toFixed(1));
            }
        }
        setUnit(newUnit);
        setError('');
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
                            onClick={() => handleUnitToggle('kg')}
                            className={`flex-1 py-2 rounded-md font-semibold transition ${
                                unit === 'kg'
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-text-secondary hover:text-text'
                            }`}
                        >
                            Kilograms
                        </button>
                        <button
                            onClick={() => handleUnitToggle('lbs')}
                            className={`flex-1 py-2 rounded-md font-semibold transition ${
                                unit === 'lbs'
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-text-secondary hover:text-text'
                            }`}
                        >
                            Pounds
                        </button>
                    </div>

                    {/* Input */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder={unit === 'kg' ? '70' : '154'}
                                autoFocus
                                step="0.1"
                                min={unit === 'kg' ? '30' : '66'}
                                max={unit === 'kg' ? '300' : '660'}
                                className="w-full px-6 py-4 bg-bg border-2 border-border rounded-xl text-center text-3xl font-semibold text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-text-secondary font-semibold">
                                {unit}
                            </span>
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm mt-2 text-center animate-fade-in">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Quick Select */}
                    <div className="grid grid-cols-4 gap-2 mb-6">
                        {unit === 'kg'
                            ? [60, 70, 80, 90].map((quickWeight) => (
                                  <button
                                      key={quickWeight}
                                      onClick={() => setWeight(quickWeight.toString())}
                                      className="py-2 bg-bg border border-border rounded-lg text-text hover:bg-primary hover:text-white hover:border-primary transition"
                                  >
                                      {quickWeight}
                                  </button>
                              ))
                            : [130, 154, 176, 198].map((quickWeight) => (
                                  <button
                                      key={quickWeight}
                                      onClick={() => setWeight(quickWeight.toString())}
                                      className="py-2 bg-bg border border-border rounded-lg text-text hover:bg-primary hover:text-white hover:border-primary transition text-sm"
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
