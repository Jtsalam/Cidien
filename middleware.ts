import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if user has authentication cookies
  const staffId = request.cookies.get('staff_Id')?.value
  const organization = request.cookies.get('organization')?.value
  
  const isAuthenticated = staffId && organization
  
  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/staff']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  // Auth routes (sign-in, sign-up)
  const authRoutes = ['/sign-in', '/sign-up']
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  
  // If user is authenticated and tries to access auth pages, redirect to dashboard
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // If user is not authenticated and tries to access protected routes, redirect to sign-in
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - lib (public assets like logo)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|lib|centerImages).*)',
  ],
}
