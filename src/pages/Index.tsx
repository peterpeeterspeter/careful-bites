import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Calendar, Apple, Users } from "lucide-react";

const features = [
  {
    title: "AI-Powered Recipes",
    description: "Get personalized recipe suggestions based on your dietary needs",
    icon: ChefHat,
  },
  {
    title: "Meal Planning",
    description: "Plan your meals ahead with our smart calendar integration",
    icon: Calendar,
  },
  {
    title: "Nutritional Insights",
    description: "Track your nutritional intake with detailed analytics",
    icon: Apple,
  },
  {
    title: "Community Support",
    description: "Connect with others and share your culinary journey",
    icon: Users,
  },
];

const Index = () => {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Welcome to CarefulCuisine</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your personalized dietary companion for managing diabetes through delicious, healthy meals
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
        {features.map((feature) => (
          <Card key={feature.title} className="bg-white">
            <CardHeader>
              <feature.icon className="w-10 h-10 text-primary mb-2" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Index;