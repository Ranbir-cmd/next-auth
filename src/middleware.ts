import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const isPublicPath = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup";
    const token = request.cookies.get("token")?.value || "";
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: [
        "/login",
        "/signup",
        "/user-profile/:path*",
    ]
}