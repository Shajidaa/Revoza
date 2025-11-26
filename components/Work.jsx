"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Truck, PhoneCall, Timer } from "lucide-react";

export default function Work() {
  const steps = [
    {
      id: "01",
      title: "Browse & Order",
      desc: "Explore our wide range of cosmetics and beauty products. Add items to your cart and place your order.",
      icon: <CheckCircle className="w-10 h-10 text-purple-600" />,
    },
    {
      id: "02",
      title: "Order Confirmation",
      desc: "Once you place an order, we will confirm it through a message on your preferred platform.",
      icon: <PhoneCall className="w-10 h-10 text-purple-600" />,
    },
    {
      id: "03",
      title: "Cash on Delivery",
      desc: "Enjoy easy cash on delivery via our trusted courier partners.",
      icon: <Truck className="w-10 h-10 text-purple-600" />,
    },
    {
      id: "04",
      title: "Fast Delivery",
      desc: "Expect prompt delivery with products in perfect condition.",
      icon: <Timer className="w-10 h-10 text-purple-600" />,
    },
  ];

  return (
    <div className="py-20 bg-purple-50 text-gray-800">
      <h1 className="text-center text-4xl font-bold text-black mb-3 tracking-wide">
        HOW WE WORK
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
        At ReVoza, we make shopping for your favorite beauty products easy and
        convenient.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-purple-100"
          >
            <div className="flex items-center gap-4 mb-4">
              {step.icon}
              <span className="text-3xl font-extrabold text-purple-300">
                {step.id}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-purple-700 mb-2">
              {step.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
