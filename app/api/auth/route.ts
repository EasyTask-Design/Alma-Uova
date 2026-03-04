
import { NextResponse } from 'next/server';

/**
 * API route to handle authentication challenges.
 * This is triggered by the middleware on failed or missing authentication.
 * It returns a 401 Unauthorized response, prompting the browser's native
 * basic authentication dialog.
 */
export async function GET() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
