"use client";

import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthProvider";
import { toast } from "react-toastify";
import { Link } from "lucide-react";
import { FaArrowLeft, FaDollarSign, FaImage } from "react-icons/fa";

export default function CreateProduct() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData(e.target);
      const product = Object.fromEntries(form.entries());

      product.price = Number(product.price);
      product.stock = Number(product.stock);
      product.discountPercent = Number(product.discountPercent);
      product.bestSeller = product.bestSeller === "on";
      product.topRated = product.topRated === "on";
      product.sellerEmail = user?.email;
      product.createdAt = new Date();
      product.dimensions = {
        width: Number(product.width),
        height: Number(product.height),
        depth: Number(product.depth),
      };

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        product
      );

      if (data.insertedId) {
        toast.success("Product added successfully!");
        e.target.reset();
      } else {
        toast.error("Failed to add product");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <title>Add Product | Revoza</title>

      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Add New Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-purple-300 shadow-lg rounded-2xl p-8 space-y-4"
      >
        {/* Title + Category */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold text-purple-700">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Kindle Paperwhite"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label font-semibold text-purple-700">
              Category
            </label>
            <select
              name="category"
              required
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Select Category
              </option>

              <option value="electronics">Electronics</option>
              <option value="mobile">Mobile</option>
              <option value="fashion">Fashion</option>
              <option value="laptop">Laptop</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="label font-semibold text-purple-700">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Write product details here..."
            className="textarea textarea-bordered w-full"
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="label font-medium text-purple-700">
              Price ($)
            </label>
            <div className="relative">
              <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                step="0.01"
                name="price"
                placeholder="e.g. 179.99"
                required
                className="input input-bordered pl-10 w-full"
              />
            </div>
          </div>
          <div>
            <label className="label font-medium text-purple-700">Weight</label>
            <input
              type="number"
              name="weight"
              placeholder="e.g. 100"
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* Dimensions */}
        <div>
          <label className="label font-medium text-purple-700">
            Dimensions (mm)
          </label>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <input
                type="number"
                name="width"
                placeholder="Width"
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <input
                type="number"
                name="height"
                placeholder="Height"
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <input
                type="number"
                name="depth"
                placeholder="Depth"
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
        {/* Stock + Brand */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-medium text-purple-700">Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="e.g. 100"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label font-medium text-purple-700">Brand</label>
            <input
              type="text"
              name="brand"
              placeholder="e.g. Amazon"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="label font-medium text-purple-700">Image URL</label>
          <div className="relative">
            <FaImage className="absolute left-3 top-3 text-gray-400" />
            <input
              type="url"
              name="image"
              placeholder="https://example.com/product.jpg"
              className="input input-bordered pl-10 w-full"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-purple-700">
            <input type="checkbox" name="bestSeller" /> Best Seller
          </label>
          <label className="flex items-center gap-2 text-purple-700">
            <input type="checkbox" name="topRated" /> Top Rated
          </label>
        </div>

        {/* Seller Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-medium text-purple-700">
              Seller Name
            </label>
            <input
              type="text"
              name="sellerName"
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full bg-purple-50"
            />
          </div>
          <div>
            <label className="label font-medium text-purple-700">
              Seller Email
            </label>
            <input
              type="email"
              name="sellerEmail"
              value={user?.email}
              readOnly
              className="input input-bordered w-full bg-purple-50"
            />
          </div>
        </div>

        <div>
          <label className="label font-medium text-purple-700">
            Seller Photo URL
          </label>
          <input
            type="text"
            name="sellerPhoto"
            value={user?.photoURL}
            readOnly
            className="input input-bordered w-full bg-purple-50"
          />
        </div>

        {/* Availability + Return Policy + Discount */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="label font-medium text-purple-700">
              Availability Status
            </label>
            <select
              name="availabilityStatus"
              className="select select-bordered w-full"
              defaultValue="In Stock"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div>
            <label className="label font-medium text-purple-700">
              Return Policy
            </label>
            <input
              type="text"
              name="returnPolicy"
              placeholder="Return within 30 days"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label font-medium text-purple-700">
              Discount (%)
            </label>
            <input
              type="number"
              name="discountPercent"
              min="0"
              max="100"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full! gradient text-white py-2 rounded "
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
