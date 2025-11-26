import React from "react";
import MyContainer from "./MyContainer";
import ProductCard from "./ProductCard";

export default async function LatestProduct() {
  const productData = await fetch(`http://localhost:5000/latest-product`, {
    cache: "no-store",
  });
  const products = await productData.json();
  return (
    <MyContainer>
      <div>
        <h1 className="title my-5">Latest Product</h1>
      </div>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((singleProduct) => {
          return (
            <ProductCard
              key={singleProduct._id}
              singleProduct={singleProduct}
            ></ProductCard>
          );
        })}
      </div>
    </MyContainer>
  );
}
