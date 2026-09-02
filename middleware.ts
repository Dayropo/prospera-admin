import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const TOKEN_KEY = "prospera-auth-token"
const PUBLIC_PATHS = ["/login"]

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value
  const { pathname } = request.nextUrl

  const isPublic = PUBLIC_PATHS.some(path => pathname.startsWith(path))

  if (!token && !isPublic) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
