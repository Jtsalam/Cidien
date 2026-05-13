import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPhoneUserAgent } from "@/lib/isPhoneUserAgent";
import { IS_PHONE_COOKIE } from "@/lib/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Detect once per request so the same verdict gates /mobile routing AND the
  // is-phone cookie we expose to client components. Keeps server + client in lockstep.
  const ua = request.headers.get("user-agent");
  const isPhone = isPhoneUserAgent(ua);

  const isMobileAppRoute = pathname === "/mobile" || pathname.startsWith("/mobile/");
  if (isMobileAppRoute && !isPhone) {
    return NextResponse.redirect(new URL("/", request.url));
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

  const response = NextResponse.next();
  // Not httpOnly — the QR step (client component) needs to read this to decide
  // whether to render the desktop QR or the "switch to desktop" card.
  response.cookies.set(IS_PHONE_COOKIE, isPhone ? "1" : "0", {
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|lib|centerImages).*)"],
};
