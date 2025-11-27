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

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/add-product?email=${user.email}`).then((data) => {
        setProducts(data.data);
      });
    }
  }, [axiosSecure, user]);

  console.log(products);

  // const handleRemove = async (_id) => {
  //   try {
  //     const result = await Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, delete it!",
  //     });

  //     if (result.isConfirmed) {
  //       const response = await axiosSecure.delete(`/my-product/${_id}`);

  //       if (response.status === 200 || response.data.deletedCount > 0) {
  //         Swal.fire("Deleted!", "Your product has been deleted.", "success");

  //         setProducts((prevProducts) =>
  //           prevProducts.filter((product) => product._id !== _id)
  //         );
  //       } else {
  //         Swal.fire(
  //           "Failed!",
  //           "The product could not be deleted on the server.",
  //           "error"
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire("Error!", "Something went wrong while deleting.", "error");
  //   }
  // };

  const handleRemove = async (id) => {
    try {
      const token = await user.getIdToken();
      // console.log("TOKEN EMAIL:", user.email);

      const res = axios.delete(
        `http://localhost:5000/user-product-delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Deleted:", res.data);
      toast.success("Product deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-dvh">
      <h1 className="text-3xl font-bold text-center my-5 text-black">
        My Products
      </h1>

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

                <td className="font-medium text-purple-700">{product.title}</td>
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
    </div>
  );
}
