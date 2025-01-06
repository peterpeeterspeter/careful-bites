import { useParams } from "react-router-dom";
import { MainHeader } from "@/components/layout/MainHeader";
import { RecipeDetailHeader } from "@/components/recipe-detail/RecipeDetailHeader";
import { RecipeContent } from "@/components/recipe-detail/RecipeContent";
import { RecipeAlternatives } from "@/components/recipe-detail/RecipeAlternatives";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";

export function RecipeDetail() {
  const { id } = useParams();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error("Recipe not found");
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <RecipeDetailSkeleton />;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <main className="container mx-auto px-4 py-8">
        <RecipeDetailHeader recipe={recipe} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RecipeContent recipe={recipe} />
          <RecipeAlternatives currentRecipeId={recipe.id} />
        </div>
      </main>
    </div>
  );
}

function RecipeDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </main>
    </div>
  );
}