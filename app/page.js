import BestSeller from "@/components/BestSeller";
import HomeBanner from "@/components/HomeBanner";
import LatestProduct from "@/components/LatestProduct";
import PromoBanner from "@/components/PromoBanner";
import ServiceSection from "@/components/service";

export default function Home() {
  return (
    <div className="">
      <HomeBanner></HomeBanner>
      <PromoBanner></PromoBanner>
      <LatestProduct></LatestProduct>
      <ServiceSection></ServiceSection>
      <BestSeller></BestSeller>
    </div>
  );
}
