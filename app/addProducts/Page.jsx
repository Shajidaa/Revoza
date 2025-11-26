"use client";

import { useState, useContext, useEffect } from "react";

import {
  FaArrowLeft,
  FaImage,
  FaTag,
  FaDollarSign,
  FaStar,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthProvider";
import Link from "next/link";

import { useRouter } from "next/navigation";

import axios from "axios";

export default function AddProduct() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   if (!loading && !user) router.push("/login");
  // }, [user, loading, router]);

  // if (loading || !user) return <p>Loading...</p>;

  // useEffect(() => {
  //   // 1) context এখনও load হয়নি
  //   if (loading) return;

  //   // 2) user না থাকলে login এ পাঠাও
  //   if (!user) {
  //     router.replace("/login");
  //   }
  // }, [user, loading, router]);

  // if (loading || !user) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData(e.target);
      const product = Object.fromEntries(form.entries());
      product.bestSeller = product.bestSeller === "on";
      product.topRated = product.topRated === "on";
      product.sellerEmail = user?.email;
      product.createdAt = new Date();
      const { data } = await axios.post(
        "http://localhost:5000/products",
        product
      );

      if (data.insertedId) {
        toast.success("Product added successfully!");
        e.target.reset();
      } else {
        toast.error("Failed to add product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <title>Add Product | ShopAdmin</title>

      <Link
        href={"/products"}
        className="flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4"
      >
        <FaArrowLeft className="mr-2" size={20} /> Back to Products
      </Link>

      <h2 className="text-2xl font-bold text-center mb-6">Add New Product</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white  border border-gray-200  shadow-lg rounded-2xl p-8 space-y-4"
      >
        {/* Title + Category */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Kindle Paperwhite"
              required
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="label font-semibold">Category</label>
            <select
              name="category"
              required
              className="select select-bordered w-full dark:bg-gray-700 dark:text-white"
            >
              <option disabled value="">
                Select Category
              </option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Clothing</option>
              <option>Home Appliances</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Price + Rating */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="label font-medium">Price ($)</label>
            <div className="relative">
              <FaDollarSign className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
              <input
                type="number"
                step="0.01"
                name="price"
                placeholder="e.g. 179.99"
                required
                className="input input-bordered pl-10 w-full dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Stock + Brand */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="e.g. 100"
              required
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="label font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              placeholder="e.g. Amazon"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="label font-medium">Image URL</label>
          <div className="relative">
            <FaImage className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
            <input
              type="url"
              name="image"
              placeholder="https://example.com/product.jpg"
              className="input input-bordered pl-10 w-full dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="bestSeller" />
            Best Seller
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="topRated" />
            Top Rated
          </label>
        </div>

        {/* Seller Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-medium">Seller Name</label>
            <input
              type="text"
              name="sellerName"
              value={user.displayName}
              readOnly
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="label font-medium">Seller Email</label>
            <input
              type="email"
              name="sellerEmail"
              value={user.email}
              readOnly
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="label font-medium">Seller Photo URL</label>
          <input
            type="text"
            name="sellerPhoto"
            value={user.photoURL}
            readOnly
            className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Availability + Return Policy + Discount */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="label font-medium">Availability Status</label>
            <select
              name="availabilityStatus"
              className="select select-bordered w-full dark:bg-gray-700 dark:text-white"
              defaultValue="In Stock"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div>
            <label className="label font-medium">Return Policy</label>
            <input
              type="text"
              name="returnPolicy"
              placeholder="Return within 30 days"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="label font-medium">Discount (%)</label>
            <input
              type="number"
              name="discountPercent"
              min="0"
              max="100"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
