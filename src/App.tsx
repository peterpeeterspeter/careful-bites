import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { MainLayout } from "@/components/MainLayout";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import ProfileSetup from "@/pages/ProfileSetup";
import RecipeGenerator from "@/pages/RecipeGenerator";
import MealPlanning from "@/pages/MealPlanning";
import MealPlanningCalendar from "@/pages/MealPlanningCalendar";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile-setup"
                element={
                  <ProtectedRoute>
                    <ProfileSetup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recipe-generator"
                element={
                  <ProtectedRoute>
                    <RecipeGenerator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/meal-planning"
                element={
                  <ProtectedRoute>
                    <MealPlanning />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/meal-planning-calendar"
                element={
                  <ProtectedRoute>
                    <MealPlanningCalendar />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </MainLayout>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
