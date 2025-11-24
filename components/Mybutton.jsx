import Link from "next/link";
import React from "react";

export default function Mybutton({ children, className, href }) {
  return (
    <Link href={href} className={`btn btn-primary ${className}`}>
      {children}
    </Link>
  );
}
