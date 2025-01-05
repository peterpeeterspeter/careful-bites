import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import ProfileSetup from "@/pages/ProfileSetup";
import RecipeGenerator from "@/pages/RecipeGenerator";
import RecipeDetail from "@/pages/RecipeDetail";
import RecipeArchive from "@/pages/RecipeArchive";
import MealPlanning from "@/pages/MealPlanning";
import MealPlanningCalendar from "@/pages/MealPlanningCalendar";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/recipe-generator" element={<RecipeGenerator />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/recipes" element={<RecipeArchive />} />
          <Route path="/meal-planning" element={<MealPlanning />} />
          <Route path="/meal-planning-calendar" element={<MealPlanningCalendar />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;