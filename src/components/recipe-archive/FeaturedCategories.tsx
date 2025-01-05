import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function FeaturedCategories() {
  const categories = [
    {
      title: "Breakfast",
      image: "/featured-recipe-image.jpg",
    },
    // ... Add more categories
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Browse by category</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="w-[250px] shrink-0"
            >
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-lg font-medium mt-2">{category.title}</h3>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}