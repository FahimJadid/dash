import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow the request if the following is true
  // 1. It's a request for next-auth session & provider fetching
  // 2. the token exists
  if (pathname.includes('/api/auth')) {
    return NextResponse.next();
  }

  if (token) {
    // Redirect authenticated users trying to access the root route to the dashboard
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // Redirect to login if the user is not authenticated and is trying to access a protected route
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/transfer') || pathname.startsWith('/transactions') || pathname.startsWith('/p2p')) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  // Allow the request if it's a public route
  return NextResponse.next();
}

// Specify the routes to protect
export const config = {
  matcher: ['/', '/dashboard/:path*', '/transfer/:path*', '/transactions/:path*', '/p2p/:path*'],
};