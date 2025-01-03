import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Calendar, Apple, Users, ArrowRight, Activity, Brain, Lock } from "lucide-react";

const features = [
  {
    title: "AI-Powered Recipes",
    description: "Get personalized recipe suggestions based on your diabetes type and dietary preferences",
    icon: Brain,
  },
  {
    title: "Smart Meal Planning",
    description: "Plan your meals with our intelligent calendar that considers your glucose levels and activity",
    icon: Calendar,
  },
  {
    title: "Nutritional Insights",
    description: "Track glycemic impact and detailed nutritional information for every meal",
    icon: Activity,
  },
  {
    title: "Community Support",
    description: "Connect with others and share your journey in our premium community forums",
    icon: Users,
  },
];

const benefits = [
  {
    title: "Personalized Experience",
    description: "Tailored recommendations based on your specific medical profile",
    icon: ChefHat,
  },
  {
    title: "Health Tracking",
    description: "Monitor your nutritional intake and health metrics in one place",
    icon: Apple,
  },
  {
    title: "Data Security",
    description: "Your medical information is protected with enterprise-grade security",
    icon: Lock,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 text-center space-y-6">
        <h1 className="text-5xl font-bold text-primary">
          Transform Your Diabetes Management
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          CarefulCuisine helps you take control of your diet with AI-powered recipes
          and meal plans tailored to your specific needs.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="gap-2">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Features Designed for Your Health
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-none shadow-lg">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose CarefulCuisine?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center space-y-4">
                <div className="flex justify-center">
                  <benefit.icon className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-bold">Ready to Take Control?</h2>
          <p className="text-lg opacity-90">
            Join over 500,000 users who are managing their diabetes with CarefulCuisine
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;