export function CategoryGrid() {
  const categories = [
    {
      title: "Breakfast",
      image: "/featured-recipe-image.jpg",
    },
    // ... Add more categories
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <div
          key={index}
          className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
        >
          <img
            src={category.image}
            alt={category.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
            {category.title}
          </h3>
        </div>
      ))}
    </div>
  );
}