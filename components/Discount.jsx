"use client";

import { useEffect, useState } from "react";
import MyContainer from "./MyContainer";
import ProductCard from "./ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";
// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

export default function Discount() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/discount-product`,
          {
            cache: "no-store",
          }
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    }

    loadProducts();
  }, []);
  return (
    <MyContainer>
      <div className="flex justify-between py-15 items-center mb-8">
        <h1 className="title">Discount</h1>

        <Link
          href="/products"
          className="flex items-center gap-1 text-purple-600 hover:text-purple-800 transition font-medium"
        >
          See all <FaArrowRight size={14} />
        </Link>
      </div>

      <Swiper
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {products.map((singleProduct) => (
          <SwiperSlide key={singleProduct._id}>
            <ProductCard singleProduct={singleProduct} />
          </SwiperSlide>
        ))}
      </Swiper>
    </MyContainer>
  );
}
