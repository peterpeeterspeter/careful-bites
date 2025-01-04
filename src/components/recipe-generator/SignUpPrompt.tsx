import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SignUpPrompt() {
  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">Want More Recipes?</h3>
        <p className="text-gray-600 mb-4">
          Sign up now to unlock unlimited recipe generations and personalized meal planning!
        </p>
        <Button
          onClick={() => window.location.href = '/register'}
          className="bg-[#4CAF50] hover:bg-[#45a049]"
        >
          Sign Up - It's Free
        </Button>
      </CardContent>
    </Card>
  );
}