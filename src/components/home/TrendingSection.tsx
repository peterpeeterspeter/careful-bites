import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const trendingRecipes = [
  {
    id: 1,
    title: "Low-GI Mediterranean Bowl",
    image: "/placeholder.svg",
    link: "/recipes/mediterranean-bowl",
    glycemicIndex: "Low",
    carbsPerServing: "20g",
    prepTime: "15 mins",
  },
  {
    id: 2,
    title: "Protein-Rich Quinoa Salad",
    image: "/placeholder.svg",
    link: "/recipes/quinoa-salad",
    glycemicIndex: "Low",
    carbsPerServing: "25g",
    prepTime: "20 mins",
  },
  {
    id: 3,
    title: "Blood Sugar-Friendly Stir-Fry",
    image: "/placeholder.svg",
    link: "/recipes/chicken-stir-fry",
    glycemicIndex: "Medium",
    carbsPerServing: "18g",
    prepTime: "25 mins",
  },
  {
    id: 4,
    title: "High-Fiber Veggie Pasta",
    image: "/placeholder.svg",
    link: "/recipes/veggie-pasta",
    glycemicIndex: "Medium",
    carbsPerServing: "30g",
    prepTime: "30 mins",
  }
];

export function TrendingSection() {
  return (
    <section className="py-16 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-primary-700">
            Trending Diabetes-Friendly Recipes
          </h2>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {trendingRecipes.map((recipe) => (
              <CarouselItem key={recipe.id} className="pl-4 md:basis-1/3 lg:basis-1/4">
                <Card className="overflow-hidden hover:shadow-md transition-shadow border-none">
                  <CardContent className="p-0">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-3">{recipe.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-primary-50 text-primary-700 hover:bg-primary-100">
                          GI: {recipe.glycemicIndex}
                        </Badge>
                        <Badge variant="secondary" className="bg-secondary-50 text-secondary-700 hover:bg-secondary-100">
                          {recipe.carbsPerServing}
                        </Badge>
                        <Badge variant="secondary" className="bg-muted hover:bg-muted/80">
                          {recipe.prepTime}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}