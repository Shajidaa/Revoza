import Link from "next/link";

export default function PromoBanner() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-photo/happy-brunette-girl-shopaholic-showing-her-plastic-credit-card-shopping-bags-look-dreamy-up-l_1258-119763.jpg?semt=ais_hybrid&w=740&q=80)",
      }}
    >
      {/* <div className="hero-overlay"></div> */}
      <div className="hero-content text-neutral-content text-center">
        <div className="">
          <p className="mb-5 text-black text-5xl lg:text-8xl">
            Get up to <span className="text-red-50">30%</span>Off new arrivals..
          </p>
          <Link href={"/products"} className="btn btn-primary">
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
}
