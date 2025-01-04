import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat, Users, Star, Share2, Printer, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface RecipeDetailHeaderProps {
  recipe: any;
}

export function RecipeDetailHeader({ recipe }: RecipeDetailHeaderProps) {
  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/" className="text-sm font-medium">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/recipes" className="text-sm font-medium">Recipes</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{recipe.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span>4.5</span>
            <span className="text-gray-400">(24 ratings)</span>
          </div>
          {recipe.created_by && (
            <div>
              By <Link to={`/profile/${recipe.created_by}`} className="text-primary hover:underline">Chef Name</Link>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Prep: {recipe.preparation_time} mins</span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" />
            <span>Cook: {recipe.cooking_time} mins</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Serves: {recipe.servings}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary">Diabetic-friendly</Badge>
          <Badge variant="secondary">Low GI: {recipe.glycemic_index}</Badge>
          <Badge variant="secondary">Carbs: {recipe.carbs_per_serving}g per serving</Badge>
          {recipe.glucose_impact_level && (
            <Badge variant="secondary">Blood Sugar Impact: {recipe.glucose_impact_level}</Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <Button className="bg-[#D946EF] hover:bg-[#D946EF]/90">
            <Heart className="mr-2 h-4 w-4" /> Save Recipe
          </Button>
          <Button variant="outline" className="flex gap-2">
            <Printer className="h-4 w-4" /> Print
          </Button>
          <Button variant="outline" className="flex gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>
      </div>
    </div>
  );
}