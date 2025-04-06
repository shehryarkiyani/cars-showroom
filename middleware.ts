import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
const publicPaths = ["/login", "/signup", "verifyEmail"];
export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  console.log("token", currentPath);
  if (publicPaths.includes(currentPath) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!publicPaths.includes(currentPath) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
