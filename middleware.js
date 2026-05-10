import { NextResponse } from "next/server";

/**
 * Example Middleware
 * - Automatically runs on all requests
 * - Currently just logs request path (non-blocking)
 * - Compatible with Next.js 16+
 */

export function middleware(request) {
  console.log("Middleware hit:", request.nextUrl.pathname);

  // Example: Redirect /old-path to /new-path
  if (request.nextUrl.pathname === "/old-path") {
    return NextResponse.redirect(new URL("/new-path", request.url));
  }

  // Example: Optional auth check (can customize)
  // if (!request.cookies.get("auth_token")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // Otherwise, continue
  return NextResponse.next();
}

// Optional: Match all routes (adjust if needed)
export const config = {
  matcher: "/:path*",
};