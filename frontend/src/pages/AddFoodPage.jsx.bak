import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Sunrise, 
    Sun, 
    Moon, 
    Popcorn, 
    Search, 
    Edit3, 
    Camera, 
    ArrowLeft, 
    Plus, 
    CheckCircle,
    SearchX,
    Apple,
    ScanBarcode
} from 'lucide-react';

const AddFoodPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('search'); // search, manual, barcode
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedMealType, setSelectedMealType] = useState('breakfast');
    const [showCustomFood, setShowCustomFood] = useState(false);

    // Manual/Custom Food Form State
    const [customFood, setCustomFood] = useState({
        name: '',
        quantity: '',
        unit: 'g',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
    });

    // Barcode State
    const [barcodeInput, setBarcodeInput] = useState('');
    const [scanningBarcode, setScanningBarcode] = useState(false);

    const mealTypes = [
        { value: 'breakfast', label: 'Breakfast', icon: Sunrise, color: 'text-orange-500' },
        { value: 'lunch', label: 'Lunch', icon: Sun, color: 'text-yellow-500' },
        { value: 'dinner', label: 'Dinner', icon: Moon, color: 'text-indigo-500' },
        { value: 'snacks', label: 'Snacks', icon: Popcorn, color: 'text-amber-600' },
    ];

    const units = ['g', 'ml', 'oz', 'cup', 'tbsp', 'tsp', 'piece', 'slice', 'serving'];

    // Mock search function - replace with actual API call
    const handleSearch = async (query) => {
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);

        // Simulate API delay
        setTimeout(() => {
            // Mock results - replace with actual API data
            const mockResults = [
                {
                    id: 1,
                    name: 'Grilled Chicken Breast',
                    brand: 'Generic',
                    servingSize: '100g',
                    calories: 165,
                    protein: 31,
                    carbs: 0,
                    fats: 3.6,
                    verified: true,
                },
                {
                    id: 2,
                    name: 'Chicken Breast (Skinless)',
                    brand: 'USDA',
                    servingSize: '100g',
                    calories: 165,
                    protein: 31,
                    carbs: 0,
                    fats: 3.6,
                    verified: true,
                },
                {
                    id: 3,
                    name: 'Rotisserie Chicken Breast',
                    brand: 'Costco',
                    servingSize: '100g',
                    calories: 140,
                    protein: 28,
                    carbs: 1,
                    fats: 3,
                    verified: false,
                },
            ];

            setSearchResults(mockResults.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase())
            ));
            setIsSearching(false);
        }, 500);
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (searchQuery) {
                handleSearch(searchQuery);
            }
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchQuery]);

    const handleAddFood = (food) => {
        
        // Add to backend/state
        navigate('/nutrition');
    };

    const handleCustomFoodSubmit = (e) => {
        e.preventDefault();
        handleAddFood(customFood);
    };

    const handleBarcodeSearch = async (barcode) => {
        setScanningBarcode(true);
        // Simulate API call to OpenFoodFacts or FatSecret
        setTimeout(() => {
            // Mock barcode result
            const mockBarcodeFood = {
                name: 'Quest Protein Bar - Chocolate Chip',
                brand: 'Quest Nutrition',
                servingSize: '60g',
                calories: 200,
                protein: 20,
                carbs: 22,
                fats: 8,
                barcode: barcode,
            };
            setSearchResults([mockBarcodeFood]);
            setScanningBarcode(false);
            setActiveTab('search');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-bg pb-6 pt-16">
            {/* Header */}
            <div className="bg-linear-to-r from-primary to-accent text-white px-4 py-6 sticky top-16 z-10">
                <div className="max-w-2xl mx-auto flex items-center gap-4">
                    <button
                        onClick={() => navigate('/nutrition')}
                        className="p-2 hover:bg-white/20 rounded-full transition"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">Add Food</h1>
                        <p className="text-white/80 text-sm">Track your nutrition</p>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 mt-6">
                {/* Meal Type Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-text mb-3">Select Meal</label>
                    <div className="grid grid-cols-4 gap-2">
                        {mealTypes.map((meal) => {
                            const MealIcon = meal.icon;
                            return (
                                <button
                                    key={meal.value}
                                    onClick={() => setSelectedMealType(meal.value)}
                                    className={`p-3 rounded-xl text-center transition-all duration-200 active:scale-95 ${
                                        selectedMealType === meal.value
                                            ? 'bg-primary text-white shadow-md'
                                            : 'bg-surface text-text hover:bg-surface/80'
                                    }`}
                                >
                                    <MealIcon className={`w-6 h-6 mx-auto mb-1 ${selectedMealType === meal.value ? 'text-white' : meal.color}`} />
                                    <div className="text-xs font-medium">{meal.label}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-border">
                    <button
                        onClick={() => setActiveTab('search')}
                        className={`flex-1 pb-3 font-semibold transition-colors relative flex items-center justify-center gap-2 ${
                            activeTab === 'search' ? 'text-primary' : 'text-text-secondary'
                        }`}
                    >
                        <Search className="w-4 h-4" />
                        Search
                        {activeTab === 'search' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('manual')}
                        className={`flex-1 pb-3 font-semibold transition-colors relative flex items-center justify-center gap-2 ${
                            activeTab === 'manual' ? 'text-primary' : 'text-text-secondary'
                        }`}
                    >
                        <Edit3 className="w-4 h-4" />
                        Manual
                        {activeTab === 'manual' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('barcode')}
                        className={`flex-1 pb-3 font-semibold transition-colors relative flex items-center justify-center gap-2 ${
                            activeTab === 'barcode' ? 'text-primary' : 'text-text-secondary'
                        }`}
                    >
                        <Camera className="w-4 h-4" />
                        Barcode
                        {activeTab === 'barcode' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                </div>

                {/* Tab Content */}
                <div>
                    {/* Search Tab */}
                    {activeTab === 'search' && (
                        <div className="animate-fade-in">
                            {/* Search Bar */}
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search foods (e.g., chicken breast, oatmeal)"
                                    className="w-full px-4 py-3 pl-12 bg-surface border-2 border-border rounded-xl focus:border-primary focus:outline-none text-text"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                                {isSearching && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}
                            </div>

                            {/* Search Results */}
                            <div className="space-y-3">
                                {searchResults.length > 0 ? (
                                    <>
                                        {searchResults.map((food) => (
                                            <div
                                                key={food.id}
                                                className="bg-surface rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer animate-fade-in"
                                                onClick={() => handleAddFood(food)}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-semibold text-text">{food.name}</h3>
                                                            {food.verified && (
                                                                <CheckCircle className="w-4 h-4 text-accent fill-accent/20" />
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-text-secondary mb-2">
                                                            {food.brand} • {food.servingSize}
                                                        </p>
                                                        <div className="flex gap-3 text-xs">
                                                            <span className="font-semibold text-primary">{food.calories} cal</span>
                                                            <span className="text-text-secondary">P: {food.protein}g</span>
                                                            <span className="text-text-secondary">C: {food.carbs}g</span>
                                                            <span className="text-text-secondary">F: {food.fats}g</span>
                                                        </div>
                                                    </div>
                                                    <button className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition">
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Not Found - Add Custom */}
                                        <button
                                            onClick={() => setShowCustomFood(true)}
                                            className="w-full p-4 border-2 border-dashed border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors text-center animate-fade-in"
                                        >
                                            <p className="text-primary font-semibold">+ Can't find your food? Add custom</p>
                                        </button>
                                    </>
                                ) : searchQuery.length > 0 && !isSearching ? (
                                    <div className="text-center py-12">
                                        <SearchX className="w-16 h-16 mx-auto mb-3 text-gray-400" />
                                        <p className="text-text-secondary mb-4">No results found for "{searchQuery}"</p>
                                        <button
                                            onClick={() => setShowCustomFood(true)}
                                            className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition"
                                        >
                                            Add as Custom Food
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <Apple className="w-20 h-20 mx-auto mb-3 text-red-500" />
                                        <p className="text-text-secondary">Search for foods in our database</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Manual Entry Tab */}
                    {activeTab === 'manual' && (
                        <div className="animate-fade-in">
                            <form onSubmit={handleCustomFoodSubmit} className="space-y-4">
                                <div className="bg-surface rounded-xl p-6 space-y-4">
                                    {/* Food Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-text mb-2">
                                            Food Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={customFood.name}
                                            onChange={(e) => setCustomFood({ ...customFood, name: e.target.value })}
                                            placeholder="e.g., Homemade Pasta"
                                            className="w-full px-4 py-3 bg-bg border-2 border-border rounded-xl focus:border-primary focus:outline-none text-text"
                                            required
                                        />
                                    </div>

                                    {/* Quantity & Unit */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-semibold text-text mb-2">
                                                Quantity *
                                            </label>
                                            <input
                                                type="number"
                                                value={customFood.quantity}
                                                onChange={(e) => setCustomFood({ ...customFood, quantity: e.target.value })}
                                                placeholder="100"
                                                className="w-full px-4 py-3 bg-bg border-2 border-border rounded-xl focus:border-primary focus:outline-none text-text"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-text mb-2">
                                                Unit *
                                            </label>
                                            <select
                                                value={customFood.unit}
                                                onChange={(e) => setCustomFood({ ...customFood, unit: e.target.value })}
                                                className="w-full px-4 py-3 bg-bg border-2 border-border rounded-xl focus:border-primary focus:outline-none text-text"
                                            >
                                                {units.map(unit => (
                                                    <option key={unit} value={unit}>{unit}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Calories */}
                                    <div>
                                        <label className="block text-sm font-semibold text-text mb-2">
                                            Calories *
                                        </label>
                                        <input
                                            type="number"
                                            value={customFood.calories}
                                            onChange={(e) => setCustomFood({ ...customFood, calories: e.target.value })}
                                            placeholder="250"
                                            className="w-full px-4 py-3 bg-bg border-2 border-border rounded-xl focus:border-primary focus:outline-none text-text"
                                            required
                                        />
                                    </div>

                                    {/* Macros */}
                                    <div>
                                        <label className="block text-sm font-semibold text-text mb-2">
                                            Macronutrients (grams)
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-xs text-text-secondary mb-1">Protein</label>
                                                <input
                                                    type="number"
                                                    value={customFood.protein}
                                                    onChange={(e) => setCustomFood({ ...customFood, protein: e.target.value })}
                                                    placeholder="20"
                                                    className="w-full px-3 py-2 bg-bg border-2 border-border rounded-lg focus:border-accent focus:outline-none text-text text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-text-secondary mb-1">Carbs</label>
                                                <input
                                                    type="number"
                                                    value={customFood.carbs}
                                                    onChange={(e) => setCustomFood({ ...customFood, carbs: e.target.value })}
                                                    placeholder="30"
                                                    className="w-full px-3 py-2 bg-bg border-2 border-border rounded-lg focus:border-primary focus:outline-none text-text text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-text-secondary mb-1">Fats</label>
                                                <input
                                                    type="number"
                                                    value={customFood.fats}
                                                    onChange={(e) => setCustomFood({ ...customFood, fats: e.target.value })}
                                                    placeholder="10"
                                                    className="w-full px-3 py-2 bg-bg border-2 border-border rounded-lg focus:border-secondary focus:outline-none text-text text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-linear-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
                                >
                                    Add to {selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Barcode Tab */}
                    {activeTab === 'barcode' && (
                        <div className="animate-fade-in">
                            <div className="bg-surface rounded-xl p-8 text-center">
                                <div className="mb-6">
                                    <div className="w-32 h-32 mx-auto mb-4 bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                                        <ScanBarcode className="w-16 h-16 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-text mb-2">Scan Barcode</h3>
                                    <p className="text-text-secondary mb-6">
                                        Instantly add food by scanning product barcodes
                                    </p>
                                </div>

                                {/* Manual Barcode Input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-text mb-2 text-left">
                                        Or enter barcode manually
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={barcodeInput}
                                            onChange={(e) => setBarcodeInput(e.target.value)}
                                            placeholder="Enter barcode number"
                                            className="flex-1 px-4 py-3 bg-bg border-2 border-border rounded-xl focus:border-primary focus:outline-none text-text"
                                        />
                                        <button
                                            onClick={() => handleBarcodeSearch(barcodeInput)}
                                            disabled={!barcodeInput || scanningBarcode}
                                            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {scanningBarcode ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                'Search'
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border">
                                    <button
                                        className="w-full py-4 bg-linear-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2"
                                    >
                                        <Camera className="w-5 h-5" />
                                        Open Camera Scanner
                                    </button>
                                    <p className="text-xs text-text-secondary mt-3">
                                        Powered by OpenFoodFacts & FatSecret
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddFoodPage;
