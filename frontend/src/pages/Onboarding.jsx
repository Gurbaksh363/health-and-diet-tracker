import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './onboarding/WelcomeScreen';
import AgeScreen from './onboarding/AgeScreen';
import GenderScreen from './onboarding/GenderScreen';
import HeightScreen from './onboarding/HeightScreen';
import WeightScreen from './onboarding/WeightScreen';
import TargetWeightScreen from './onboarding/TargetWeightScreen';
import ActivityLevelScreen from './onboarding/ActivityLevelScreen';
import MedicalConditionsScreen from './onboarding/MedicalConditionsScreen';
import DietPreferencesScreen from './onboarding/DietPreferencesScreen';
import DailyGoalsScreen from './onboarding/DailyGoalsScreen';
import CompletionScreen from './onboarding/CompletionScreen';

const Onboarding = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [userData, setUserData] = useState({
        // Personal details (from schema)
        age: '',
        gender: '',
        height: '',
        weight: '',
        
        // Health preferences (from schema)
        targetWeight: '',
        bmi: 0,
        bmr: 0,
        medicalConditions: [],
        
        // Dietary preferences (from schema)
        dietaryPreferences: {
            dietType: '',
            allergies: [],
            dislikes: []
        },
        
        // Lifestyle and daily goals (from schema)
        waterIntakeGoal: 2000,
        sleepGoal: 8,
        stepsGoal: 10000,
        
        // Fitness and activity goals (from schema - nested under goals)
        goals: {
            weightGoal: '',
            activityLevel: '',
            calorieGoal: 2000
        },
        
        // UI helper fields (not in schema, only for UI)
        heightUnit: 'cm',
        weightUnit: 'kg',
    });

    const handleNext = (data = {}) => {
        setUserData((prev) => {
            const newData = { ...prev };
            
            // Handle nested objects properly
            if (data.goals) {
                newData.goals = { ...prev.goals, ...data.goals };
            }
            if (data.dietaryPreferences) {
                newData.dietaryPreferences = { ...prev.dietaryPreferences, ...data.dietaryPreferences };
            }
            
            // Calculate BMI if height and weight are present
            if (data.weight || data.height) {
                const height = data.height || prev.height;
                const weight = data.weight || prev.weight;
                if (height && weight) {
                    // BMI = weight (kg) / (height (m))^2
                    const heightInMeters = height / 100;
                    newData.bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));
                }
            }
            
            // Calculate BMR if age, gender, height, and weight are present
            if (data.age || data.gender || data.height || data.weight) {
                const age = data.age || prev.age;
                const gender = data.gender || prev.gender;
                const height = data.height || prev.height;
                const weight = data.weight || prev.weight;
                
                if (age && gender && height && weight) {
                    // Mifflin-St Jeor Equation
                    // Men: BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age + 5
                    // Women: BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age - 161
                    let bmr = 10 * weight + 6.25 * height - 5 * age;
                    if (gender === 'male') {
                        bmr += 5;
                    } else if (gender === 'female') {
                        bmr -= 161;
                    }
                    newData.bmr = Math.round(bmr);
                }
            }
            
            // Set weightGoal to targetWeight if targetWeight is provided
            if (data.targetWeight) {
                newData.goals = { ...newData.goals, weightGoal: data.targetWeight };
            }
            
            // Merge remaining fields
            return { ...newData, ...data };
        });
        setCurrentStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleSkip = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const screens = [
        <WelcomeScreen key="welcome" onNext={() => handleNext()} />,
        <AgeScreen
            key="age"
            onNext={handleNext}
            onBack={handleBack}
            initialValue={userData.age}
        />,
        <GenderScreen
            key="gender"
            onNext={handleNext}
            onBack={handleBack}
            initialValue={userData.gender}
        />,
        <HeightScreen
            key="height"
            onNext={handleNext}
            onBack={handleBack}
            initialValue={{ value: userData.height, unit: userData.heightUnit }}
        />,
        <WeightScreen
            key="weight"
            onNext={handleNext}
            onBack={handleBack}
            initialValue={{ value: userData.weight, unit: userData.weightUnit }}
        />,
        <TargetWeightScreen
            key="targetWeight"
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            initialValue={{ value: userData.targetWeight, unit: userData.weightUnit }}
            currentWeight={userData.weight}
        />,
        <ActivityLevelScreen
            key="activity"
            onNext={handleNext}
            onBack={handleBack}
            initialValue={userData.goals.activityLevel}
        />,
        <MedicalConditionsScreen
            key="medical"
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            initialValue={userData.medicalConditions}
        />,
        <DietPreferencesScreen
            key="diet"
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            initialValue={userData.dietaryPreferences}
        />,
        <DailyGoalsScreen
            key="dailyGoals"
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            initialValue={userData}
        />,
        <CompletionScreen key="complete" userData={userData} />,
    ];

    return (
        <div className="onboarding-container">
            <AnimatePresence mode="wait">
                {screens[currentStep]}
            </AnimatePresence>
        </div>
    );
};

export default Onboarding;
