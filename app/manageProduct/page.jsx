"use client";

import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import Swal from "sweetalert2";
import { AuthContext } from "@/context/AuthProvider";

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

  const handleRemove = async (_id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await axiosSecure.delete(`/my-product/${_id}`);

        if (response.status === 200 || response.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your product has been deleted.", "success");

          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== _id)
          );
        } else {
          Swal.fire(
            "Failed!",
            "The product could not be deleted on the server.",
            "error"
          );
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong while deleting.", "error");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-dvh">
      <h1 className="text-3xl font-bold text-center my-5">My Products</h1>

      <table className="table w-full">
        <thead>
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
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>
                <Image
                  src={product.image}
                  width={40}
                  height={40}
                  alt={product.title}
                />
              </td>
              <td>{product.title}</td>
              <td>{product.sellerEmail}</td>
              <td>৳{product.price}</td>
              <td>
                <button
                  onClick={() => handleRemove(product._id)}
                  className="btn btn-xs btn-error"
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
