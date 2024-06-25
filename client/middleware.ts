import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthPath = path.startsWith("/login") || path.startsWith("/register");

  const cookie = request.headers.get("cookie") || "";

  const response = await (
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user`, {
      headers: { "Content-Type": "application/json", cookie },
    })
  ).json();

  if (!response.id) {
    if (isAuthPath) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
