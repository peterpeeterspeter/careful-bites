import { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecipeDisplay } from "@/components/recipe-generator/RecipeDisplay";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function MealPlanningCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Fetch meal plans for the current week
  const { data: mealPlans, isLoading } = useQuery({
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
            {isLoading ? (
              <p>Loading meals...</p>
            ) : mealPlans && mealPlans.length > 0 ? (
              <div className="space-y-4">
                {mealPlans
                  .filter(plan => format(new Date(plan.planned_date), 'yyyy-MM-dd') === 
                           format(selectedDate!, 'yyyy-MM-dd'))
                  .map((plan) => (
                    <div key={plan.id} className="border-b pb-4">
                      <h3 className="font-medium mb-2 capitalize">{plan.meal_type}</h3>
                      {plan.recipes && <RecipeDisplay recipe={plan.recipes} />}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">No meals planned for this date</p>
                <Button>Add Meal</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}