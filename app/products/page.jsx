import MyContainer from "@/components/MyContainer";
import ProductFilter from "@/components/ProductFilter";

export default async function Products() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: "no-store",
  });

  const allProducts = await res.json();

  return (
    <MyContainer>
      <div className="py-10">
        <h1 className="title">All Product</h1>
        <h2 className="text-center font-semibold">
          Discover our full range of products, carefully selected to meet your
          needs.
        </h2>
      </div>

      <ProductFilter allProducts={allProducts} />
    </MyContainer>
  );
}
