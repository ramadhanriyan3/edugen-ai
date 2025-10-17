import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|txt|xml|json)$/)
  ) {
    return NextResponse.next();
  }

  const publicPaths = ["/", "/sign-in"];

  if (!req.auth && !publicPaths.includes(pathname)) {
    const signInUrl = new URL("/sign-in", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (req.auth && pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/e", req.nextUrl.origin));
  }

  return NextResponse.next();
});
