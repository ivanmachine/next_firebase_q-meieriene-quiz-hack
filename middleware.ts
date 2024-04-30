import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./lib/auth/getSession";
import { User } from "./lib/auth/types";

const restrictedPaths = ["/train", "/hack"];

export async function middleware(request: NextRequest) {
  const path: string = request.nextUrl.pathname;
  if (!restrictedPaths.includes(path)) {
    return NextResponse.next();
  }
  try {
    const user: User | null = await getSession();
    if (user && user.login) return NextResponse.next(); // Authenticated user get's the response
    return NextResponse.redirect(new URL("/login", request.url));
  } catch (e) {
    // JSON parsing most likely failed becuase the cookie was bad -> resetting cookie
    console.error("Error getting auth state: ", e);
    const response = NextResponse.redirect(new URL("/500", request.url));
    console.warn("Resetting cookie");
    response.cookies.set("auth_session", "", { expires: new Date(0) });
    return response;
  }
}

export const config = {
  matcher: "/:path*",
};
