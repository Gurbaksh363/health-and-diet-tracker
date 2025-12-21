import BackButton from "@/components/BackButton";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
        <BackButton />
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-muted-foreground mb-8">
        Have questions, feedback, or need support? We’d love to hear from you.
      </p>

      <div className="space-y-4 text-muted-foreground">
        <p>📧 Email: support@fitmind.app</p>
        <p>📍 Location: Anywhere in the world 🌍</p>
        <p>⏰ Support Hours: Mon – Fri, 9am – 5pm</p>
      </div>
    </div>
  );
}
