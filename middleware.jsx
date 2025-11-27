// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const isLoggedIn = req.cookies.get("userLoggedIn")?.value;
  const { pathname } = req.nextUrl;

  // Protected Routes
  const protectedRoutes = ["/create", "/manageProduct", "/profile"];

  // Auth Routes (where logged-in users shouldn't go)
  const authRoutes = ["/login", "/register"];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if current path is auth route
  const isAuthRoute = authRoutes.includes(pathname);

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to home if accessing auth routes while logged in
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/create/:path*",
    "/manageProduct/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
