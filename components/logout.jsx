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

      // 2. Clear cookies (just these 2 lines)
      document.cookie =
        "userLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      // 3. Redirect
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      // Error holeo redirect korbe
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
