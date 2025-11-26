import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductDetails({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const product = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Product Image */}
      <Image
        src={product.image}
        alt={product.title}
        width={100}
        height={96}
        className="w-full h-96 object-contain mb-6 rounded-lg shadow"
      />

      {/* Title & Description */}
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>

      {/* Product Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Brand:</strong> {product.brand}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Rating:</strong> {product.rating}
        </p>
        <p>
          <strong>Stock:</strong> {product.stock}
        </p>
        <p>
          <strong>Weight:</strong> {product.weight}g
        </p>
        <p>
          <strong>Dimensions:</strong>{" "}
          {product.dimensions
            ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`
            : "N/A"}
        </p>
        <p>
          <strong>Availability:</strong> {product.availabilityStatus}
        </p>
        <p>
          <strong>Return Policy:</strong> {product.returnPolicy}
        </p>
        <p>
          <strong>Discount:</strong> {product.discountPercent}%
        </p>
      </div>

      {/* Seller Info */}
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={product.sellerPhoto}
          alt={product.sellerName}
          width={12}
          height={12}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p>
            <strong>Seller:</strong> {product.sellerName}
          </p>
          <p>
            <strong>Email:</strong> {product.sellerEmail}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2 mb-6">
        {product.bestSeller && (
          <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">
            Best Seller
          </span>
        )}
        {product.topRated && (
          <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
            Top Rated
          </span>
        )}
      </div>

      {/* Created At */}
      <p className="text-gray-500 mt-4 text-sm">
        Added on: {new Date(product.createdAt).toLocaleDateString()}
      </p>
      {/* Add to Cart Button */}
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
        Add to Cart
      </button>
    </div>
  );
}
