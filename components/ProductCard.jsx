import Image from "next/image";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import image from "../public/hero-image 1.png";
export default function ProductCard({ singleProduct }) {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,

    brand,
    category,
    availabilityStatus,
    shippingInformation,
  } = singleProduct;

  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(
    2
  );

  return (
    <div
      className="relative w-full  bg-white
     rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div
          className="absolute top-3 left-3
         bg-yellow-600 text-white text-xs font-bold z-10 px-2 py-1 rounded"
        >
          {discountPercentage.toFixed(0)}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          fill // fills parent container
          className="object-cover"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

        {/* Price & Rating */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-800">
              ${discountedPrice}
            </span>
            {discountPercentage > 0 && (
              <span className="text-sm line-through text-gray-400">
                ${price}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-yellow-500 font-semibold">
            <FaStar /> {rating.toFixed(1)}
          </span>
        </div>

        {/* Meta Info */}
        <p className="text-xs text-gray-400">
          {brand} • {category}
        </p>
        <p className="text-xs text-green-500">{availabilityStatus}</p>
        <p className="text-xs text-purple-500">{shippingInformation}</p>

        {/* Action Button */}
        <button className="mt-3 w-full btn btn-primary btn-sm flex items-center justify-center gap-2">
          View details
        </button>
      </div>
    </div>
  );
}
