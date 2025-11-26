import { NextResponse } from "next/server";

export function middleware(req) {
  const isLoggedIn = req.cookies.get("userLoggedIn")?.value;
  const url = req.nextUrl.pathname;

  // Protected Routes
  const protectedRoutes = ["/create", "/manageProduct", "/profile"];

  if (protectedRoutes.some((route) => url.startsWith(route))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create/:path*", "/dashboard/:path*", "/profile/:path*"],
};
