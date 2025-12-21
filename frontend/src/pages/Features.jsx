import BackButton from "@/components/BackButton";

export default function Features() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
        <BackButton />
      <h1 className="text-4xl font-bold mb-6">Features</h1>
      <p className="text-muted-foreground mb-8">
        FitMind helps you build a healthier body and a stronger mind with smart,
        easy-to-use tools designed for everyday life.
      </p>

      <ul className="space-y-6">
        <li>
          <h3 className="text-xl font-semibold">🏃 Personalized Fitness Plans</h3>
          <p className="text-muted-foreground">
            Workouts tailored to your goals, fitness level, and schedule.
          </p>
        </li>
        <li>
          <h3 className="text-xl font-semibold">🧘 Mindfulness & Meditation</h3>
          <p className="text-muted-foreground">
            Guided sessions to reduce stress and improve focus.
          </p>
        </li>
        <li>
          <h3 className="text-xl font-semibold">📊 Progress Tracking</h3>
          <p className="text-muted-foreground">
            Track workouts, habits, and mental wellness in one place.
          </p>
        </li>
        <li>
          <h3 className="text-xl font-semibold">🔔 Smart Reminders</h3>
          <p className="text-muted-foreground">
            Stay consistent with gentle reminders and streaks.
          </p>
        </li>
      </ul>
    </div>
  );
}
