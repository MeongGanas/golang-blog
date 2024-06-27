import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthPath = path.startsWith("/login") || path.startsWith("/register");

  const cookie = request.headers.get("cookie") || "";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user`,
      {
        headers: {
          "Content-Type": "application/json",
          cookie,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const user = await response.json();

    if (!user.id) {
      return isAuthPath
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/login", request.url));
    }

    return isAuthPath
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();
  } catch (error) {
    console.error("Authentication error:", error);

    return isAuthPath
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
