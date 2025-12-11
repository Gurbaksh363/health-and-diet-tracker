import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

export default function OnboardingRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <Spinner />

    if (user?.hasCompletedOnboarding) {
        return <Navigate to="/dashboard" replace />
    }

    return children;
}