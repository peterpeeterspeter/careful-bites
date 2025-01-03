import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import MainLayout from "@/components/MainLayout";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ProfileSetup from "@/pages/ProfileSetup";
import Profile from "@/pages/Profile";
import MealPlanning from "@/pages/MealPlanning";
import RecipeGenerator from "@/pages/RecipeGenerator";

export default function App() {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/meal-planning" element={<MealPlanning />} />
          <Route path="/recipe-generator" element={<RecipeGenerator />} />
        </Routes>
      </MainLayout>
      <Toaster />
    </>
  );
}