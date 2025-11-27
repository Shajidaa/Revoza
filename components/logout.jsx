// components/LogoutButton.js - FINAL VERSION
"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      // 1. Firebase logout
      await logoutUser();

      document.cookie =
        "userLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      toast.success("Logout successfully");

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      console.error("Logout error:", error);

      window.location.href = "/";
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-ghost">
      Logout
    </button>
  );
};

export default LogoutButton;
