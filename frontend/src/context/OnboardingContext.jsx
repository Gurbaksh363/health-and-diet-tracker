// OnboardingContext.jsx
import { createContext, useContext, useState } from "react";

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    goals: {
      weightGoal: "",
      activityLevel: "",
      calorieGoal: ""
    },
    medicalConditions: [],
    dietaryPreferences: {
      dietType: "",
      allergies: [],
      dislikes: []
    },
    waterIntakeGoal: "",
    sleepGoal: ""
  });

  const updateForm = (data) => {
    setForm((prev) => ({
      ...prev,
      ...data,
      goals: {
        ...prev.goals,
        ...(data.goals || {})
      },
      dietaryPreferences: {
        ...prev.dietaryPreferences,
        ...(data.dietaryPreferences || {})
      }
    }));
  };

  return (
    <OnboardingContext.Provider value={{ form, updateForm }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext);
