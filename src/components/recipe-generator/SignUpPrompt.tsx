import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

export function SignUpPrompt() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      window.location.href = '/register';
      return;
    }

    // Prevent multiple clicks while loading
    if (isLoading) return;

    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        method: 'POST',
      });

      if (error) throw error;
      if (!data?.url) throw new Error('No checkout URL received');

      // Only redirect if we have a valid URL
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to start checkout process. Please try again.');
      // Make sure to reset loading state on error
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">Upgrade to Premium</h3>
        <p className="text-gray-600 mb-4">
          Get unlimited recipe generations and personalized meal planning for just €4.99/month!
        </p>
        <Button
          onClick={handleSubscribe}
          disabled={isLoading}
          className="bg-[#4CAF50] hover:bg-[#45a049]"
        >
          {isLoading ? 'Processing...' : user ? 'Subscribe Now' : 'Sign Up - It\'s Free'}
        </Button>
      </CardContent>
    </Card>
  );
}