import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Brain, Heart, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { user } = useAuth();
  const timeOfDay = new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening";

  const healthMetrics = [
    {
      title: "Average Blood Sugar",
      value: "120 mg/dL",
      icon: TrendingUp,
      description: "Last 7 days",
    },
    {
      title: "Activity Level",
      value: "Moderate",
      icon: Activity,
      description: "Based on weekly average",
    },
    {
      title: "Carb Intake",
      value: "45g",
      icon: Brain,
      description: "Daily average",
    },
    {
      title: "Heart Rate",
      value: "72 BPM",
      icon: Heart,
      description: "Resting average",
    },
  ];

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

  return (
    <div className="space-y-6 p-6">
      {/* Greeting Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Good {timeOfDay}{user ? `, ${user.email}` : ''}
        </h1>
        <p className="text-muted-foreground">
          Here's your health overview and personalized recommendations.
        </p>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {healthMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Recommended Recipes */}
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
    </div>
  );
}