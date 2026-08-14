import { NextResponse } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if(!token) return NextResponse.json(
    { error: "Not Authenticated" },
    { status: 401 }
  )
  return NextResponse.next()
}
 
export const config = {
  matcher: '/api/messages/:path*',
}