import BestSeller from "@/components/BestSeller";
import Discount from "@/components/Discount";
import HomeBanner from "@/components/HomeBanner";
import LatestProduct from "@/components/LatestProduct";
import PromoBanner from "@/components/PromoBanner";
import ServiceSection from "@/components/service";

export default function Home() {
  return (
    <div className="">
      <HomeBanner></HomeBanner>
      <PromoBanner></PromoBanner>
      <Discount></Discount>
      <LatestProduct></LatestProduct>
      <ServiceSection></ServiceSection>
      <BestSeller></BestSeller>
    </div>
  );
}
