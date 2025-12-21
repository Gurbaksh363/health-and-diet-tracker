import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  );
}
