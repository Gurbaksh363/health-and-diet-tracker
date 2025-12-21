import BackButton from "@/components/BackButton";

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
        <BackButton />
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-4">
        Your privacy matters to us. FitMind collects only the information needed
        to provide and improve our services.
      </p>
      <ul className="list-disc ml-6 space-y-3 text-muted-foreground">
        <li>We never sell your personal data.</li>
        <li>Your information is stored securely.</li>
        <li>You control your data and can delete it anytime.</li>
      </ul>
      <p className="text-muted-foreground mt-6">
        By using FitMind, you agree to this privacy policy.
      </p>
    </div>
  );
}
