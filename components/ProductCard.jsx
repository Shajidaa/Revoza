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
    <div
      className="bg-white shadow-md rounded-xl overflow-hidden relative 
      transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
    >
      {/* --- Discount Badge --- */}
      {discountPercent > 0 && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          {discountPercent}% OFF
        </div>
      )}

      {/* --- Product Image --- */}
      <div className="h-[200px] w-full overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="h-full w-full object-cover transition duration-300 hover:scale-110"
        />
      </div>

      {/* --- Card Body --- */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-1">{description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 font-semibold">
          <FaStar /> <span>{rating}</span>
        </div>

        {/* Price */}
        <div>
          {discountPercent > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-purple-600">
                Tk {discountedPrice}
              </span>
              <span className="line-through text-gray-400 text-sm">
                Tk {price}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-purple-600">
              Tk {price}
            </span>
          )}
        </div>

        {/* Meta Info */}
        <p className="text-xs text-gray-400">
          {brand} • {category}
        </p>

        {/* Button */}
        <Link href={`/products/${_id}`} className="mt-3 w-full gradient">
          View details
        </Link>
      </div>
    </div>
  );
}
