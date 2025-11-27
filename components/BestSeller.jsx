"use client";

import { useEffect, useState } from "react";
import MyContainer from "./MyContainer";
import ProductCard from "./ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function BestSeller() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bestSeller-product`,
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
      <h1 className="title my-15">Best Seller</h1>

      <Swiper
        loop={true}
        pagination={{ clickable: true }}
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
        modules={[Pagination]}
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
