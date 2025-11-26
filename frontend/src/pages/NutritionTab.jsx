import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Plus, 
  Edit2, 
  Trash2,
  UtensilsCrossed,
  Sunrise,
  Sun,
  Moon,
  Cookie,
  Beef,
  Wheat,
  Droplet
} from 'lucide-react';

const NutritionTab = () => {
    const [selectedMeal, setSelectedMeal] = useState('all');

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
        { value: 'all', label: 'All Meals', icon: UtensilsCrossed, color: '#073B4C', count: 9 },
        { value: 'breakfast', label: 'Breakfast', icon: Sunrise, color: '#FFD166', count: 3 },
        { value: 'lunch', label: 'Lunch', icon: Sun, color: '#06D6A0', count: 3 },
        { value: 'dinner', label: 'Dinner', icon: Moon, color: '#118AB2', count: 0 },
        { value: 'snacks', label: 'Snacks', icon: Cookie, color: '#EF476F', count: 1 },
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
                        <div className="animate-fade-in">
                            <h1 className="text-3xl font-bold mb-1">Nutrition Tracker</h1>
                            <p className="text-white/80">Thursday, Nov 21, 2025</p>
                        </div>
                        <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all hover:scale-110 active:scale-95">
                            <Settings className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Daily Calorie Progress */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 animate-fade-in">
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
                            <div
                                className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                                    calorieProgress > 100 ? 'bg-red-400' : 'bg-white'
                                }`}
                                style={{ width: `${Math.min(calorieProgress, 100)}%` }}
                            />
                        </div>
                        <p className="text-white/60 text-xs mt-2 text-right">
                            {calorieProgress.toFixed(0)}% of daily goal
                        </p>
                    </div>
                </div>
            </div>

            {/* Macros Cards */}
            <div className="max-w-6xl mx-auto px-4 -mt-6">
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {/* Protein */}
                    <div className="bg-surface rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                <Beef className="w-5 h-5 text-accent" strokeWidth={2.5} />
                            </div>
                            <span className="text-xs font-semibold text-accent">Protein</span>
                        </div>
                        <p className="text-2xl font-bold text-text mb-1">
                            {userData.consumedProtein}g
                        </p>
                        <div className="w-full bg-border rounded-full h-1.5 mb-1 overflow-hidden">
                            <div
                                className="bg-accent h-1.5 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${Math.min(proteinProgress, 100)}%` }}
                            />
                        </div>
                        <p className="text-xs text-text-secondary">of {userData.targetProtein}g</p>
                    </div>

                    {/* Carbs */}
                    <div className="bg-surface rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Wheat className="w-5 h-5 text-primary" strokeWidth={2.5} />
                            </div>
                            <span className="text-xs font-semibold text-primary">Carbs</span>
                        </div>
                        <p className="text-2xl font-bold text-text mb-1">
                            {userData.consumedCarbs}g
                        </p>
                        <div className="w-full bg-border rounded-full h-1.5 mb-1 overflow-hidden">
                            <div
                                className="bg-primary h-1.5 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${Math.min(carbsProgress, 100)}%` }}
                            />
                        </div>
                        <p className="text-xs text-text-secondary">of {userData.targetCarbs}g</p>
                    </div>

                    {/* Fats */}
                    <div className="bg-surface rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                                <Droplet className="w-5 h-5 text-secondary" strokeWidth={2.5} />
                            </div>
                            <span className="text-xs font-semibold text-secondary">Fats</span>
                        </div>
                        <p className="text-2xl font-bold text-text mb-1">
                            {userData.consumedFats}g
                        </p>
                        <div className="w-full bg-border rounded-full h-1.5 mb-1 overflow-hidden">
                            <div
                                className="bg-secondary h-1.5 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${Math.min(fatsProgress, 100)}%` }}
                            />
                        </div>
                        <p className="text-xs text-text-secondary">of {userData.targetFats}g</p>
                    </div>
                </div>

                {/* Meal Type Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {mealTypes.map((meal) => {
                        const IconComponent = meal.icon;
                        return (
                            <button
                                key={meal.value}
                                onClick={() => setSelectedMeal(meal.value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95 ${
                                    selectedMeal === meal.value
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-surface text-text hover:bg-surface/80'
                                }`}
                            >
                                <IconComponent 
                                    className="w-5 h-5" 
                                    strokeWidth={2.5}
                                    style={{ color: selectedMeal === meal.value ? 'white' : meal.color }}
                                />
                                <span>{meal.label}</span>
                                {meal.count > 0 && (
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        selectedMeal === meal.value ? 'bg-white/20' : 'bg-primary/10 text-primary'
                                    }`}>
                                        {meal.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Meals List */}
                <div className="space-y-4 mb-6">
                    {getFilteredMeals().length > 0 ? (
                        getFilteredMeals().map((meal, index) => {
                            const mealIcon = mealTypes.find(m => m.value === meal.type);
                            const MealIconComponent = mealIcon?.icon;
                            
                            return (
                                <div
                                    key={meal.id}
                                    className="bg-surface rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Meal Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                                style={{ backgroundColor: `${mealIcon?.color}20` }}
                                            >
                                                {MealIconComponent && (
                                                    <MealIconComponent 
                                                        className="w-6 h-6" 
                                                        strokeWidth={2.5}
                                                        style={{ color: mealIcon.color }}
                                                    />
                                                )}
                                            </div>
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
                                                className="flex items-center justify-between p-3 bg-bg rounded-lg hover:bg-border/30 transition-all duration-200 group"
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
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        <button className="p-2 hover:bg-primary/10 rounded-lg transition-all hover:scale-110 active:scale-95">
                                                            <Edit2 className="w-4 h-4 text-primary" />
                                                        </button>
                                                        <button className="p-2 hover:bg-red-50 rounded-lg transition-all hover:scale-110 active:scale-95">
                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="bg-surface rounded-2xl p-12 text-center animate-fade-in">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                <UtensilsCrossed className="w-10 h-10 text-primary" strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-text mb-2">No meals logged yet</h3>
                            <p className="text-text-secondary mb-6">Start tracking your {selectedMeal !== 'all' ? selectedMeal : 'meals'} to reach your goals!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Add Button */}
            <Link to="/nutrition/add">
                <button className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary to-accent text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-90 transition-all duration-300 hover:shadow-3xl">
                    <Plus className="w-8 h-8" strokeWidth={2.5} />
                </button>
            </Link>
        </div>
    );
};

export default NutritionTab;
