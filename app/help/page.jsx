import React from "react";

import { MdManageAccounts } from "react-icons/md";
import { SiTeamspeak } from "react-icons/si";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { VscGoToEditingSession } from "react-icons/vsc";
export default function page() {
  return (
    <div className="min-h-screen transition duration-500">
      <div className="bg-purple-100 py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          How can we help with your shopping?
        </h1>
        <div className="max-w-xl mx-auto flex justify-center">
          <input
            type="text"
            placeholder="Search help topics..."
            className="w-full px-5 py-3 rounded-2xl border border-purple-300 bg-white text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <p className="mt-3 text-sm text-gray-600 ">
          Popular topics:{" "}
          <span className="text-purple-600 ">
            order tracking, returns, payment issues, account login
          </span>
        </p>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Manage Your Account",
            desc: "Update your profile, password, or personal details.",
            icon: <MdManageAccounts />,
            link: "/help/account",
          },
          {
            title: "Orders & Payments",
            desc: "Track orders, view invoices, and fix payment issues.",
            icon: "💳",
            link: "/help/orders",
          },
          {
            title: "Customer Support",
            desc: "Get help with issues, refunds, and product inquiries.",
            icon: <SiTeamspeak />,
            link: "/help/support",
          },
          {
            title: "Downloads & Receipts",
            desc: "Download your order receipts and purchase history.",
            icon: <FaCloudDownloadAlt />,
            link: "/help/downloads",
          },
          {
            title: "Customize Experience",
            desc: "Adjust notifications, themes, and display settings.",
            icon: <VscGoToEditingSession />,
            link: "/help/customize",
          },
          {
            title: "Troubleshooting",
            desc: "Quick solutions for common shopping problems.",
            icon: "💡",
            link: "/help/troubleshooting",
          },
        ].map((item, index) => (
          <a
            href={item.link}
            key={index}
            className="p-6 bg-gray-50 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-purple-400"
          >
            <div className="text-4xl text-purple-600 ">{item.icon}</div>
            <h3 className="text-lg font-bold text-gray-800 mt-3">
              {item.title}
            </h3>
            <p className="text-gray-600 mt-1">{item.desc}</p>
          </a>
        ))}
      </div>

      <div className="text-center py-8 text-sm text-gray-500 ">
        Need quick help?{" "}
        <a
          href="/support"
          className="text-purple-600 cursor-pointer hover:underline"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
