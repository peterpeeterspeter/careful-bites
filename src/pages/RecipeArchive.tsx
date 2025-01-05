import { MainHeader } from "@/components/layout/MainHeader";
import { HeroBanner } from "@/components/recipe-archive/HeroBanner";
import { PopularCollections } from "@/components/recipe-archive/PopularCollections";
import { FeaturedCategories } from "@/components/recipe-archive/FeaturedCategories";
import { NewsletterSignup } from "@/components/recipe-archive/NewsletterSignup";
import { CategoryGrid } from "@/components/recipe-archive/CategoryGrid";
import { FilterBar } from "@/components/recipe-archive/FilterBar";

export function RecipeArchive() {
  return (
    <>
      <MainHeader />
      <main>
        <HeroBanner />
        <div className="container mx-auto px-4 py-8">
          <FilterBar />
          <PopularCollections />
          <FeaturedCategories />
          <NewsletterSignup />
          <CategoryGrid />
        </div>
      </main>
    </>
  );
}