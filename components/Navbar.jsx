"use client";

import React, { useContext, useState } from "react";
import MyContainer from "./MyContainer";
import Logo from "@/components/Logo";
import MyLinks from "./MyLinks";

import { AuthContext } from "@/context/AuthProvider";
import Link from "next/link";
import Image from "next/image";
import { BiLogIn } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";
import { toast } from "react-toastify";
import LogoutButton from "@/components/Logout";
import { PiSignInFill } from "react-icons/pi";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <MyLinks href="/">Home</MyLinks>
      </li>
      <li>
        <MyLinks href="/products">Products</MyLinks>
      </li>
      <li>
        <MyLinks href="/about">About</MyLinks>
      </li>
      <li>
        <MyLinks href="/help">Help</MyLinks>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#E9D5EB] sticky z-1000 top-0 shadow-sm">
      <MyContainer className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold text-gray-500 ">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="flex gap-6">{links}</ul>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center">
          {user ? (
            <>
              {/* Profile Button */}
              <div className="dropdown dropdown-bottom dropdown-end">
                <div
                  tabIndex={0}
                  className="btn btn-ghost rounded-full w-12 h-12 p-0 border-2 border-[#021247] tooltip tooltip-bottom"
                  data-tip={user.displayName}
                >
                  <Image
                    src={user.photoURL}
                    alt={user.displayName}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Dropdown Menu */}
                <ul
                  tabIndex={-1}
                  className="menu dropdown-content bg-base-200 rounded-box z-50 mt-2 w-52 p-2 shadow-sm"
                >
                  <li>
                    <Link href="/create">Add Product</Link>
                  </li>
                  <li>
                    <Link href="/manageProduct">Manage Products</Link>
                  </li>
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li>
                    <LogoutButton></LogoutButton>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="btn gradientBtn text-sm btn-sm md:btn-md flex items-center"
              >
                <BiLogIn /> Login
              </Link>

              <Link
                href="/register"
                className="btn gradientBtn  text-sm text-white btn-sm md:btn-md"
              >
                <PiSignInFill /> Register
              </Link>
            </div>
          )}
        </div>
        {/* Bottom Navigation (Mobile Only) */}
        <div className="shadow-sm bg-base-100/30 backdrop-blur-md md:hidden fixed bottom-0 left-0 w-full z-50">
          <ul className="flex justify-center gap-6 py-2">{links}</ul>
        </div>
      </MyContainer>
    </div>
  );
}
