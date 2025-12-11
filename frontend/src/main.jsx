import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <OnboardingProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </OnboardingProvider>
  </StrictMode>
);
