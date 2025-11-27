"use client";

import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import Swal from "sweetalert2";
import { AuthContext } from "@/context/AuthProvider";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

export default function ManageProduct() {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch products function to reuse
  const fetchProducts = () => {
    if (user?.email) {
      axiosSecure.get(`/add-product?email=${user.email}`).then((data) => {
        setProducts(data.data || []); // Ensure it's always an array
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [axiosSecure, user]);

  // console.log(products);

  const handleRemove = async (id) => {
    try {
      // console.log("Deleting product:", id);
      const token = await user.getIdToken();

      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) {
        return;
      }

      // Optimistically update UI first
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );

      // Then make the API call
      const res = await axios.delete(`http://127.0.0.1:5000/my-product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("✅ Delete successful:", res.data);
      toast.success(res.data.message || "Product deleted successfully");
    } catch (error) {
      console.error("Delete error:", error.response?.data);

      // Revert optimistic update on error by refreshing data
      fetchProducts();

      if (error.response?.status !== 200) {
        const errorMessage =
          error.response?.data?.message || "Failed to delete product";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-dvh">
      <h1 className="text-3xl font-bold text-center my-5 text-black">
        My Products({products?.length || 0}) {/* Safe access to length */}
      </h1>

      {!products || products.length === 0 ? ( // Safe check
        <p className="font-medium text-2xl text-purple-700 text-center">
          No Product added
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-purple-200">
          <table className="table w-full">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th>SL No</th>
                <th>Image</th>
                <th>Title</th>
                <th>Seller Email</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className="hover:bg-purple-50 transition-all"
                >
                  <td>{index + 1}</td>

                  <td>
                    <Image
                      src={product.image}
                      width={40}
                      height={40}
                      alt={product.title}
                      className="rounded-md border border-purple-200"
                    />
                  </td>

                  <td className="font-medium text-purple-700">
                    {product.title}
                  </td>
                  <td>{product.sellerEmail}</td>

                  <td className="font-semibold text-purple-600">
                    ৳{product.price}
                  </td>

                  <td>
                    <Link
                      href={`/products/${product._id}`}
                      className="btn btn-xs bg-green-600 text-white hover:bg-green-700 gap-2 rounded-md"
                    >
                      <FaMagnifyingGlass />
                    </Link>
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="btn btn-xs bg-red-600 text-white hover:bg-red-700 rounded-md"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
