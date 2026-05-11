import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPhoneUserAgent } from "@/lib/isPhoneUserAgent";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isMobileAppRoute = pathname === "/mobile" || pathname.startsWith("/mobile/");
  if (isMobileAppRoute) {
    const ua = request.headers.get("user-agent");
    if (!isPhoneUserAgent(ua)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  const staffId = request.cookies.get("staff_Id")?.value;
  const organization = request.cookies.get("organization")?.value;
  const isAuthenticated = Boolean(staffId && organization);
  const protectedRoutes = ["/dashboard", "/staff"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|lib|centerImages).*)"],
};
