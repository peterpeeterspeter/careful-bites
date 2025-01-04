import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Droplet, Scale } from "lucide-react";

interface RecipeContentProps {
  recipe: any;
}

export function RecipeContent({ recipe }: RecipeContentProps) {
  return (
    <div className="lg:col-span-2">
      <div className="mb-8">
        <img
          src={recipe.image_url || "/placeholder.svg"}
          alt={recipe.title}
          className="w-full h-[400px] object-cover rounded-lg shadow-md"
        />
        <p className="mt-4 text-gray-600">{recipe.description}</p>
      </div>

      <Tabs defaultValue="ingredients" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="method">Method</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="diabetes">Diabetes Info</TabsTrigger>
        </TabsList>

        <TabsContent value="ingredients" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                <ul className="list-none space-y-3">
                  {/* Replace with actual ingredients when available */}
                  <li className="flex items-baseline">
                    <span className="font-medium w-24">2 cups</span>
                    <span className="text-primary hover:underline cursor-pointer">all-purpose flour</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="font-medium w-24">1 cup</span>
                    <span className="text-primary hover:underline cursor-pointer">sugar substitute</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="font-medium w-24">2</span>
                    <span className="text-primary hover:underline cursor-pointer">eggs</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="method" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Method</h3>
                <ol className="list-decimal list-inside space-y-6">
                  {recipe.instructions.split('\n').map((step: string, index: number) => (
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

        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Nutrition Per Serving</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Calories</p>
                  <p className="text-2xl font-bold">{recipe.calories_per_serving}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Carbs</p>
                  <p className="text-2xl font-bold">{recipe.carbs_per_serving}g</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Protein</p>
                  <p className="text-2xl font-bold">{recipe.protein_per_serving}g</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Fat</p>
                  <p className="text-2xl font-bold">{recipe.fat_per_serving}g</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diabetes" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-6">Diabetes Information</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <Activity className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">Glycemic Index</p>
                    <p className="text-2xl font-bold">{recipe.glycemic_index}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <Scale className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">Glycemic Load</p>
                    <p className="text-2xl font-bold">{recipe.glycemic_load}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <Droplet className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">Blood Sugar Impact</p>
                    <p className="text-lg font-medium">{recipe.glucose_impact_level}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}