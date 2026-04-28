import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedApiPattern =
  /^\/api\/(alquiler|cliente|combustible|empleado|inspeccion|marca|modelos|tipodevehiculo|vehiculo)\/(crear|actualizar|eliminar)$/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isProtectedApiRoute = protectedApiPattern.test(pathname);

  if (!isDashboardRoute && !isProtectedApiRoute) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.JWT_SECRET,
  });

  if (token) {
    return NextResponse.next();
  }

  if (isProtectedApiRoute) {
    return NextResponse.json(
      { message: "No autorizado. Inicia sesion para continuar." },
      { status: 401 }
    );
  }

  const signInUrl = new URL("/signin", req.url);
  signInUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
