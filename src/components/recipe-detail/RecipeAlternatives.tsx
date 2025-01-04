import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface RecipeAlternativesProps {
  currentRecipeId: string;
}

export function RecipeAlternatives({ currentRecipeId }: RecipeAlternativesProps) {
  const { data: alternatives } = useQuery({
    queryKey: ["recipe-alternatives", currentRecipeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .neq("id", currentRecipeId)
        .limit(4);

      if (error) throw error;
      return data;
    },
  });

  if (!alternatives?.length) return null;

  return (
    <div className="lg:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle>Similar Recipes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alternatives.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipes/${recipe.id}`}
                className="block group"
              >
                <div className="flex gap-4">
                  <img
                    src={recipe.image_url || "/placeholder.svg"}
                    alt={recipe.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium group-hover:text-primary">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.5</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}