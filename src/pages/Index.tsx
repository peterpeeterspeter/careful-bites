import { TopUtilityBar } from "@/components/layout/TopUtilityBar";
import { MainHeader } from "@/components/layout/MainHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { TrendingSection } from "@/components/home/TrendingSection";
import { VideoSection } from "@/components/home/VideoSection";
import { PopularCollections } from "@/components/home/PopularCollections";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <TopUtilityBar />
      <MainHeader />
      <main>
        <HeroSection />
        <TrendingSection />
        <VideoSection />
        <PopularCollections />
      </main>
    </div>
  );
}