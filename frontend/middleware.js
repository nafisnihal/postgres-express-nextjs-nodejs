import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const protectedPaths = ["/"];
  const isProtected = protectedPaths.includes(request.nextUrl.pathname);

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Add more paths if needed
};
