"use client";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { MdEmail, MdHistory } from "react-icons/md";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user products from backend
  useEffect(() => {
    if (!user?.email) return;

    const loadProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/add-product?email=${user.email}`,
          { credentials: "include" }
        );
        const data = await res.json();
        setCartItems(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    loadProducts();
  }, [user?.email]);
  // console.log(cartItems);

  return (
    <div className="min-h-screen bg-purple-50 py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-lg">
        {/* User Info */}
        <div className="flex items-center gap-6 border-b pb-6 mb-8">
          <FaUserCircle className="text-7xl text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {user?.displayName}
            </h1>
            <p className="flex items-center gap-2 text-gray-600 text-lg">
              <MdEmail className="text-purple-600" />
              {user?.email}
            </p>
          </div>
        </div>

        {/* Cart Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaShoppingCart className="text-purple-600" />
          Your Cart
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading your products...</p>
        ) : cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 bg-purple-100 rounded-xl p-4 shadow hover:shadow-md transition"
              >
                <Image
                  width={40}
                  height={40}
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-purple-700 font-bold">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
