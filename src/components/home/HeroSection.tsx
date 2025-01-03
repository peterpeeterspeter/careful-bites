import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const heroSlides = [
  {
    image: "/placeholder.svg",
    title: "Warm up this winter with healthy comforts",
    description: "Discover our collection of nutritious and delicious winter recipes",
    link: "/winter-recipes",
  },
  // Add more slides as needed
];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="relative h-[60vh] bg-gray-100">
      <Carousel className="h-full">
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/60 to-transparent w-full">
                  <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-4">{slide.title}</h2>
                    <p className="text-white mb-6">{slide.description}</p>
                    <Button
                      variant="default"
                      size="lg"
                      className="bg-[#4CAF50] hover:bg-[#45a049]"
                    >
                      Explore Recipes
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}