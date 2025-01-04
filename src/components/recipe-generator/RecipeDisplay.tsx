import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, Users, Star, Share2, Printer, Heart, Activity, Scale, Droplet } from "lucide-react";
import { Link } from "react-router-dom";

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
}

interface RecipeDisplayProps {
  recipe: Recipe;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span>New Recipe</span>
          </div>
          <div>
            Generated Recipe
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Prep: {recipe.preparationTime} mins</span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" />
            <span>Cook: {recipe.cookingTime} mins</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Difficulty: {recipe.difficultyLevel}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary">Diabetic-friendly</Badge>
          {recipe.glycemicIndex && (
            <Badge variant="secondary">GI: {recipe.glycemicIndex}</Badge>
          )}
          <Badge variant="secondary">Carbs: {recipe.nutritionalInfo.carbs}g per serving</Badge>
          {recipe.glucoseImpact && (
            <Badge variant="secondary">Blood Sugar Impact: {recipe.glucoseImpact}</Badge>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <p className="text-gray-600">{recipe.description}</p>
          </div>

          <Tabs defaultValue="ingredients" className="space-y-4">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="method">Method</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="diabetes">Diabetes Info</TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                    <ul className="list-none space-y-3">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-baseline">
                          <span className="text-primary hover:underline cursor-pointer">
                            {ingredient}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="method">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-4">Method</h3>
                    <ol className="list-decimal list-inside space-y-6">
                      {recipe.instructions.map((step, index) => (
                        <li key={index} className="pl-4 leading-relaxed">
                          <span className="font-medium text-lg mr-4">{index + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nutrition">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Nutrition Per Serving</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">Calories</p>
                      <p className="text-2xl font-bold">{recipe.nutritionalInfo.calories}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">Carbs</p>
                      <p className="text-2xl font-bold">{recipe.nutritionalInfo.carbs}g</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">Protein</p>
                      <p className="text-2xl font-bold">{recipe.nutritionalInfo.protein}g</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">Fat</p>
                      <p className="text-2xl font-bold">{recipe.nutritionalInfo.fat}g</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="diabetes">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-6">Diabetes Information</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <Activity className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">Glycemic Index</p>
                        <p className="text-2xl font-bold">{recipe.glycemicIndex || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <Scale className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">Glycemic Load</p>
                        <p className="text-2xl font-bold">{recipe.glycemicLoad || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <Droplet className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">Blood Sugar Impact</p>
                        <p className="text-lg font-medium">{recipe.glucoseImpact || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}