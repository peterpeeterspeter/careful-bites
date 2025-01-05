import { Badge } from "@/components/ui/badge";
import { Clock, Activity } from "lucide-react";

export function PopularCollections() {
  const collections = [
    {
      title: "Quick Breakfast Ideas",
      image: "/featured-recipe-image.jpg",
      glycemicIndex: "low",
      difficulty: "Easy",
      time: "30 mins",
    },
    // ... Add more collections
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">
        Most popular recipe collections this week
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {collections.map((collection, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
          >
            <img
              src={collection.image}
              alt={collection.title}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex gap-2 mb-2">
                <Badge variant="secondary" className="bg-green-500/80">
                  <Activity className="w-4 h-4 mr-1" />
                  Low GI
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/80">
                  <Clock className="w-4 h-4 mr-1" />
                  {collection.time}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold">{collection.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}