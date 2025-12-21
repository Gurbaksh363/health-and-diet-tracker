import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Plus, 
  Trash2,
  UtensilsCrossed,
  Coffee,
  Salad,
  Apple,
  Beef,
  Wheat,
  Droplet,
  Loader2,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import { foodApi } from '../api/foodApi';
import authApi from '../api/authApi';
import { toast } from 'sonner';

const NutritionTab = () => {
    const [selectedMeal, setSelectedMeal] = useState('all');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [userData, setUserData] = useState(null);
    const [todaysFoods, setTodaysFoods] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    // Fetch user profile and today's foods
    useEffect(() => {
        fetchData();
    }, [selectedDate]);

    const fetchData = async () => {
        try {
            setLoading(true);
            
            // Fetch user profile for targets
            const profileResponse = await authApi.getMe();
            const user = profileResponse.data.data;
            
            // Fetch today's foods
            const foodsResponse = await foodApi.getFoodByDate(selectedDate);
            const foods = foodsResponse.data.foods || [];
            
            setUserData(user);
            setTodaysFoods(foods);
        } catch (error) {
            console.error('Error fetching nutrition data:', error);
            toast.error('Failed to load nutrition data');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
        toast.success('Data refreshed!');
    };

    const handleDeleteFood = async (foodId) => {
        try {
            await foodApi.deleteFood(foodId);
            toast.success('Food item deleted');
            fetchData(); // Refresh the list
        } catch (error) {
            console.error('Error deleting food:', error);
            toast.error('Failed to delete food item');
        }
    };

    // Calculate totals and macros from actual food data
    const calculateNutrition = () => {
        const totals = todaysFoods.reduce((acc, food) => ({
            calories: acc.calories + ((food.calories * (food.quantity || 1)) / 100),
            protein: acc.protein + ((food.protein * (food.quantity || 1)) / 100),
            carbs: acc.carbs + ((food.carbs * (food.quantity || 1)) / 100),
            fats: acc.fats + ((food.fats * (food.quantity || 1)) / 100),
        }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

        // Calculate targets from user profile
        const calorieTarget = userData?.goals?.calorieGoal || 2000;
        const proteinTarget = Math.round(calorieTarget * 0.3 / 4); // 30% of calories, 4 cal/g
        const carbsTarget = Math.round(calorieTarget * 0.4 / 4); // 40% of calories, 4 cal/g
        const fatsTarget = Math.round(calorieTarget * 0.3 / 9); // 30% of calories, 9 cal/g

        return {
            consumed: totals,
            targets: {
                calories: calorieTarget,
                protein: proteinTarget,
                carbs: carbsTarget,
                fats: fatsTarget,
            }
        };
    };

    // Group foods by meal type
    const groupFoodsByMeal = () => {
        const grouped = {
            breakfast: [],
            lunch: [],
            dinner: [],
        };

        todaysFoods.forEach(food => {
            const mealType = food.mealType || 'snacks';
            if (grouped[mealType]) {
                grouped[mealType].push(food);
            }
        });

        return grouped;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg pb-20 pt-16 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-text-secondary">Loading nutrition data...</p>
                </div>
            </div>
        );
    }

    const nutrition = calculateNutrition();
    const mealGroups = groupFoodsByMeal();
    
    const calorieProgress = (nutrition.consumed.calories / nutrition.targets.calories) * 100;

    const getFilteredFoods = () => {
        if (selectedMeal === 'all') return todaysFoods;
        return mealGroups[selectedMeal] || [];
    };

    const getFormattedDate = () => {
        const date = new Date(selectedDate);
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-bg pb-20 pt-16">
            {/* Header */}
            <div className="bg-linear-to-r from-primary to-accent text-white px-4 pt-6 pb-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div className="animate-fade-in">
                            <h1 className="text-3xl font-bold mb-1">Nutrition Tracker</h1>
                            <p className="text-white/80">{getFormattedDate()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
                            >
                                <RefreshCw className={`w-6 h-6 ${refreshing ? 'animate-spin' : ''}`} />
                            </button>
                            <Link to="/settings">
                                <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all hover:scale-110 active:scale-95">
                                    <Settings className="w-6 h-6" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Daily Calorie Progress */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 animate-fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-white/80 text-sm mb-1">Calories Today</p>
                                <p className="text-4xl font-bold">
                                    {Math.round(nutrition.consumed.calories)}
                                    <span className="text-xl text-white/60"> / {nutrition.targets.calories}</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">
                                    {Math.max(0, nutrition.targets.calories - Math.round(nutrition.consumed.calories))}
                                </p>
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
                            {nutrition.consumed.protein}g
                        </p>
                        <div className="w-full bg-border rounded-full h-1.5 mb-1 overflow-hidden">
                            <div
                                className="bg-accent h-1.5 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${Math.min((nutrition.consumed.protein / nutrition.targets.protein) * 100, 100)}%` }}
                            />
                        </div>
                        <p className="text-xs text-text-secondary">of {nutrition.targets.protein}g</p>
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
                            {nutrition.consumed.carbs}g
                        </p>
                        <div className="w-full bg-border rounded-full h-1.5 mb-1 overflow-hidden">
                            <div
                                className="bg-primary h-1.5 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${Math.min((nutrition.consumed.carbs / nutrition.targets.carbs) * 100, 100)}%` }}
                            />
                        </div>
                        <p className="text-xs text-text-secondary">of {nutrition.targets.carbs}g</p>
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
                            {nutrition.consumed.fats}g
                        </p>
                        <div className="w-full bg-border rounded-full h-1.5 mb-1 overflow-hidden">
                            <div
                                className="bg-secondary h-1.5 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${Math.min((nutrition.consumed.fats / nutrition.targets.fats) * 100, 100)}%` }}
                            />
                        </div>
                        <p className="text-xs text-text-secondary">of {nutrition.targets.fats}g</p>
                    </div>
                </div>

                {/* Meal Type Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                        { value: 'all', label: 'All Meals', icon: UtensilsCrossed, color: '#4F46E5', count: todaysFoods.length },
                        { value: 'breakfast', label: 'Breakfast', icon: Coffee, color: '#F59E0B', count: mealGroups.breakfast.length },
                        { value: 'lunch', label: 'Lunch', icon: Salad, color: '#10B981', count: mealGroups.lunch.length },
                        { value: 'dinner', label: 'Dinner', icon: UtensilsCrossed, color: '#8B5CF6', count: mealGroups.dinner.length },
                    ].map((meal) => {
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
                    {getFilteredFoods().length > 0 ? (
                        Object.entries(groupFoodsByMeal(getFilteredFoods())).map(([mealType, foods], mealIndex) => {
                            if (foods.length === 0) return null;
                            
                            const mealInfo = [
                                { value: 'breakfast', label: 'Breakfast', icon: Coffee, color: '#F59E0B' },
                                { value: 'lunch', label: 'Lunch', icon: Salad, color: '#10B981' },
                                { value: 'dinner', label: 'Dinner', icon: UtensilsCrossed, color: '#8B5CF6' },
                                { value: 'snacks', label: 'Snacks', icon: Apple, color: '#EF4444' }
                            ].find(m => m.value === mealType);
                            
                            const MealIconComponent = mealInfo?.icon;
                            const mealTotal = foods.reduce((sum, food) => sum + food.calories, 0);
                            
                            return (
                                <div
                                    key={mealType}
                                    className="bg-surface rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in"
                                    style={{ animationDelay: `${mealIndex * 0.1}s` }}
                                >
                                    {/* Meal Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                                style={{ backgroundColor: `${mealInfo?.color}20` }}
                                            >
                                                {MealIconComponent && (
                                                    <MealIconComponent 
                                                        className="w-6 h-6" 
                                                        strokeWidth={2.5}
                                                        style={{ color: mealInfo.color }}
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-text capitalize">
                                                    {mealInfo?.label || mealType}
                                                </h3>
                                                <p className="text-sm text-text-secondary">
                                                    {foods[0]?.time || 'Not specified'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-primary">
                                                {mealTotal} cal
                                            </p>
                                            <p className="text-xs text-text-secondary">
                                                {foods.length} item{foods.length > 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Food Items */}
                                    <div className="space-y-2">
                                        {foods.map((food, idx) => (
                                            <div
                                                key={food._id || idx}
                                                className="flex items-center justify-between p-3 bg-bg rounded-lg hover:bg-border/30 transition-all duration-200 group"
                                            >
                                                <div className="flex-1">
                                                    <p className="font-medium text-text">{food.name}</p>
                                                    <p className="text-sm text-text-secondary">
                                                        {food.quantity} {food.unit || 'serving'}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className="font-semibold text-text">{food.calories} cal</p>
                                                        <p className="text-xs text-text-secondary">
                                                            P: {food.protein}g • C: {food.carbs}g • F: {food.fats}g
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        <button 
                                                            onClick={() => handleDeleteFood(food._id)}
                                                            className="p-2 hover:bg-red-50 rounded-lg transition-all hover:scale-110 active:scale-95"
                                                        >
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
                            <p className="text-text-secondary mb-6">
                                Start tracking your {selectedMeal !== 'all' ? selectedMeal : 'meals'} to reach your goals!
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Add Button */}
            <Link to="/nutrition/add">
                <button className="fixed bottom-6 right-6 w-16 h-16 bg-linear-to-br from-primary to-accent text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-90 transition-all duration-300 hover:shadow-3xl">
                    <Plus className="w-8 h-8" strokeWidth={2.5} />
                </button>
            </Link>
        </div>
    );
};

export default NutritionTab;
