import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredVideo = {
  thumbnail: "/placeholder.svg",
  title: "How to Make Perfect Overnight Oats",
  rating: 4.5,
  views: "12K",
  duration: "15 mins",
  difficulty: "Easy",
  dietary: ["Vegetarian", "Low-carb"],
};

const additionalVideos = [
  {
    thumbnail: "/placeholder.svg",
    title: "Healthy Meal Prep for the Week",
    rating: 4.8,
    views: "8K",
    duration: "20 mins",
    difficulty: "Medium",
    dietary: ["Vegan"],
  },
  // Add more videos
];

export function VideoSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Videos</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Featured Video */}
          <div className="relative group cursor-pointer">
            <div className="relative aspect-video">
              <img
                src={featuredVideo.thumbnail}
                alt={featuredVideo.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-[#4CAF50]" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">{featuredVideo.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(featuredVideo.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span>{featuredVideo.views} views</span>
                <span>•</span>
                <span>{featuredVideo.duration}</span>
                <span>•</span>
                <span>{featuredVideo.difficulty}</span>
              </div>
              <div className="flex gap-2 mt-2">
                {featuredVideo.dietary.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Videos */}
          <div className="space-y-6">
            {additionalVideos.map((video, index) => (
              <div key={index} className="flex gap-4 group cursor-pointer">
                <div className="relative w-40">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-video object-cover rounded"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-2 group-hover:scale-110 transition-transform">
                      <Play className="h-4 w-4 text-[#4CAF50]" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{video.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.duration}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-4 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
            >
              Watch more videos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}