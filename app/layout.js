"use client";

import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <AuthProvider>
        <body
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} bg-[#faf8f9] antialiased`}
        >
          <title>Revoza</title> {/* navbar */}
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
          <ToastContainer autoClose={700}></ToastContainer>
        </body>
      </AuthProvider>
    </html>
  );
}
