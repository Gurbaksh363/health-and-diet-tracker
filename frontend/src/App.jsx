import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import NutritionTab from "./pages/NutritionTab";
import AddFoodPage from "./pages/AddFoodPage";
import WorkoutsTab from "./pages/WorkoutsTab";
import AddWorkoutPage from "./pages/AddWorkoutPage";
import SettingsPage from "./pages/SettingsPage";
import ReportsPage from "./pages/ReportsPage";
import GoalsPage from "./pages/GoalsPage";
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "./components/ui/sonner";
import VerifyEmail from "./pages/VerifyEmail";
import { AuthProvider } from "./context/AuthContext";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Component to handle scroll reset on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { user } = useAuth();

  return (
    <>
      <AuthProvider>
        <Toaster />
        <Router>
          <ScrollToTop />
          <div className="min-h-dvh">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Home />
                  </>
                }
              />

              {/* Auth guard: redirect if logged in */}
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/dashboard" />}
              />
              
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/reset-password" element={ <ResetPasswordPage />} />

              {/* EXAMPLE PROTECTED ROUTE */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Other routes */}
              <Route path="/nutrition" element={<><Navbar /><NutritionTab /></>} />
              <Route path="/nutrition/add" element={<><Navbar /><AddFoodPage /></>} />
              <Route path="/workouts" element={<><Navbar /><WorkoutsTab /></>} />
              <Route path="/workouts/add" element={<><Navbar /><AddWorkoutPage /></>} />
              <Route path="/settings" element={<><Navbar /><SettingsPage /></>} />
              <Route path="/reports" element={<><Navbar /><ReportsPage /></>} />
              <Route path="/goals" element={<><Navbar /><GoalsPage /></>} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
