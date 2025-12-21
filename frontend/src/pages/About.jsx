import BackButton from "@/components/BackButton";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
        <BackButton />
      <h1 className="text-4xl font-bold mb-6">About FitMind</h1>
      <p className="text-muted-foreground mb-4">
        FitMind was created with one mission: to make healthy living simple,
        accessible, and sustainable for everyone.
      </p>
      <p className="text-muted-foreground mb-4">
        We believe true wellness comes from balancing physical fitness with
        mental well-being. Our platform combines smart fitness tools with
        mindfulness practices to help you feel your best every day.
      </p>
      <p className="text-muted-foreground">
        Whether you're just starting out or leveling up your routine, FitMind is
        here to guide and motivate you.
      </p>
    </div>
  );
}
