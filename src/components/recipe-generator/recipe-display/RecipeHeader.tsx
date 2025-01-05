import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, Users, Star, Share2, Printer, Heart } from "lucide-react";

interface RecipeHeaderProps {
  title: string;
  description: string;
  preparationTime: number;
  cookingTime: number;
  difficultyLevel: string;
  glycemicIndex?: number;
  glycemicLoad?: number;
  glucoseImpact?: string;
  nutritionalInfo: {
    carbs: number;
  };
  image_url?: string;
}

export function RecipeHeader({
  title,
  description,
  preparationTime,
  cookingTime,
  difficultyLevel,
  glycemicIndex,
  glycemicLoad,
  glucoseImpact,
  nutritionalInfo,
  image_url,
}: RecipeHeaderProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      
      {image_url && (
        <div className="mb-6 rounded-lg overflow-hidden">
          <img 
            src={image_url} 
            alt={title}
            className="w-full h-[400px] object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          <span>New Recipe</span>
        </div>
        <div>Generated Recipe</div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Prep: {preparationTime} mins</span>
        </div>
        <div className="flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-primary" />
          <span>Cook: {cookingTime} mins</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span>Difficulty: {difficultyLevel}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="secondary">Diabetic-friendly</Badge>
        {glycemicIndex && (
          <Badge variant="secondary">GI: {glycemicIndex}</Badge>
        )}
        <Badge variant="secondary">Carbs: {nutritionalInfo.carbs}g per serving</Badge>
        {glucoseImpact && (
          <Badge variant="secondary">Blood Sugar Impact: {glucoseImpact}</Badge>
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

      <div className="mb-8">
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}