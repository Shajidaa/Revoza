// components/PromoBanner.jsx
import Image from "next/image";
import { FaCircle } from "react-icons/fa";

export default function PromoBanner() {
  return (
    <div className="w-full bg-white flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12">
      {/* Left Content */}
      <div className="max-w-lg">
        <h2 className="text-red-500 text-4xl md:text-5xl font-bold">
          Sale 20% Off
        </h2>
        <h3 className="text-gray-900 text-4xl md:text-5xl font-extrabold mt-2">
          On Everything
        </h3>

        <p className="text-gray-600 mt-4 leading-relaxed">
          Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam
          fugiat hic? Esse dicta aliquid error reiciendis repellendus suscipit
          molestias veniam.
        </p>

        <button className="bg-red-500 text-white px-6 py-3 mt-6 rounded-md font-semibold hover:bg-red-600 transition">
          Shop Now
        </button>

        {/* Slider dots */}
        <div className="flex items-center gap-3 mt-6">
          <FaCircle className="text-red-500 text-xs" />
          <FaCircle className="text-gray-300 text-xs" />
          <FaCircle className="text-gray-300 text-xs" />
        </div>
      </div>

      {/* Right image */}
      <div className="mt-10 md:mt-0">
        <Image
          src="/hero-image 1.png"
          alt="Sale Girl"
          className="w-[350px] md:w-[420px] object-cover"
          width={300}
          height={300}
        />
      </div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}
