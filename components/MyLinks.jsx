"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function MyLinks({ children, href }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-xl font-semibold border-b-2  transition-all duration-200 hover:border-purple-600 hover:text-purple-600
        ${isActive ? "border-purple-600 text-purple-600" : "border-transparent"}
      `}
    >
      {children}
    </Link>
  );
}
