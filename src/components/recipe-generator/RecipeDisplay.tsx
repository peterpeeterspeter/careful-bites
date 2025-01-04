import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
}

interface RecipeDisplayProps {
  recipe: Recipe;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{recipe.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{recipe.description}</p>
        
        <div>
          <h3 className="font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc pl-5 space-y-1">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Instructions</h3>
          <ol className="list-decimal pl-5 space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div>
            <p className="text-sm font-medium">Calories</p>
            <p className="text-2xl font-bold">{recipe.nutritionalInfo.calories}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Carbs</p>
            <p className="text-2xl font-bold">{recipe.nutritionalInfo.carbs}g</p>
          </div>
          <div>
            <p className="text-sm font-medium">Protein</p>
            <p className="text-2xl font-bold">{recipe.nutritionalInfo.protein}g</p>
          </div>
          <div>
            <p className="text-sm font-medium">Fat</p>
            <p className="text-2xl font-bold">{recipe.nutritionalInfo.fat}g</p>
          </div>
        </div>

        <div className="flex justify-between pt-4 text-sm text-muted-foreground">
          <p>Preparation: {recipe.preparationTime} mins</p>
          <p>Cooking: {recipe.cookingTime} mins</p>
          <p>Difficulty: {recipe.difficultyLevel}</p>
        </div>
      </CardContent>
    </Card>
  );
}