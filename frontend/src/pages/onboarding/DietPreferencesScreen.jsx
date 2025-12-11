import { useState } from 'react';
import { 
    Utensils, 
    Leaf, 
    Fish, 
    Egg, 
    ShieldBan, 
    Star, 
    Drumstick,
    Salad,
    Check,
    Milk,
    Wheat,
    Shell,
    Nut,
    Flame,
    Cherry,
    Apple,
    Lightbulb,
    Sprout,
    Soup
} from 'lucide-react';
import { useOnboarding } from '@/context/OnboardingContext';

const DietPreferencesScreen = ({ onNext, onBack}) => {
    const { form, updateForm } = useOnboarding();
    const [dietType, setDietType] = useState(
        form?.dietaryPreferences?.dietType || ""
    );
    const [allergies, setAllergies] = useState(
        form?.dietaryPreferences?.allergies || []
    );
    const [dislikes, setDislikes] = useState(
        form?.dietaryPreferences?.dislikes || []
    );

    const dietTypes = [
        { value: 'vegetarian', label: 'Vegetarian', icon: Salad, color: 'text-green-600', description: 'No meat or fish' },
        { value: 'vegan', label: 'Vegan', icon: Leaf, color: 'text-green-500', description: 'No animal products' },
        { value: 'pescatarian', label: 'Pescatarian', icon: Fish, color: 'text-blue-500', description: 'Fish but no meat' },
        { value: 'keto', label: 'Keto', icon: Egg, color: 'text-yellow-600', description: 'Low carb, high fat' },
        { value: 'gluten-free', label: 'Gluten-Free', icon: ShieldBan, color: 'text-amber-600', description: 'No gluten' },
        { value: 'kosher', label: 'Kosher', icon: Star, color: 'text-blue-600', description: 'Jewish dietary laws' },
        { value: 'non-vegetarian', label: 'Non-Vegetarian', icon: Drumstick, color: 'text-red-600', description: 'Eat everything' },
    ];

    const commonAllergies = [
        { value: 'peanuts', label: 'Peanuts', icon: Nut, color: 'text-amber-700' },
        { value: 'tree_nuts', label: 'Tree Nuts', icon: Nut, color: 'text-amber-600' },
        { value: 'dairy', label: 'Dairy', icon: Milk, color: 'text-blue-400' },
        { value: 'eggs', label: 'Eggs', icon: Egg, color: 'text-yellow-500' },
        { value: 'soy', label: 'Soy', icon: Leaf, color: 'text-green-700' },
        { value: 'wheat', label: 'Wheat', icon: Wheat, color: 'text-yellow-700' },
        { value: 'fish', label: 'Fish', icon: Fish, color: 'text-blue-500' },
        { value: 'shellfish', label: 'Shellfish', icon: Shell, color: 'text-orange-500' },
    ];

    const commonDislikes = [
        { value: 'mushrooms', label: 'Mushrooms', icon: Soup, color: 'text-amber-800' },
        { value: 'olives', label: 'Olives', icon: Cherry, color: 'text-green-700' },
        { value: 'onions', label: 'Onions', icon: Apple, color: 'text-purple-600' },
        { value: 'garlic', label: 'Garlic', icon: Sprout, color: 'text-purple-500' },
        { value: 'cilantro', label: 'Cilantro', icon: Leaf, color: 'text-green-600' },
        { value: 'seafood', label: 'Seafood', icon: Shell, color: 'text-orange-600' },
        { value: 'spicy', label: 'Spicy Food', icon: Flame, color: 'text-red-500' },
        { value: 'beans', label: 'Beans', icon: Salad, color: 'text-green-700' },
    ];

    const toggleAllergy = (value) => {
        setAllergies((prev) =>
            prev.includes(value)
                ? prev.filter((a) => a !== value)
                : [...prev, value]
        );
    };

    const toggleDislike = (value) => {
        setDislikes((prev) =>
            prev.includes(value)
                ? prev.filter((d) => d !== value)
                : [...prev, value]
        );
    };

    const handleNext = () => {
        updateForm ({
            dietaryPreferences: {
                dietType,
                allergies,
                dislikes
            }
        });
        onNext();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4 py-8">
            <div className="max-w-4xl w-full animate-slide-in-right">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>Step 9 of 11</span>
                        <span>82% complete</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '82%' }} />
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-surface rounded-2xl p-8 shadow-lg max-h-[85vh] overflow-y-auto">
                    {/* Optional Badge */}
                    <div className="flex justify-center mb-4">
                        <span className="bg-secondary/20 text-secondary px-4 py-1 rounded-full text-sm font-semibold">
                            Optional
                        </span>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-6 animate-bounce-in delay-200">
                        <Utensils className="w-16 h-16 text-primary" />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-text text-center mb-2">
                        Dietary Preferences
                    </h1>

                    {/* Subtitle */}
                    <p className="text-text-secondary text-center mb-8">
                        We'll customize meal suggestions to match your lifestyle
                    </p>

                    {/* Diet Type Selection */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-text mb-3">Diet Type</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {dietTypes.map((diet, index) => {
                                const IconComponent = diet.icon;
                                return (
                                    <button
                                        key={diet.value}
                                        onClick={() => setDietType(diet.value)}
                                        className={`relative p-4 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 animate-scale-in ${
                                            dietType === diet.value
                                                ? 'border-primary bg-primary/10 shadow-md'
                                                : 'border-border bg-bg hover:border-primary/50'
                                        }`}
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <div className="flex justify-center mb-2">
                                            <IconComponent className={`w-8 h-8 ${diet.color}`} />
                                        </div>
                                        <p className="text-sm font-semibold text-text mb-1">
                                            {diet.label}
                                        </p>
                                        <p className="text-xs text-text-secondary">
                                            {diet.description}
                                        </p>
                                        {dietType === diet.value && (
                                            <div className="absolute top-2 right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center animate-scale-in">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Allergies Selection */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-text mb-3">Food Allergies</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {commonAllergies.map((allergy, index) => {
                                const IconComponent = allergy.icon;
                                return (
                                    <button
                                        key={allergy.value}
                                        onClick={() => toggleAllergy(allergy.value)}
                                        className={`relative p-3 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 animate-fade-in ${
                                            allergies.includes(allergy.value)
                                                ? 'border-destructive bg-destructive/10 shadow-md'
                                                : 'border-border bg-bg hover:border-destructive/50'
                                        }`}
                                        style={{ animationDelay: `${300 + index * 50}ms` }}
                                    >
                                        <div className="flex justify-center mb-1">
                                            <IconComponent className={`w-6 h-6 ${allergy.color}`} />
                                        </div>
                                        <p className="text-xs font-semibold text-text">
                                            {allergy.label}
                                        </p>
                                        {allergies.includes(allergy.value) && (
                                            <div className="absolute top-2 right-2 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                                                <Check className="w-3 h-3" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Dislikes Selection */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-text mb-3">Foods You Dislike</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {commonDislikes.map((dislike, index) => {
                                const IconComponent = dislike.icon;
                                return (
                                    <button
                                        key={dislike.value}
                                        onClick={() => toggleDislike(dislike.value)}
                                        className={`relative p-3 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 animate-fade-in ${
                                            dislikes.includes(dislike.value)
                                                ? 'border-red-500 bg-red-50 shadow-md'
                                                : 'border-border bg-bg hover:border-red-300'
                                        }`}
                                        style={{ animationDelay: `${500 + index * 50}ms` }}
                                    >
                                        <div className="flex justify-center mb-1">
                                            <IconComponent className={`w-6 h-6 ${dislike.color}`} />
                                        </div>
                                        <p className="text-xs font-semibold text-text">
                                            {dislike.label}
                                        </p>
                                        {dislikes.includes(dislike.value) && (
                                            <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                                                <Check className="w-3 h-3" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                        <p className="text-sm text-text-secondary flex items-start gap-2">
                            <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                            <span><strong>Tip:</strong> Select one diet type and any allergies or dislikes. We'll suggest meals that match your preferences.</span>
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={onBack}
                            className="flex-1 py-3 bg-bg border-2 border-border text-text rounded-lg font-semibold hover:bg-surface hover:scale-[1.02] active:scale-98 transition-all"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!dietType}
                            className={`flex-2 py-3 rounded-lg font-semibold shadow-md transition ${
                            dietType
                                ? 'bg-primary text-white hover:shadow-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-98'
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

export default DietPreferencesScreen;
