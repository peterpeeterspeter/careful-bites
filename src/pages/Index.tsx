import { useAuth } from "@/contexts/AuthContext";
import { HealthMetrics } from "@/components/HealthMetrics";
import { RecommendedRecipes } from "@/components/RecommendedRecipes";

export default function Index() {
  const { user } = useAuth();
  const timeOfDay = new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening";

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

      {/* Health Metrics */}
      <HealthMetrics />

      {/* Recommended Recipes */}
      <RecommendedRecipes />
    </div>
  );
}