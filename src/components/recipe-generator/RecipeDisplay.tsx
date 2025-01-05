import { Card } from "@/components/ui/card";
import { RecipeHeader } from "./recipe-display/RecipeHeader";
import { RecipeContent } from "./recipe-display/RecipeContent";

interface NutritionalInfo {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutritionalInfo: NutritionalInfo;
  preparationTime: number;
  cookingTime: number;
  difficultyLevel: string;
  glycemicIndex?: number;
  glycemicLoad?: number;
  glucoseImpact?: string;
  image_url?: string;
}

interface RecipeDisplayProps {
  recipe: Recipe;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <div className="space-y-6">
      <RecipeHeader {...recipe} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecipeContent {...recipe} />
        </div>
      </div>
    </div>
  );
}