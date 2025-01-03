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
    title: "Manage Diabetes Deliciously",
    description: "Discover our collection of blood sugar-friendly recipes that don't compromise on taste",
    link: "/recipes",
  },
  {
    image: "/placeholder.svg",
    title: "Smart Meal Planning Made Easy",
    description: "Personalized meal plans to help you maintain healthy blood sugar levels",
    link: "/meal-planning",
  },
  {
    image: "/placeholder.svg",
    title: "Join Our Supportive Community",
    description: "Connect with others and share your diabetes management journey",
    link: "/community",
  }
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
                      Get Started
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