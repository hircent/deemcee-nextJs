import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();

  if (!cookieStore.has("deemceeAuth")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!_next/static|favicon.ico|sign-in|).*)",
    "/my-banks/:path*",
    "/transaction-history/:path*",
    "/payment-transfer/:path*",
    "/",
  ],
};
