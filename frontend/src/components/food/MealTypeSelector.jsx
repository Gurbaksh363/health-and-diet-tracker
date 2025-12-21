import { IconSunrise, IconSun, IconMoon, IconCookie } from '@tabler/icons-react';
import { Card, CardContent } from '../ui/card';

const MealTypeSelector = ({ selectedMealType, onMealTypeChange }) => {
    const mealTypes = [
        { value: 'breakfast', icon: IconSunrise, label: 'Breakfast', color: 'from-orange-500 to-yellow-500' },
        { value: 'lunch', icon: IconSun, label: 'Lunch', color: 'from-blue-500 to-cyan-500' },
        { value: 'dinner', icon: IconMoon, label: 'Dinner', color: 'from-purple-500 to-pink-500' },

    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {mealTypes.map(({ value, icon: Icon, label, color }) => (
                <Card
                    key={value}
                    onClick={() => onMealTypeChange(value)}
                    className={`cursor-pointer transition-all duration-300 ${
                        selectedMealType === value
                            ? 'ring-2 ring-primary shadow-lg scale-105'
                            : 'hover:shadow-md hover:scale-102'
                    }`}
                >
                    <CardContent className="p-4 text-center">
                        <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-linear-to-br ${color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" stroke={2} />
                        </div>
                        <p className={`font-semibold text-sm ${
                            selectedMealType === value ? 'text-primary' : 'text-foreground'
                        }`}>
                            {label}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default MealTypeSelector;
