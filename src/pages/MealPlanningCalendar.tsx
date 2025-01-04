import { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecipeDisplay } from "@/components/recipe-generator/RecipeDisplay";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

// Helper function to transform Supabase recipe to RecipeDisplay format
const transformRecipe = (dbRecipe: any) => {
  return {
    title: dbRecipe.title,
    description: dbRecipe.description || "",
    ingredients: [], // You'll need to fetch these from a separate table if needed
    instructions: dbRecipe.instructions.split('\n').filter((i: string) => i.trim()),
    nutritionalInfo: {
      calories: dbRecipe.calories_per_serving,
      carbs: dbRecipe.carbs_per_serving,
      protein: dbRecipe.protein_per_serving,
      fat: dbRecipe.fat_per_serving
    },
    preparationTime: dbRecipe.preparation_time || 0,
    cookingTime: dbRecipe.cooking_time || 0,
    difficultyLevel: "medium", // You might want to add this to your database schema
    servings: dbRecipe.servings || 4
  };
};

export default function MealPlanningCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<string>("");
  const [selectedMealType, setSelectedMealType] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: mealPlans, isLoading: isMealPlansLoading } = useQuery({
    queryKey: ['mealPlans', selectedDate],
    queryFn: async () => {
      if (!selectedDate) return null;
      
      const startDate = startOfWeek(selectedDate);
      const endDate = addDays(startDate, 6);
      
      const { data, error } = await supabase
        .from('meal_plan_recipes')
        .select(`
          *,
          recipes:recipe_id (*)
        `)
        .gte('planned_date', format(startDate, 'yyyy-MM-dd'))
        .lte('planned_date', format(endDate, 'yyyy-MM-dd'));

      if (error) throw error;
      return data;
    },
  });

  const { data: recipes, isLoading: isRecipesLoading } = useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('is_approved', true);
      
      if (error) throw error;
      return data;
    },
  });

  const { data: userMealPlan } = useQuery({
    queryKey: ['userMealPlan', selectedDate],
    queryFn: async () => {
      if (!selectedDate) return null;
      
      const { data: existingPlan, error } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('profile_id', (await supabase.auth.getUser()).data.user?.id)
        .lte('start_date', format(selectedDate, 'yyyy-MM-dd'))
        .gte('end_date', format(selectedDate, 'yyyy-MM-dd'))
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return existingPlan;
    },
  });

  const addMealMutation = useMutation({
    mutationFn: async () => {
      if (!selectedDate || !selectedRecipe || !selectedMealType || !userMealPlan) {
        throw new Error('Missing required fields');
      }

      const { error } = await supabase
        .from('meal_plan_recipes')
        .insert({
          meal_plan_id: userMealPlan.id,
          recipe_id: selectedRecipe,
          planned_date: format(selectedDate, 'yyyy-MM-dd'),
          meal_type: selectedMealType,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mealPlans'] });
      toast({
        title: "Success",
        description: "Meal added to your plan",
      });
      setIsAddMealOpen(false);
      setSelectedRecipe("");
      setSelectedMealType("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add meal to plan",
        variant: "destructive",
      });
      console.error('Error adding meal:', error);
    },
  });

  const handleAddMeal = () => {
    addMealMutation.mutate();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Weekly Meal Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>
              Meals for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Selected Date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isMealPlansLoading ? (
              <p>Loading meals...</p>
            ) : mealPlans && mealPlans.length > 0 ? (
              <div className="space-y-4">
                {mealPlans
                  .filter(plan => format(new Date(plan.planned_date), 'yyyy-MM-dd') === 
                           format(selectedDate!, 'yyyy-MM-dd'))
                  .map((plan) => (
                    <div key={plan.id} className="border-b pb-4">
                      <h3 className="font-medium mb-2 capitalize">{plan.meal_type}</h3>
                      {plan.recipes && <RecipeDisplay recipe={transformRecipe(plan.recipes)} />}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">No meals planned for this date</p>
                <Dialog open={isAddMealOpen} onOpenChange={setIsAddMealOpen}>
                  <DialogTrigger asChild>
                    <Button>Add Meal</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add a Meal to Your Plan</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Meal Type</label>
                        <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select meal type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="breakfast">Breakfast</SelectItem>
                            <SelectItem value="lunch">Lunch</SelectItem>
                            <SelectItem value="dinner">Dinner</SelectItem>
                            <SelectItem value="snack">Snack</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Recipe</label>
                        <Select value={selectedRecipe} onValueChange={setSelectedRecipe}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a recipe" />
                          </SelectTrigger>
                          <SelectContent>
                            {recipes?.map((recipe) => (
                              <SelectItem key={recipe.id} value={recipe.id}>
                                {recipe.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button 
                        onClick={handleAddMeal}
                        disabled={!selectedRecipe || !selectedMealType || addMealMutation.isPending}
                        className="w-full"
                      >
                        {addMealMutation.isPending ? "Adding..." : "Add to Meal Plan"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}