import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminSecretFromEnv,
  verifySessionTokenEdge,
} from "@/lib/admin/session-edge";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function applySecurityHeaders(response: NextResponse) {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const isLogin = pathname === "/admin/login";
    const secret = getAdminSecretFromEnv({
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    });
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const authenticated = await verifySessionTokenEdge(token, secret);

    if (isLogin) {
      if (authenticated) {
        return applySecurityHeaders(
          NextResponse.redirect(new URL("/admin/leads", request.url)),
        );
      }
      return applySecurityHeaders(NextResponse.next());
    }

    if (!secret) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("error", "not_configured");
      return applySecurityHeaders(NextResponse.redirect(loginUrl));
    }

    if (!authenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return applySecurityHeaders(NextResponse.redirect(loginUrl));
    }
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|brand/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
