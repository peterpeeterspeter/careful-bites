import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function NewsletterSignup() {
  return (
    <Card className="bg-secondary/10 p-8 rounded-xl mb-12">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">
          Never miss a recipe from CarefulCuisine
        </h2>
        <p className="text-muted-foreground mb-6">
          Sign up to receive weekly diabetes-friendly recipes!
        </p>
        <form className="flex gap-4 max-w-md mx-auto mb-4">
          <Input
            type="email"
            placeholder="Your email address"
            className="flex-1"
            required
          />
          <Button type="submit">Sign Up</Button>
        </form>
        <p className="text-sm text-muted-foreground">
          By entering your details, you are agreeing to our{" "}
          <a href="#" className="underline hover:text-primary">
            terms and conditions
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-primary">
            privacy policy
          </a>
        </p>
      </div>
    </Card>
  );
}