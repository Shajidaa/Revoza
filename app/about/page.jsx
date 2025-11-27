import React from "react";
import { FaHandshake, FaStore, FaUsers } from "react-icons/fa";

export default function page() {
  return (
    <div className="min-h-screen bg-purple-50 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Welcome to our e-commerce platform! We are dedicated to delivering the
          best online shopping experience with high‑quality products, secure
          payments, and fast delivery.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300">
          <FaUsers className="text-5xl text-purple-600 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mt-4 text-center">
            Who We Are
          </h3>
          <p className="text-gray-600 mt-2 text-center">
            A passionate team committed to bringing the best shopping experience
            to customers worldwide.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300">
          <FaStore className="text-5xl text-purple-600 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mt-4 text-center">
            What We Do
          </h3>
          <p className="text-gray-600 mt-2 text-center">
            We offer a diverse selection of products, reliable service, and a
            seamless online shopping journey.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300">
          <FaHandshake className="text-5xl text-purple-600 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mt-4 text-center">
            Our Promise
          </h3>
          <p className="text-gray-600 mt-2 text-center">
            Quality, honesty, and customer satisfaction. We aim to earn your
            trust with every order.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Mission</h2>
        <p className="text-gray-600 text-lg">
          To make online shopping easier, safer, and more enjoyable for
          everyone, everywhere.
        </p>
      </div>
    </div>
  );
}
