import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18n/routing";


const intlMiddleware = createMiddleware(routing);

const PROTECTED_PATHS = ["/cart", "/checkout", "/profile"];
const AUTH_ONLY_PATHS = ["/login", "/register"];


function stripLocale(pathname: string): string {
  
  const segments = pathname.split("/");
  const possibleLocale = segments[1];

  const hasLocale = routing.locales.includes(possibleLocale as any);
  if (!hasLocale) return pathname;

  const pathWithoutLocale = "/" + segments.slice(2).join("/");
  return pathWithoutLocale || "/";
}

function isProtectedPath(cleanPath: string): boolean {
  return PROTECTED_PATHS.some((path) => cleanPath.startsWith(path));
}

function isAuthOnlyPath(cleanPath: string): boolean {
  return AUTH_ONLY_PATHS.some((path) => cleanPath.startsWith(path));
}

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

function redirectToHome(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL("/", request.url));
}


export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cleanPath = stripLocale(pathname);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET, // لازم يكون متظبط في .env
  });

  const isLoggedIn = !!token;

  // Case 1: مش مسجل دخول وعايز يدخل صفحة محمية -> نرجّعه للوجين
  if (!isLoggedIn && isProtectedPath(cleanPath)) {
    return redirectToLogin(request);
  }

  // Case 2: مسجل دخول وعايز يفتح login/register -> نرجّعه للهوم
  if (isLoggedIn && isAuthOnlyPath(cleanPath)) {
    return redirectToHome(request);
  }

  // Case 3: أي حالة تانية -> نكمّل مع next-intl عادي (ترجمة/توجيه اللغة)
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/cart",
    "/login",
    "/register",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};