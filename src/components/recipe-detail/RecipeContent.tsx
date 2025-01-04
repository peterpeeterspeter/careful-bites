import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

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
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>

      <Tabs defaultValue="ingredients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="method">Method</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="diabetes">Diabetes Info</TabsTrigger>
        </TabsList>

        <TabsContent value="ingredients" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                <ul className="list-none space-y-2">
                  {/* Replace with actual ingredients when available */}
                  <li>2 cups all-purpose flour</li>
                  <li>1 cup sugar substitute</li>
                  <li>2 eggs</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="method" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">Method</h3>
                <ol className="list-decimal list-inside space-y-4">
                  {recipe.instructions.split('\n').map((step: string, index: number) => (
                    <li key={index} className="pl-4">{step}</li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Calories</p>
                  <p className="text-2xl font-bold">{recipe.calories_per_serving}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Carbs</p>
                  <p className="text-2xl font-bold">{recipe.carbs_per_serving}g</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Protein</p>
                  <p className="text-2xl font-bold">{recipe.protein_per_serving}g</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fat</p>
                  <p className="text-2xl font-bold">{recipe.fat_per_serving}g</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diabetes" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Glycemic Impact</h4>
                  <p>Glycemic Index: {recipe.glycemic_index}</p>
                  <p>Glycemic Load: {recipe.glycemic_load}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Blood Sugar Management</h4>
                  <p>Impact Level: {recipe.glucose_impact_level}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}