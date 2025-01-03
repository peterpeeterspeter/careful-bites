import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const trendingRecipes = [
  {
    id: 1,
    title: "Low-Carb Cauliflower Rice Bowl",
    image: "/placeholder.svg",
    link: "/recipes/cauliflower-rice-bowl",
  },
  {
    id: 2,
    title: "Sugar-Free Berry Smoothie",
    image: "/placeholder.svg",
    link: "/recipes/berry-smoothie",
  },
  {
    id: 3,
    title: "Keto-Friendly Chicken Stir-Fry",
    image: "/placeholder.svg",
    link: "/recipes/chicken-stir-fry",
  },
  {
    id: 4,
    title: "Diabetic-Friendly Zucchini Pasta",
    image: "/placeholder.svg",
    link: "/recipes/zucchini-pasta",
  }
];

export function TrendingSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Trending Recipes</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {trendingRecipes.map((recipe) => (
              <CarouselItem key={recipe.id} className="pl-4 md:basis-1/4">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{recipe.title}</h3>
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