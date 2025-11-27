import Link from "next/link";

export default function PromoBanner() {
  return (
    <div
      className="hero min-h-[50vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/Vpk2dyjq/Black-White-and-Red-Minimalist-Market-Shops-Discount-Black-Friday-Banner.png')",
      }}
    >
      <div className="hero-content p-10 text-center text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4  text-white bg-clip-text">
            Your Style, Your Way
          </h1>

          <p className="mb-6 text-2xl lg:text-4xl font-semibold text-white bg-clip-text ">
            Discover the latest products at unbeatable prices—delivered straight
            to your door
          </p>

          <Link
            href="/products"
            className="btn bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
