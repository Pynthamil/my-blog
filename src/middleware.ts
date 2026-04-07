import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiRatelimit } from "./lib/supabase-ratelimit";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

  // 1. Rate Limiting for API routes
  if (pathname.startsWith("/api")) {
    try {
      const { success } = await apiRatelimit.limit(ip);
      if (!success) {
        return new NextResponse(
          JSON.stringify({ error: "Too many requests. Slow down, friend!" }),
          { status: 429, headers: { "content-type": "application/json" } }
        );
      }
    } catch (e) {
      // Fallback if Supabase is down
      console.error("Middleware Ratelimit Error:", e);
    }
  }

  // 2. Security Headers
  const response = NextResponse.next();
  
  // Prevent framing (Clickjacking protection)
  response.headers.set("X-Frame-Options", "DENY");
  
  // Prevent MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");
  
  // Referrer policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // Permissions Policy (Camera/Mic off by default)
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );

  return response;
}

// Ensure middleware runs for all routes except static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
