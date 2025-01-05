import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Scale, Droplet } from "lucide-react";

interface RecipeContentProps {
  ingredients: string[];
  instructions: string[];
  nutritionalInfo: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
  glycemicIndex?: number;
  glycemicLoad?: number;
  glucoseImpact?: string;
}

export function RecipeContent({
  ingredients,
  instructions,
  nutritionalInfo,
  glycemicIndex,
  glycemicLoad,
  glucoseImpact,
}: RecipeContentProps) {
  return (
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
                {ingredients.map((ingredient, index) => (
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
                {instructions.map((step, index) => (
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
                <p className="text-2xl font-bold">{nutritionalInfo.calories}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Carbs</p>
                <p className="text-2xl font-bold">{nutritionalInfo.carbs}g</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Protein</p>
                <p className="text-2xl font-bold">{nutritionalInfo.protein}g</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Fat</p>
                <p className="text-2xl font-bold">{nutritionalInfo.fat}g</p>
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
                  <p className="text-2xl font-bold">{glycemicIndex || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <Scale className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Glycemic Load</p>
                  <p className="text-2xl font-bold">{glycemicLoad || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <Droplet className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Blood Sugar Impact</p>
                  <p className="text-lg font-medium">{glucoseImpact || 'N/A'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}