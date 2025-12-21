import BackButton from "@/components/BackButton";

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
        <BackButton />
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg">Is FitMind free to use?</h3>
          <p className="text-muted-foreground">
            Yes! FitMind offers a free plan with essential features. Premium
            features may be added in the future.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Do I need gym equipment?</h3>
          <p className="text-muted-foreground">
            No. Many workouts are bodyweight-based and can be done anywhere.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Is my data secure?</h3>
          <p className="text-muted-foreground">
            Absolutely. We take privacy seriously and never share your data.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Can beginners use FitMind?</h3>
          <p className="text-muted-foreground">
            Yes! FitMind is designed for all levels, from beginners to athletes.
          </p>
        </div>
      </div>
    </div>
  );
}
