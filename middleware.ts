import { NextRequest, NextResponse } from "next/server";

const FILTERS_HOSTS = new Set(["filters.chriswiki.com", "www.filters.chriswiki.com"]);

export function middleware(request: NextRequest) {
  const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host"))?.split(":")[0].toLowerCase();

  if (host && FILTERS_HOSTS.has(host) && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/filters";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
