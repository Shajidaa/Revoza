import Link from "next/link";
import React from "react";

export default function MyLinks({ children, href }) {
  return <Link href={href}>{children}</Link>;
}
