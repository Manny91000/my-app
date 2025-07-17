import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest){
    const token = await getToken({ req})
    
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")

    if (isAdminRoute && (!token || token.role !== "admin")) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
}

export const config = {
     matcher: ["/admin/:path*"]
}