import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
        { value: 'breakfast', label: 'Breakfast', emoji: '🌅' },
        { value: 'lunch', label: 'Lunch', emoji: '☀️' },
        { value: 'dinner', label: 'Dinner', emoji: '🌙' },
        { value: 'snacks', label: 'Snacks', emoji: '🍿' },
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
        console.log('Adding food:', food, 'to meal:', selectedMealType);
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
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
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
                        {mealTypes.map((meal) => (
                            <motion.button
                                key={meal.value}
                                onClick={() => setSelectedMealType(meal.value)}
                                whileTap={{ scale: 0.95 }}
                                className={`p-3 rounded-xl text-center transition ${
                                    selectedMealType === meal.value
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-surface text-text hover:bg-surface/80'
                                }`}
                            >
                                <div className="text-2xl mb-1">{meal.emoji}</div>
                                <div className="text-xs font-medium">{meal.label}</div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-border">
                    <button
                        onClick={() => setActiveTab('search')}
                        className={`flex-1 pb-3 font-semibold transition relative ${
                            activeTab === 'search' ? 'text-primary' : 'text-text-secondary'
                        }`}
                    >
                        🔍 Search
                        {activeTab === 'search' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('manual')}
                        className={`flex-1 pb-3 font-semibold transition relative ${
                            activeTab === 'manual' ? 'text-primary' : 'text-text-secondary'
                        }`}
                    >
                        ✏️ Manual
                        {activeTab === 'manual' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('barcode')}
                        className={`flex-1 pb-3 font-semibold transition relative ${
                            activeTab === 'barcode' ? 'text-primary' : 'text-text-secondary'
                        }`}
                    >
                        📷 Barcode
                        {activeTab === 'barcode' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            />
                        )}
                    </button>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {/* Search Tab */}
                    {activeTab === 'search' && (
                        <motion.div
                            key="search"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {/* Search Bar */}
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search foods (e.g., chicken breast, oatmeal)"
                                    className="w-full px-4 py-3 pl-12 bg-surface border-2 border-border rounded-xl focus:border-primary focus:outline-none text-text"
                                />
                                <svg
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
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
                                            <motion.div
                                                key={food.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="bg-surface rounded-xl p-4 hover:shadow-md transition cursor-pointer"
                                                onClick={() => handleAddFood(food)}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-semibold text-text">{food.name}</h3>
                                                            {food.verified && (
                                                                <span className="text-accent">
                                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                    </svg>
                                                                </span>
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
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}

                                        {/* Not Found - Add Custom */}
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            onClick={() => setShowCustomFood(true)}
                                            className="w-full p-4 border-2 border-dashed border-border rounded-xl hover:border-primary hover:bg-primary/5 transition text-center"
                                        >
                                            <p className="text-primary font-semibold">+ Can't find your food? Add custom</p>
                                        </motion.button>
                                    </>
                                ) : searchQuery.length > 0 && !isSearching ? (
                                    <div className="text-center py-12">
                                        <p className="text-4xl mb-3">🔍</p>
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
                                        <p className="text-6xl mb-3">🍎</p>
                                        <p className="text-text-secondary">Search for foods in our database</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Manual Entry Tab */}
                    {activeTab === 'manual' && (
                        <motion.div
                            key="manual"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
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
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-linear-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg"
                                >
                                    Add to {selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)}
                                </motion.button>
                            </form>
                        </motion.div>
                    )}

                    {/* Barcode Tab */}
                    {activeTab === 'barcode' && (
                        <motion.div
                            key="barcode"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="bg-surface rounded-xl p-8 text-center">
                                <div className="mb-6">
                                    <div className="w-32 h-32 mx-auto mb-4 bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                                        <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
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
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full py-4 bg-linear-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg"
                                    >
                                        📷 Open Camera Scanner
                                    </motion.button>
                                    <p className="text-xs text-text-secondary mt-3">
                                        Powered by OpenFoodFacts & FatSecret
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AddFoodPage;
