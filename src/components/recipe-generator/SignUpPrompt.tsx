import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SignUpPrompt() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = useCallback(async () => {
    if (!user) {
      navigate('/register');
      return;
    }

    if (isLoading) return;

    const toastId = 'checkout-process';
    
    try {
      setIsLoading(true);
      toast.loading('Preparing checkout...', { id: toastId });

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        method: 'POST',
      });

      if (error) throw error;
      if (!data?.url) throw new Error('No checkout URL received');

      toast.dismiss(toastId);
      window.location.assign(data.url);
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to start checkout process. Please try again.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  }, [user, isLoading, navigate]);

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
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : user ? (
            'Subscribe Now'
          ) : (
            "Sign Up - It's Free"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}