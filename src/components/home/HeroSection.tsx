import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const heroSlides = [
  {
    image: "/placeholder.svg",
    title: "Try Our AI Recipe Generator Free",
    description: "Generate 3 personalized diabetes-friendly recipes instantly - No registration required!",
    link: "/recipes",
  },
  {
    image: "/placeholder.svg",
    title: "Personalized Meal Planning",
    description: "Get weekly meal plans that consider your blood sugar levels, activity, and preferences",
    link: "/meal-planning",
  },
  {
    image: "/placeholder.svg",
    title: "Join Our Diabetic Community",
    description: "Connect with others and share experiences in managing diabetes through diet",
    link: "/community",
  }
];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/recipe-generator");
  };

  const handleLearnMore = () => {
    const currentSlide = heroSlides[activeSlide];
    navigate(currentSlide.link);
  };

  return (
    <section className="relative h-[70vh] bg-gradient-to-b from-green-50 to-white">
      <Carousel 
        className="h-full" 
        opts={{
          align: "start",
          loop: true
        }}
        onSelect={(api: CarouselApi) => {
          const selectedIndex = api.selectedScrollSnap();
          setActiveSlide(selectedIndex);
        }}
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                      {slide.description}
                    </p>
                    <div className="flex gap-4">
                      <Button
                        size="lg"
                        className="bg-[#4CAF50] hover:bg-[#45a049] text-lg"
                        onClick={handleGetStarted}
                      >
                        Try Free - No Sign Up
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white text-lg"
                        onClick={handleLearnMore}
                      >
                        Learn More
                      </Button>
                    </div>
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