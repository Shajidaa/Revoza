import HomeBanner from "@/components/HomeBanner";
import LatestProduct from "@/components/LatestProduct";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <HomeBanner></HomeBanner>
      <LatestProduct></LatestProduct>
    </div>
  );
}
