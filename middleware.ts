import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Edge runtime → use Web Crypto + base64
function makeNonce() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s); // base64
}

export function middleware(req: NextRequest) {
  const nonce = makeNonce();

  // pass nonce to server components via request headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);

  const res = NextResponse.next({ request: { headers: requestHeaders } });

  // Build CSP only for HTML routes (skip static assets)
  const { pathname } = req.nextUrl;
  const isAsset =
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    /\.(js|css|map|png|jpe?g|gif|webp|svg|ico|woff2?)$/i.test(pathname);

  if (!isAsset) {
    const csp = [
      "default-src 'self' hb.terbiumsolutions.in hdfcuat.bank.in",
      `script-src 'self' hb.terbiumsolutions.in hdfcuat.bank.in 'nonce-${nonce}' 'strict-dynamic'`,
      `script-src-elem 'self' hb.terbiumsolutions.in hdfcuat.bank.in 'nonce-${nonce}'`,
      "script-src-attr 'none'",
      `style-src 'self' 'unsafe-inline' hb.terbiumsolutions.in hdfcuat.bank.in`,
      "img-src 'self' hb.terbiumsolutions.in data:",
      "font-src 'self' hb.terbiumsolutions.in",
      "connect-src 'self' hb.terbiumsolutions.in",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; ");

    res.headers.set("Content-Security-Policy", csp);
  }

  res.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=86400, immutable'
   );

  return res;
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|fonts|images).*)',
  ],
}