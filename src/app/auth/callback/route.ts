import { NextResponse, type NextRequest } from "next/server";

// Sign-in is not open. Send old callback links to the page that says so and
// drop their query string, so sign-in codes and return paths go nowhere.
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/login", request.url));
}
