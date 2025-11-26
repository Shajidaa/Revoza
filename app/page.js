import BestSeller from "@/components/BestSeller";
import Discount from "@/components/Discount";

import LatestProduct from "@/components/LatestProduct";
import PromoBanner from "@/components/PromoBanner";
import ServiceSection from "@/components/service";
import Subscribe from "@/components/Subscribe";
import Work from "@/components/Work";

export default function Home() {
  return (
    <div className="">
      <Discount></Discount>
      <LatestProduct></LatestProduct>
      <ServiceSection></ServiceSection>
      <BestSeller></BestSeller>
      <Subscribe></Subscribe>
      <Work></Work>
    </div>
  );
}
