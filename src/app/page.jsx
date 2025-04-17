import AppDownload from "@/components/Home/AppDownload";
import ConstructionMaterials from "@/components/Home/ConstructionMaterials";
import FeaturesBanner from "@/components/Home/FeaturesBanner";
import ImageGallery from "@/components/Home/ImageGallery";
import ImageGallery2 from "@/components/Home/ImageGallery2";
import NewArrivals from "@/components/Home/NewArrivals";
import PromotionSection from "@/components/Home/PromotionSection";
import Sliderhome from "@/components/Home/Slider/Sliderhome";
import TopCategories from "@/components/Home/TopCategories";
import InsulationSection from "@/components/Home/Insulation";
import FlooringCoatingSection from "@/components/Home/FlooringCoating";

export default function Home() {
  return (
    <div>
      <Sliderhome />
      <FeaturesBanner />
      <PromotionSection />

      <ImageGallery />
      <TopCategories />
      <InsulationSection />
      <ConstructionMaterials />
      <FlooringCoatingSection />
      <ImageGallery2 />
      <AppDownload />
      <NewArrivals />
    </div>
  );
}
