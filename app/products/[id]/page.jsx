// app/products/[id]/page.jsx
// import ProductDetailsClient from "./ProductDetailsClient";

import ProductDetailsClient from "./ProdcutDetailsClient";

export default async function ProductDetails({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Product not found");
  }

  const product = await res.json();

  return <ProductDetailsClient product={product} />;
}
