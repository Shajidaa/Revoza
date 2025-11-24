import MyContainer from "@/components/MyContainer";
import ProductCard from "@/components/ProductCard";
import React from "react";

export default async function Products() {
  const productData = await fetch(`http://localhost:5000/products`, {
    cache: "no-store",
  });
  const products = await productData.json();
  // console.log(products);

  return (
    <MyContainer>
      <div>
        <h1>All Product</h1>
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
