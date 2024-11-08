import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Allow all requests to proceed
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/app/dashboard/:path*',
    '/login'
  ]
}