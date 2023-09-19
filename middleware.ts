import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  console.log("req url", req.url);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("session", session);

  // if user is signed in and the current path is / redirect the user to /dashboard
  if (session && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  // if (!session && req.nextUrl.pathname !== "/") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return res;
}

export const config = {
  matcher: ["/dashboard", "/vision", "/comp"],
};
