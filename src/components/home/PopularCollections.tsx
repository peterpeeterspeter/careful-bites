import { Button } from "@/components/ui/button";

const collections = [
  {
    id: 1,
    title: "Low-GI Breakfast Ideas",
    image: "/placeholder.svg",
    link: "/collections/low-gi-breakfast",
  },
  {
    id: 2,
    title: "Blood Sugar-Friendly Dinners",
    image: "/placeholder.svg",
    link: "/collections/diabetic-dinners",
  },
  {
    id: 3,
    title: "Healthy Snack Options",
    image: "/placeholder.svg",
    link: "/collections/healthy-snacks",
  },
  {
    id: 4,
    title: "Sugar-Free Desserts",
    image: "/placeholder.svg",
    link: "/collections/sugar-free-desserts",
  },
];

export function PopularCollections() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-primary-700 mb-8">
          Popular Recipe Collections
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <div key={collection.id} className="relative group cursor-pointer">
              <div className="aspect-square overflow-hidden rounded-xl">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-white font-medium text-lg">
                      {collection.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            Explore All Collections
          </Button>
        </div>
      </div>
    </section>
  );
}