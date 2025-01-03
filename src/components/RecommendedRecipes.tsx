import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recommendedRecipes = [
  {
    title: "Low-Carb Breakfast Bowl",
    description: "Perfect for stable morning glucose levels",
    nutritionalInfo: "Carbs: 15g | Protein: 20g | Fat: 15g",
  },
  {
    title: "Diabetic-Friendly Lunch Wrap",
    description: "High protein, moderate carbs",
    nutritionalInfo: "Carbs: 30g | Protein: 25g | Fat: 12g",
  },
  {
    title: "Balanced Dinner Plate",
    description: "Rich in fiber and nutrients",
    nutritionalInfo: "Carbs: 35g | Protein: 28g | Fat: 18g",
  },
];

export function RecommendedRecipes() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">
        Today's Recommended Recipes
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recommendedRecipes.map((recipe) => (
          <Card key={recipe.title} className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg">{recipe.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {recipe.description}
              </p>
              <p className="text-xs font-medium">
                {recipe.nutritionalInfo}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}