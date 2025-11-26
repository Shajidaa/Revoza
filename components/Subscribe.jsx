"use client";

import React from "react";
import { BsEnvelope } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";

export default function Subscribe() {
  return (
    <div className="w-full bg-purple-600 py-10 my-10">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-10 text-white">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-5">
          <BsEnvelope size={45} className="text-white" />
          <div>
            <h2 className="font-bold text-lg">SUBSCRIBE TO OUR NEWSLETTER</h2>
            <p className="text-sm opacity-90">
              Get all the latest information on Events, Sales and Offers.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-between gap-5">
          <div>
            <h2 className="font-bold text-lg">DOWNLOAD OUR NEW APP TODAY!</h2>
            <p className="text-sm opacity-90">
              Don&apos;t miss our mobile-only offers and shop with Android Play.
            </p>
          </div>

          <button className="flex items-center gap-2 border border-white px-5 py-2 rounded-md hover:bg-white hover:text-purple-600 transition">
            Download
            <IoMdDownload size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
