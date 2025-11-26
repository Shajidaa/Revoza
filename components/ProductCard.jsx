import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function ProductCard({ singleProduct }) {
  const {
    title,
    price,
    rating,
    brand,
    category,
    description,
    image,
    discountPercent,
    _id,
  } = singleProduct;

  // Discount price calculation
  const discountedPrice = discountPercent
    ? (price - price * (discountPercent / 100)).toFixed(2)
    : price;

  return (
    <div className="card bg-base-100 shadow-md relative p-3 hover:shadow-xl transition">
      {/* --- Discount Badge --- */}
      {discountPercent > 0 && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {discountPercent}% OFF
        </div>
      )}

      {/* Product Image */}
      <figure className="px-5 pt-5 h-96 max-w-96">
        <Image
          src={image}
          alt={title}
          width={300}
          height={300}
          className="rounded object-contain"
        />
      </figure>

      {/* Body */}
      <div className="card-body p-4">
        <div className="p-4 flex flex-col gap-2">
          {/* Title */}
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

          {/* Price & Rating */}
          <div className="flex items-center gap-1 text-yellow-500 font-semibold">
            <FaStar /> {rating}
          </div>
        </div>
        {/* Price */}
        <div className="mt-1">
          {discountPercent > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                Tk {discountedPrice}
              </span>
              <span className="line-through text-gray-400 text-sm">
                Tk {price}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-primary">Tk {price}</span>
          )}
        </div>
        {/* Meta Info */}
        <p className="text-xs text-gray-400">
          {brand} • {category}
        </p>
      </div>
      <Link
        href={`/products/${_id}`}
        className="mt-3 w-full gradient btn-sm flex items-center justify-center gap-2"
      >
        View details
      </Link>
    </div>
  );
}
