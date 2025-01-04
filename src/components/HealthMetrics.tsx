import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Brain, Droplet, Heart, Scale, TrendingUp, Utensils } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface HealthMetricsData {
  glucose_level?: number;
  activity_minutes?: number;
  carb_intake?: number;
  heart_rate?: number;
  weight?: number;
  insulin_units?: number;
  meals_logged?: number;
}

export function HealthMetrics() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<HealthMetricsData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        if (!user) return;

        // Fetch latest activity log
        const { data: activityLog } = await supabase
          .from('activity_logs')
          .select('*')
          .eq('profile_id', user.id)
          .order('activity_date', { ascending: false })
          .limit(1)
          .single();

        // Fetch user profile for weight
        const { data: profile } = await supabase
          .from('profiles')
          .select('current_weight_kg')
          .eq('id', user.id)
          .single();

        setMetrics({
          glucose_level: activityLog?.glucose_level || 120,
          activity_minutes: activityLog?.activity_minutes || 30,
          carb_intake: 45, // Default value, you might want to fetch this from a meals table
          heart_rate: activityLog?.heart_rate || 72,
          weight: profile?.current_weight_kg || 70,
          insulin_units: 0, // Default value, you might want to fetch this from a medication log
          meals_logged: 3, // Default value, you might want to fetch this from a meals table
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
        toast.error('Failed to load health metrics');
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, [user]);

  const healthMetrics = [
    {
      title: "Blood Glucose",
      value: `${metrics.glucose_level || '--'} mg/dL`,
      icon: Droplet,
      description: "Last reading",
    },
    {
      title: "Activity Level",
      value: `${metrics.activity_minutes || '--'} mins`,
      icon: Activity,
      description: "Today's activity",
    },
    {
      title: "Carb Intake",
      value: `${metrics.carb_intake || '--'}g`,
      icon: Brain,
      description: "Today's total",
    },
    {
      title: "Heart Rate",
      value: `${metrics.heart_rate || '--'} BPM`,
      icon: Heart,
      description: "Resting average",
    },
    {
      title: "Weight",
      value: `${metrics.weight || '--'} kg`,
      icon: Scale,
      description: "Current weight",
    },
    {
      title: "Insulin Units",
      value: `${metrics.insulin_units || '--'} units`,
      icon: TrendingUp,
      description: "Today's total",
    },
    {
      title: "Meals Logged",
      value: `${metrics.meals_logged || '--'}`,
      icon: Utensils,
      description: "Today's meals",
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(7)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">Loading...</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

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