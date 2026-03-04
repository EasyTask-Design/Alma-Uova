
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

// Defines the path to data.json within the 'public' directory, making it accessible for Vercel deployment.
const dataFilePath = path.join(process.cwd(), 'public', 'data', 'data.json');

/**
 * Handles GET requests to fetch data from data.json.
 * Reads the file from the public directory and returns its content as JSON.
 * This approach is compatible with Vercel's serverless environment.
 */
export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API GET Error: Failed to read or parse data.json.', error);
    // Returns a 500 error if the file cannot be read or is invalid JSON.
    return new NextResponse('Internal Server Error: Could not load data.', { status: 500 });
  }
}

/**
 * Handles POST requests to save data is not supported.
 * Vercel's serverless functions have a read-only filesystem. Saving data requires a database.
 * This function is retained to prevent errors if the frontend attempts a POST, clearly indicating the feature is disabled.
 */
export async function POST(request: Request) {
  // Immediately returns a 405 Method Not Allowed error, as this operation is not supported.
  return new NextResponse('Method Not Allowed: Saving data is disabled on this server.', {
    status: 405,
    headers: {
      'Allow': 'GET',
    },
  });
}
