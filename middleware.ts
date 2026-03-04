
import { NextRequest, NextResponse } from 'next/server';

// Define the username and password in environment variables for security.
// Fallback to defaults if they are not set.
const USERNAME = process.env.BASIC_AUTH_USER || 'admin';
const PASSWORD = process.env.BASIC_AUTH_PASSWORD || 'Mille.1000';

export function middleware(req: NextRequest) {
  // Allow Vercel's preview deployments to bypass auth.
  if (process.env.VERCEL_ENV === 'preview') {
    return NextResponse.next();
  }

  // Allow requests for static files and Next.js specific assets to pass through.
  if (req.nextUrl.pathname.startsWith('/_next') || req.nextUrl.pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === USERNAME && pwd === PASSWORD) {
      return NextResponse.next();
    }
  }

  const url = req.nextUrl;
  url.pathname = '/api/auth'; // Redirect to a simple API route for the 401 response.

  // On failed authentication, rewrite to an API route that will trigger the browser's auth dialog.
  return NextResponse.rewrite(url);
}

// Ensure the middleware runs on all pages.
export const config = {
  matcher: '/:path*',
};
