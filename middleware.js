import { NextResponse } from 'next/server';
import { checkToken } from './app/lib/auth';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if(!token) return NextResponse.json(
    { error: "Not Authenticated" },
    { status: 401 }
  )

  const payload = await checkToken(token)

  if(!payload){
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    )
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: '/api/messages/:path*',
}