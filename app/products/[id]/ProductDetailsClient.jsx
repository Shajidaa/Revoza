"use client";

import Image from "next/image";
import { useState, useContext, useEffect } from "react";
// import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { AuthContext } from "@/context/AuthProvider";
import { toast } from "react-toastify";
import { FaShoppingCart, FaStar, FaStore, FaTag } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function ProductDetailsClient({ product }) {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const isSeller = user?.email === product?.sellerEmail;

  useEffect(() => {
    async function checkAdded() {
      if (!user) return;
      try {
        const res = await axiosSecure.get(`/add-product?email=${user.email}`);
        const exists = res.data.some((p) => p._id === product._id);
        if (exists) setAlreadyAdded(true);
      } catch (err) {
        console.error(err);
      }
    }
    checkAdded();
  }, [user, product, axiosSecure]);

  useEffect(() => {
    async function loadRelated() {
      try {
        const res = await axiosSecure.get(`/products`);
        const filtered = res.data
          .filter(
            (p) => p.category === product.category && p._id !== product._id
          )
          .slice(0, 4);
        setRelatedProducts(filtered);
      } catch (e) {
        console.error(e);
      }
    }
    loadRelated();
  }, [product, axiosSecure]);

  const handleAdd = async () => {
    if (!user) {
      toast("Please login to add product");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosSecure.post("/add-product", {
        ...product,
        userEmail: user.email,
      });
      toast.success("Added to cart!");
      setAlreadyAdded(true);
    } catch (e) {
      console.error(e);
      toast.error("Failed to add.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-xl border border-purple-200">
      <div className="w-full flex justify-center mb-8">
        <Image
          src={product.image}
          alt={product.title}
          width={350}
          height={350}
          className="object-contain rounded-lg shadow-lg"
        />
      </div>

      <h1 className="text-2xl md:text-4xl font-bold text-purple-700 mb-3">
        {product.title}
      </h1>
      <p className="text-gray-700 text-sm md:text-lg mb-6 leading-relaxed">
        {product.description}
      </p>
      <div className="flex gap-3 mb-6">
        {product.bestSeller && (
          <span className="bg-yellow-300 text-yellow-900 px-4 py-1 rounded-full text-sm font-medium">
            Best Seller
          </span>
        )}
        {product.topRated && (
          <span className="bg-green-300 text-green-900 px-4 py-1 rounded-full text-sm font-medium">
            Top Rated
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-6 bg-purple-50 p-6 rounded-lg border border-purple-200 mb-6">
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Brand:</strong> {product.brand}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p className="flex items-center gap-2">
          <FaStar className="text-yellow-400" /> {product.rating}
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
        <p className="flex items-center gap-2">
          <FaTag className="text-purple-500" /> {product.discountPercent}% Off
        </p>
      </div>

      <div className="flex items-center gap-4 bg-purple-100 p-4 rounded-lg border border-purple-200 mb-6">
        <Image
          src={product.sellerPhoto}
          alt={product.sellerName}
          width={50}
          height={50}
          className="rounded-full border-2 border-purple-400"
        />
        <div>
          <p className="flex items-center gap-2 font-medium">
            <FaStore className="text-purple-600" /> {product.sellerName}
          </p>
          <p className="text-gray-600">{product.sellerEmail}</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {!isSeller && (
          <button
            onClick={handleAdd}
            disabled={loading || alreadyAdded}
            className="bg-purple-600 text-white  px-8 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 hover:bg-purple-700 transition disabled:opacity-50"
          >
            <FaShoppingCart />
            {alreadyAdded
              ? "Already Added"
              : loading
              ? "Adding..."
              : "Add to Cart"}
          </button>
        )}
      </div>

      {/* RELATED PRODUCTS */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-purple-700">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((rp) => (
          <div
            key={rp._id}
            className="p-4 shadow-lg rounded-lg   hover:shadow-xl transition bg-white"
          >
            <Image
              src={rp.image}
              alt={rp.title}
              width={200}
              height={200}
              className="rounded-md mx-auto"
            />
            <h3 className="mt-3 font-semibold text-lg text-center">
              {rp.title}
            </h3>
            <p className="text-center text-purple-600 font-bold">${rp.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
