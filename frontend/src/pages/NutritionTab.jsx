import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const NutritionTab = () => {
    const [selectedMeal, setSelectedMeal] = useState('all');
    const [showAddFood, setShowAddFood] = useState(false);

    // Mock data - replace with actual data from backend
    const userData = {
        targetCalories: 1780,
        consumedCalories: 1245,
        targetProtein: 133,
        consumedProtein: 89,
        targetCarbs: 178,
        consumedCarbs: 142,
        targetFats: 59,
        consumedFats: 38,
    };

    const todaysMeals = [
        {
            id: 1,
            type: 'breakfast',
            time: '08:30',
            items: [
                { name: 'Oatmeal with Berries', quantity: '1 bowl', calories: 320, protein: 12, carbs: 58, fats: 6 },
                { name: 'Greek Yogurt', quantity: '200g', calories: 140, protein: 20, carbs: 8, fats: 4 },
                { name: 'Orange Juice', quantity: '250ml', calories: 110, protein: 2, carbs: 26, fats: 0 },
            ],
        },
        {
            id: 2,
            type: 'lunch',
            time: '13:15',
            items: [
                { name: 'Grilled Chicken Breast', quantity: '150g', calories: 248, protein: 47, carbs: 0, fats: 5 },
                { name: 'Brown Rice', quantity: '1 cup', calories: 218, protein: 5, carbs: 46, fats: 2 },
                { name: 'Mixed Vegetables', quantity: '200g', calories: 80, protein: 3, carbs: 16, fats: 1 },
            ],
        },
        {
            id: 3,
            type: 'snacks',
            time: '16:00',
            items: [
                { name: 'Protein Bar', quantity: '1 bar', calories: 200, protein: 20, carbs: 22, fats: 8 },
            ],
        },
    ];

    const mealTypes = [
        { value: 'all', label: 'All Meals', emoji: '🍽️', count: 9 },
        { value: 'breakfast', label: 'Breakfast', emoji: '🌅', count: 3 },
        { value: 'lunch', label: 'Lunch', emoji: '☀️', count: 3 },
        { value: 'dinner', label: 'Dinner', emoji: '🌙', count: 0 },
        { value: 'snacks', label: 'Snacks', emoji: '🍿', count: 1 },
    ];

    const calorieProgress = (userData.consumedCalories / userData.targetCalories) * 100;
    const proteinProgress = (userData.consumedProtein / userData.targetProtein) * 100;
    const carbsProgress = (userData.consumedCarbs / userData.targetCarbs) * 100;
    const fatsProgress = (userData.consumedFats / userData.targetFats) * 100;

    const getFilteredMeals = () => {
        if (selectedMeal === 'all') return todaysMeals;
        return todaysMeals.filter(meal => meal.type === selectedMeal);
    };

    return (
        <div className="min-h-screen bg-bg pb-20 pt-16">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent text-white px-4 pt-6 pb-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-1">Nutrition Tracker</h1>
                            <p className="text-white/80">Thursday, Nov 21, 2025</p>
                        </div>
                        <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </button>
                    </div>

                    {/* Daily Calorie Progress */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-white/80 text-sm mb-1">Calories Today</p>
                                <p className="text-4xl font-bold">
                                    {userData.consumedCalories}
                                    <span className="text-xl text-white/60"> / {userData.targetCalories}</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">{userData.targetCalories - userData.consumedCalories}</p>
                                <p className="text-white/80 text-sm">Remaining</p>
                            </div>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(calorieProgress, 100)}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className={`h-3 rounded-full ${
                                    calorieProgress > 100 ? 'bg-red-400' : 'bg-white'
                                }`}
                            />
                        </div>
                        <p className="text-white/60 text-xs mt-2 text-right">
                            {calorieProgress.toFixed(0)}% of daily goal
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Macros Cards */}
            <div className="max-w-6xl mx-auto px-4 -mt-6">
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {/* Protein */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-surface rounded-xl p-4 shadow-lg"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">🥩</span>
                            <span className="text-xs font-semibold text-accent">Protein</span>
                        </div>
                        <p className="text-2xl font-bold text-text mb-1">
                            {userData.consumedProtein}g
                        </p>
                        <div className="w-full bg-border rounded-full h-1.5 mb-1">
                            <div
                                className="bg-accent h-1.5 rounded-full"
                                style={{ width: `${Math.min(proteinProgress, 100)}%` }}
                            />
                        </div>
                        <p className="text-xs text-text-secondary">of {userData.targetProtein}g</p>
                    </motion.div>

                    {/* Carbs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-surface rounded-xl p-4 shadow-lg"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">🍞</span>
                            <span className="text-xs font-semibold text-primary">Carbs</span>
                        </div>
                        <p className="text-2xl font-bold text-text mb-1">
                            {userData.consumedCarbs}g
                        </p>
                        <div className="w-full bg-border rounded-full h-1.5 mb-1">
                            <div
                                className="bg-primary h-1.5 rounded-full"
                                style={{ width: `${Math.min(carbsProgress, 100)}%` }}
                            />
                        </div>
                        <p className="text-xs text-text-secondary">of {userData.targetCarbs}g</p>
                    </motion.div>

                    {/* Fats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-surface rounded-xl p-4 shadow-lg"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">🥑</span>
                            <span className="text-xs font-semibold text-secondary">Fats</span>
                        </div>
                        <p className="text-2xl font-bold text-text mb-1">
                            {userData.consumedFats}g
                        </p>
                        <div className="w-full bg-border rounded-full h-1.5 mb-1">
                            <div
                                className="bg-secondary h-1.5 rounded-full"
                                style={{ width: `${Math.min(fatsProgress, 100)}%` }}
                            />
                        </div>
                        <p className="text-xs text-text-secondary">of {userData.targetFats}g</p>
                    </motion.div>
                </div>

                {/* Meal Type Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {mealTypes.map((meal) => (
                        <motion.button
                            key={meal.value}
                            onClick={() => setSelectedMeal(meal.value)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
                                selectedMeal === meal.value
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-surface text-text hover:bg-surface/80'
                            }`}
                        >
                            <span className="text-lg">{meal.emoji}</span>
                            <span>{meal.label}</span>
                            {meal.count > 0 && (
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    selectedMeal === meal.value ? 'bg-white/20' : 'bg-primary/10 text-primary'
                                }`}>
                                    {meal.count}
                                </span>
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Meals List */}
                <div className="space-y-4 mb-6">
                    <AnimatePresence mode="wait">
                        {getFilteredMeals().length > 0 ? (
                            getFilteredMeals().map((meal, index) => (
                                <motion.div
                                    key={meal.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-surface rounded-2xl p-5 shadow-md"
                                >
                                    {/* Meal Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">
                                                {mealTypes.find(m => m.value === meal.type)?.emoji}
                                            </span>
                                            <div>
                                                <h3 className="font-bold text-lg text-text capitalize">
                                                    {meal.type}
                                                </h3>
                                                <p className="text-sm text-text-secondary">{meal.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-primary">
                                                {meal.items.reduce((sum, item) => sum + item.calories, 0)} cal
                                            </p>
                                            <p className="text-xs text-text-secondary">
                                                {meal.items.length} item{meal.items.length > 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Food Items */}
                                    <div className="space-y-2">
                                        {meal.items.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between p-3 bg-bg rounded-lg hover:bg-border/30 transition group"
                                            >
                                                <div className="flex-1">
                                                    <p className="font-medium text-text">{item.name}</p>
                                                    <p className="text-sm text-text-secondary">{item.quantity}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className="font-semibold text-text">{item.calories} cal</p>
                                                        <p className="text-xs text-text-secondary">
                                                            P: {item.protein}g • C: {item.carbs}g • F: {item.fats}g
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                                        <button className="p-2 hover:bg-primary/10 rounded-lg transition">
                                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button className="p-2 hover:bg-red-50 rounded-lg transition">
                                                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-surface rounded-2xl p-12 text-center"
                            >
                                <p className="text-6xl mb-4">🍽️</p>
                                <h3 className="text-xl font-bold text-text mb-2">No meals logged yet</h3>
                                <p className="text-text-secondary mb-6">Start tracking your {selectedMeal !== 'all' ? selectedMeal : 'meals'} to reach your goals!</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Floating Add Button */}
            <Link to="/nutrition/add">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-6 right-6 w-16 h-16 bg-linear-to-br from-primary to-accent text-white rounded-full shadow-2xl flex items-center justify-center z-50"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                </motion.button>
            </Link>
        </div>
    );
};

export default NutritionTab;
