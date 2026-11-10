import { COMMUNITY_ENABLED } from "@/lib/catalog-mode";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  if (!COMMUNITY_ENABLED) {
    const pathname = request.nextUrl.pathname;
    const communityRoute = ["/submit", "/profile", "/auth/callback"].some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );
    // Drop callback codes and return paths instead of forwarding them.
    return communityRoute
      ? NextResponse.redirect(new URL("/login", request.url))
      : NextResponse.next();
  }

  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — this updates the cookie if the token was refreshed
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes: redirect to login if not authenticated
  const protectedPaths = ["/submit", "/profile"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users away from login page
  if (request.nextUrl.pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

// Only the account routes need the proxy. A catch-all matcher ran it on every
// page and image request just to let them through. When community features
// launch and pages render per-user content, widen this again so sessions
// refresh on every route.
export const config = {
  matcher: ["/submit/:path*", "/profile/:path*", "/auth/callback", "/login"],
};
