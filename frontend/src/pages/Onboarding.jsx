import { useState } from "react";
import { useOnboarding } from "@/context/OnboardingContext";

import WelcomeScreen from "./onboarding/WelcomeScreen";
import AgeScreen from "./onboarding/AgeScreen";
import GenderScreen from "./onboarding/GenderScreen";
import HeightScreen from "./onboarding/HeightScreen";
import WeightScreen from "./onboarding/WeightScreen";
import TargetWeightScreen from "./onboarding/TargetWeightScreen";
import ActivityLevelScreen from "./onboarding/ActivityLevelScreen";
import MedicalConditionsScreen from "./onboarding/MedicalConditionsScreen";
import DietPreferencesScreen from "./onboarding/DietPreferencesScreen";
import DailyGoalsScreen from "./onboarding/DailyGoalsScreen";
import CompletionScreen from "./onboarding/CompletionScreen";

const Onboarding = () => {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);
  const skip = () => setStep((s) => s + 1);

  const screens = [
    <WelcomeScreen onNext={next} />,
    <AgeScreen onNext={next} onBack={back} />,
    <GenderScreen onNext={next} onBack={back} />,
    <HeightScreen onNext={next} onBack={back} />,
    <WeightScreen onNext={next} onBack={back} />,
    <TargetWeightScreen onNext={next} onBack={back} onSkip={skip} />,
    <ActivityLevelScreen onNext={next} onBack={back} />,
    <MedicalConditionsScreen onNext={next} onBack={back} onSkip={skip} />,
    <DietPreferencesScreen onNext={next} onBack={back} onSkip={skip} />,
    <DailyGoalsScreen onNext={next} onBack={back} />,
    <CompletionScreen /> 
  ];

  return <div>{screens[step]}</div>;
};

export default Onboarding;
