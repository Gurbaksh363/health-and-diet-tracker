import { useState } from 'react';
import { motion } from 'framer-motion';
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

const DietPreferencesScreen = ({ onNext, onBack, onSkip, initialValue = {} }) => {
    const [dietType, setDietType] = useState(initialValue.dietType || '');
    const [allergies, setAllergies] = useState(initialValue.allergies || []);
    const [dislikes, setDislikes] = useState(initialValue.dislikes || []);

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
        onNext({ 
            dietaryPreferences: {
                dietType,
                allergies,
                dislikes
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4 py-8">
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="max-w-4xl w-full"
            >
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                        <span>Step 9 of 11</span>
                        <span>82% complete</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                        <motion.div
                            initial={{ width: '73%' }}
                            animate={{ width: '82%' }}
                            className="bg-primary h-2 rounded-full"
                        />
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
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="flex justify-center mb-6"
                    >
                        <Utensils className="w-16 h-16 text-primary" />
                    </motion.div>

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
                                    <motion.button
                                        key={diet.value}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => setDietType(diet.value)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative p-4 rounded-xl border-2 transition-all ${
                                            dietType === diet.value
                                                ? 'border-primary bg-primary/10 shadow-md'
                                                : 'border-border bg-bg hover:border-primary/50'
                                        }`}
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
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute top-2 right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center"
                                            >
                                                <Check className="w-4 h-4" />
                                            </motion.div>
                                        )}
                                    </motion.button>
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
                                    <motion.button
                                        key={allergy.value}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + index * 0.05 }}
                                        onClick={() => toggleAllergy(allergy.value)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative p-3 rounded-xl border-2 transition-all ${
                                            allergies.includes(allergy.value)
                                                ? 'border-red-500 bg-red-50 shadow-md'
                                                : 'border-border bg-bg hover:border-red-300'
                                        }`}
                                    >
                                        <div className="flex justify-center mb-1">
                                            <IconComponent className={`w-6 h-6 ${allergy.color}`} />
                                        </div>
                                        <p className="text-xs font-semibold text-text">
                                            {allergy.label}
                                        </p>
                                        {allergies.includes(allergy.value) && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                            >
                                                <Check className="w-3 h-3" />
                                            </motion.div>
                                        )}
                                    </motion.button>
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
                                    <motion.button
                                        key={dislike.value}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 + index * 0.05 }}
                                        onClick={() => toggleDislike(dislike.value)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative p-3 rounded-xl border-2 transition-all ${
                                            dislikes.includes(dislike.value)
                                                ? 'border-secondary bg-secondary/10 shadow-md'
                                                : 'border-border bg-bg hover:border-secondary/50'
                                        }`}
                                    >
                                        <div className="flex justify-center mb-1">
                                            <IconComponent className={`w-6 h-6 ${dislike.color}`} />
                                        </div>
                                        <p className="text-xs font-semibold text-text">
                                            {dislike.label}
                                        </p>
                                        {dislikes.includes(dislike.value) && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute top-2 right-2 bg-secondary text-white rounded-full w-5 h-5 flex items-center justify-center"
                                            >
                                                <Check className="w-3 h-3" />
                                            </motion.div>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                        <p className="text-sm text-text-secondary flex items-start gap-2">
                            <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <span><strong>Tip:</strong> Select one diet type and any allergies or dislikes. We'll suggest meals that match your preferences.</span>
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <motion.button
                            onClick={onBack}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-3 bg-bg border-2 border-border text-text rounded-lg font-semibold hover:bg-surface transition"
                        >
                            Back
                        </motion.button>
                        <motion.button
                            onClick={onSkip}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-3 bg-bg border-2 border-border text-text rounded-lg font-semibold hover:bg-surface transition"
                        >
                            Skip
                        </motion.button>
                        <motion.button
                            onClick={handleNext}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-2 py-3 bg-primary text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:bg-primary/90 transition"
                        >
                            Continue
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DietPreferencesScreen;
