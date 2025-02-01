// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { decrypt } from "@/lib/session";
// import { COOKIE_SESSION_NAME } from "@/lib/constEnv";

// const protectedRoutes = ["/app/dashboard"];
// const publicRoutes = ["/app/auth", "/"];

// export default async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.includes(path);
//   const isPublicRoute = publicRoutes.includes(path);

//   const cookie = (await cookies()).get(COOKIE_SESSION_NAME)?.value;
//   const session = await decrypt(cookie);

//   if (isProtectedRoute && !session?.token) {
//     return NextResponse.redirect(new URL("/app/auth", req.nextUrl));
//   }

//   if (
//     isPublicRoute &&
//     session?.token &&
//     !req.nextUrl.pathname.startsWith("/app/dashboard")
//   ) {
//     return NextResponse.redirect(new URL("/app/dashboard", req.nextUrl));
//   }

//   return NextResponse.next();
// }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { COOKIE_SESSION_NAME } from "@/lib/constEnv";

const protectedRoutes = ["/app/dashboard", "/app/dashboard/clients"];
const publicRoutes = ["/app/auth", "/"];

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get(COOKIE_SESSION_NAME)?.value;
  const session = await decrypt(cookie);
  const userSalon = session?.activeSalon || "default_salon";
  const currentSalon = url.searchParams.get("salon");

  if (isProtectedRoute && !session?.token) {
    return NextResponse.redirect(new URL("/app/auth", req.nextUrl));
  }

  if (isPublicRoute && session?.token) {
    return NextResponse.redirect(
      new URL(`/app/dashboard?salon=${userSalon}`, req.nextUrl)
    );
  }

  if (isProtectedRoute && !currentSalon) {
    return NextResponse.redirect(
      new URL(`${path}?salon=${userSalon}`, req.nextUrl)
    );
  }

  return NextResponse.next();
}
