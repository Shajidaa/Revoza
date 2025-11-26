"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductFilter({ allProducts }) {
  const [products, setProducts] = useState(allProducts);
  const [message, setMessage] = useState(""); // NEW

  const handleSearch = async (e) => {
    const value = e.target.value.trim();

    if (!value) {
      setProducts(allProducts);
      setMessage("");
      return;
    }

    const res = await fetch(`http://localhost:5000/search?name=${value}`, {
      cache: "no-store",
    });
    const data = await res.json();

    setProducts(data);

    if (data.length === 0) {
      setMessage(`"${value}" Not found.`);
    } else {
      setMessage("");
    }
  };

  const handleCategory = async (e) => {
    const value = e.target.value;

    if (!value) {
      setProducts(allProducts);

      return;
    }

    const res = await fetch(
      `http://localhost:5000/category?category=${value}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    setProducts(data);
  };

  return (
    <>
      <div className="py-10  flex justify-end gap-2">
        {/* Search */}
        <label className="input">
          <input
            type="search"
            className="grow"
            placeholder="Search"
            onChange={handleSearch}
          />
        </label>

        {/* Category */}
        <select className="select select-bordered" onChange={handleCategory}>
          <option value="">All Category</option>
          <option>Electronics</option>
          <option>Books</option>
          <option>Clothing</option>
          <option>Home Appliances</option>
          <option>Other</option>
        </select>
      </div>

      {/* No Product Message */}
      {message && (
        <div className="min-h-dvh">
          <p className="text-center text-red-500 font-semibold my-4">
            {message}
          </p>
        </div>
      )}

      {/* PRODUCT LIST */}
      <div className="grid  gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 &&
          products.map((p) => <ProductCard key={p._id} singleProduct={p} />)}
      </div>
    </>
  );
}
