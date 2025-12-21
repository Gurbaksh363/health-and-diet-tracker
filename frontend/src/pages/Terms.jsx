import BackButton from "@/components/BackButton";

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
        <BackButton />
      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
      <p className="text-muted-foreground mb-4">
        By accessing and using FitMind, you agree to follow these terms.
      </p>
      <ul className="list-disc ml-6 space-y-3 text-muted-foreground">
        <li>Use FitMind responsibly and for personal use only.</li>
        <li>Do not misuse or attempt to harm the platform.</li>
        <li>Content is provided for guidance, not medical advice.</li>
      </ul>
      <p className="text-muted-foreground mt-6">
        We may update these terms from time to time to improve our service.
      </p>
    </div>
  );
}
