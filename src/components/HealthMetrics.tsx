import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Brain, Heart, TrendingUp } from "lucide-react";

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

export function HealthMetrics() {
  return (
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
  );
}