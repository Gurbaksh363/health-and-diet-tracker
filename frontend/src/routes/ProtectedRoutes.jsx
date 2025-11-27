import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <p className="text-center">Loading...</p>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // onboarding check
  if (!user?.hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}
