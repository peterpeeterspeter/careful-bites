import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <div className="w-full h-[400px] relative mb-12">
      <img
        src="/featured-recipe-image.jpg"
        alt="Featured diabetes-friendly recipe"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-8 left-8 right-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Recipe inspiration</h1>
        <p className="text-xl mb-6">
          Find diabetes-friendly recipes tailored to your needs
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Generate personalized recipe
        </Button>
      </div>
    </div>
  );
}