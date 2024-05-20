import NextAuth from "next-auth";
import { DEFAULT_LOGIN_REDIRECT, apiRoutes, authRoutes } from "../routes";
import authConfig from "./lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isApiAuthRoute = apiRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isLogginer = !!req.auth;

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLogginer) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
