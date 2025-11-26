"use client";

import {
  FaTruck,
  FaBriefcase,
  FaMoneyCheckAlt,
  FaComments,
} from "react-icons/fa";
import MyContainer from "./MyContainer";

export default function ServiceSection() {
  const services = [
    {
      icon: <FaTruck className="text-3xl text-purple-600" />,
      title: "Cancellation & Returns",
      desc: "If products not matched",
    },
    {
      icon: <FaBriefcase className="text-3xl text-purple-600" />,
      title: "Privacy Policy",
      desc: "Check before dealing",
    },
    {
      icon: <FaMoneyCheckAlt className="text-3xl text-purple-600" />,
      title: "EMI Policy",
      desc: "We provide 0% EMI facilities*",
    },
    {
      icon: <FaComments className="text-3xl text-purple-600" />,
      title: "Customer Support",
      desc: "Call us at 09613804546800",
    },
  ];

  return (
    <MyContainer className=" mt-10 p-6 bg-white shadow-md border border-purple-200 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-4 rounded-lg hover:bg-purple-50 transition cursor-pointer"
          >
            <div className="flex flex-col">
              <div>{service.icon}</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm">{service.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MyContainer>
  );
}
