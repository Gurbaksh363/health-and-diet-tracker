import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <Spinner />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // return isAuthenticated ? children : <Navigate to="/login" />;

  // onboarding check
  if (!user?.hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}