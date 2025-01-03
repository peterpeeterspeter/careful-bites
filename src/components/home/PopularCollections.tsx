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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Popular Recipe Collections</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <div key={collection.id} className="relative group cursor-pointer">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-white font-semibold text-lg">
                      {collection.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
          >
            Explore All Collections
          </Button>
        </div>
      </div>
    </section>
  );
}