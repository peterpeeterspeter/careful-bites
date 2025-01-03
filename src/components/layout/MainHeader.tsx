import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MainHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="block text-center mb-6">
          <h1 className="text-4xl font-bold text-[#4CAF50]">CarefulCuisine</h1>
        </Link>
        
        <div className="flex justify-between items-center">
          <nav className="hidden md:flex gap-6">
            <Link to="/recipes" className="text-gray-700 hover:text-[#4CAF50]">Diabetic Recipes</Link>
            <Link to="/health" className="text-gray-700 hover:text-[#4CAF50]">Health Management</Link>
            <Link to="/what-to-buy" className="text-gray-700 hover:text-[#4CAF50]">Grocery Guide</Link>
            <Link to="/diet-plan" className="text-gray-700 hover:text-[#4CAF50]">Meal Planning</Link>
            <Link to="/subscribe" className="text-gray-700 hover:text-[#4CAF50]">Join Premium</Link>
          </nav>
          
          <div className="relative w-64">
            <Input
              type="search"
              placeholder="Search diabetes-friendly recipes..."
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
}