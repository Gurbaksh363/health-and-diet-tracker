import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Onboarding from "./pages/Onboarding"
import NutritionTab from "./pages/NutritionTab"
import AddFoodPage from "./pages/AddFoodPage"
import WorkoutsTab from "./pages/WorkoutsTab"
import AddWorkoutPage from "./pages/AddWorkoutPage"
import SettingsPage from "./pages/SettingsPage"
import ReportsPage from "./pages/ReportsPage"
import GoalsPage from "./pages/GoalsPage"
import DashboardPage from "./pages/DashboardPage"

function App() {
  return (
    <Router>
      <div className="min-h-dvh">
        <Routes>
          {/* Routes with Navbar */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
            </>
          } />
          
          {/* Auth routes without main navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Onboarding flow */}
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* Nutrition Tab with Navbar */}
          <Route path="/nutrition" element={
            <>
              <Navbar />
              <NutritionTab />
            </>
          } />
          <Route path="/nutrition/add" element={
            <>
              <Navbar />
              <AddFoodPage />
            </>
          } />
          
          {/* Workouts Tab with Navbar */}
          <Route path="/workouts" element={
            <>
              <Navbar />
              <WorkoutsTab />
            </>
          } />
          <Route path="/workouts/add" element={
            <>
              <Navbar />
              <AddWorkoutPage />
            </>
          } />
          
          {/* Settings & Reports */}
          <Route path="/settings" element={
            <>
              <Navbar />
              <SettingsPage />
            </>
          } />
          <Route path="/reports" element={
            <>
              <Navbar />
              <ReportsPage />
            </>
          } />
          
          {/* Goals & Dashboard */}
          <Route path="/goals" element={
            <>
              <Navbar />
              <GoalsPage />
            </>
          } />
          <Route path="/dashboard" element={
            <>
              <Navbar />
              <DashboardPage />
            </>
          } />
          
        </Routes>
      </div>
    </Router>
  )
}

export default App
