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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Trending Diabetes-Friendly Recipes</h2>
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
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          GI: {recipe.glycemicIndex}
                        </Badge>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Carbs: {recipe.carbsPerServing}
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
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