import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const authToken = cookieStore.has("deemceeAuth");

  if (request.nextUrl.pathname == "/sign-in") {
    if (authToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (!authToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!_next/static|favicon.ico|).*)",
    "/",
    "/branch/:path*",
    "/calendar/:path*",
    "/class/:path*",
    "/sign-in",
    "/structure/:path*",
    "/user-management/:path*",
  ],
};
