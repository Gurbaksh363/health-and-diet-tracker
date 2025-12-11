import { useState } from "react";
import { Droplets, MoonStar, Footprints, Lightbulb } from "lucide-react";
import { useOnboarding } from "@/context/OnboardingContext";
import authApi from "@/api/authApi";

const DailyGoalsScreen = ({ onNext, onBack }) => {
  const { form, updateForm } = useOnboarding();
  const [waterIntake, setWaterIntake] = useState(form.waterIntakeGoal);
  const [sleepHours, setSleepHours] = useState(form.sleepGoal);

  const handleNext = async () => {
    if (!waterIntake || parseFloat(waterIntake) <= 0) {
      return alert("Please Enter a valid water intake goal.");
    }

    if (
      !sleepHours ||
      parseFloat(sleepHours) <= 4 ||
      parseFloat(sleepHours) > 14
    ) {
      return alert("Please enter valid sleep hours (4–14).");
    }

    updateForm({
      waterIntakeGoal: parseFloat(waterIntake),
      sleepGoal: parseInt(sleepHours),
    });

    // SUBMIT FINAL DATA TO BACKEND
    try {
      const finalForm = {
        ...form,
        waterIntakeGoal: parseFloat(waterIntake),
        sleepGoal: parseInt(sleepHours),
      };

      const res = await authApi.onboarding(finalForm);

      if (res.data.success) {
        onNext();
      }
    } catch (error) {
      console.log("ONBOARDING ERROR:", error);
      alert("Something went wrong while submitting onboarding.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-primary/5 via-bg to-accent/5 px-4 py-8">
      <div className="max-w-3xl w-full animate-slide-in-right">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-text-secondary mb-2">
            <span>Step 10 of 11</span>
            <span>91% complete</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: "91%" }}
            />
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-surface rounded-2xl p-8 shadow-lg">
          {/* Optional Badge */}
          <div className="flex justify-center mb-4">
            <span className="bg-secondary/20 text-secondary px-4 py-1 rounded-full text-sm font-semibold">
              Optional
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-text text-center mb-2">
            Set Your Daily Goals
          </h1>

          {/* Subtitle */}
          <p className="text-text-secondary text-center mb-8">
            Healthy lifestyle goals beyond just diet and exercise
          </p>

          {/* Water Intake Goal */}
          <div
            className="mb-6 animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center mb-3">
              <Droplets
                className="w-8 h-8 text-blue-500 mr-3"
                strokeWidth={2}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text">
                  Water Intake
                </h3>
                <p className="text-sm text-text-secondary">
                  Daily hydration goal
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                value={waterIntake}
                onChange={(e) => setWaterIntake(e.target.value)}
                className="flex-1 text-2xl font-bold text-center text-text bg-bg border-2 border-border rounded-xl p-4 focus:outline-none focus:border-primary transition"
                min="0"
                step="100"
              />
              <span className="text-xl font-semibold text-text-secondary">
                ml
              </span>
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {[1500, 2000, 2500, 3000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setWaterIntake(amount.toString())}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    waterIntake === amount.toString()
                      ? "bg-primary text-white"
                      : "bg-bg text-text-secondary hover:bg-surface"
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          {/* Sleep Goal */}
          <div
            className="mb-6 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center mb-3">
              <MoonStar
                className="w-8 h-8 text-indigo-500 mr-3"
                strokeWidth={2}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text">
                  Sleep Duration
                </h3>
                <p className="text-sm text-text-secondary">
                  Target sleep hours
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                className="flex-1 text-2xl font-bold text-center text-text bg-bg border-2 border-border rounded-xl p-4 focus:outline-none focus:border-primary transition"
                min="0"
                max="24"
                step="0.5"
              />
              <span className="text-xl font-semibold text-text-secondary">
                hours
              </span>
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {[6, 7, 8, 9].map((hours) => (
                <button
                  key={hours}
                  onClick={() => setSleepHours(hours.toString())}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    sleepHours === hours.toString()
                      ? "bg-primary text-white"
                      : "bg-bg text-text-secondary hover:bg-surface"
                  }`}
                >
                  {hours}h
                </button>
              ))}
            </div>
          </div>


          {/* Info Box */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-text-secondary flex items-start gap-2">
              <Lightbulb className="w-5 h-5 shrink-0 text-accent mt-0.5" />
              <span>
                <strong>Recommended:</strong> 8 hours of sleep, 2-3L of water,
                and 10,000 steps daily for optimal health.
              </span>
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 py-3 bg-bg border-2 border-border text-text rounded-lg font-semibold hover:bg-surface transition hover:scale-[1.02] active:scale-[0.98]"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!waterIntake || !sleepHours}
              className={`flex-2 py-3 rounded-lg font-semibold shadow-md transition ${
                waterIntake && sleepHours
                  ? "bg-primary text-white hover:shadow-lg hover:bg-primary/90 hover:scale-[1.02]"
                  : "bg-border text-text-secondary cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyGoalsScreen;
