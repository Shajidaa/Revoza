"use client";

import { signOut } from "firebase/auth";

export default function LogoutButton() {
  return <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>;
}
