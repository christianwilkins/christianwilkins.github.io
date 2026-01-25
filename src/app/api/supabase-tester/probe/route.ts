import { NextResponse } from "next/server";

const allowedMethods = new Set(["GET", "HEAD", "OPTIONS"]);
const blockedHeaderNames = new Set([
  "host",
  "connection",
  "content-length",
  "accept-encoding",
  "transfer-encoding",
]);

const MAX_TIMEOUT_MS = 15000;
const MIN_TIMEOUT_MS = 1000;

function isPrivateHost(hostname: string) {
  const value = hostname.toLowerCase();

  if (value === "localhost" || value.endsWith(".local")) {
    return true;
  }

  if (
    value === "::1" ||
    value.startsWith("fe80:") ||
    value.startsWith("fc") ||
    value.startsWith("fd")
  ) {
    return true;
  }

  if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(value)) {
    return false;
  }

  const parts = value.split(".").map((part) => Number(part));
  if (parts.some((part) => Number.isNaN(part) || part < 0 || part > 255)) {
    return true;
  }

  const [a, b] = parts;

  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;

  return false;
}

function normalizeHeaders(input: unknown) {
  const headers = new Headers();

  if (!input || typeof input !== "object") {
    return headers;
  }

  for (const [rawKey, rawValue] of Object.entries(input)) {
    if (typeof rawValue !== "string") {
      continue;
    }

    const key = rawKey.toLowerCase();
    if (blockedHeaderNames.has(key)) {
      continue;
    }

    headers.set(rawKey, rawValue);
  }

  return headers;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: {
    url?: string;
    method?: string;
    headers?: Record<string, string>;
    timeoutMs?: number;
  } | null = null;

  try {
    payload = await request.json();
  } catch {
    payload = null;
  }

  if (!payload?.url || typeof payload.url !== "string") {
    return NextResponse.json({ ok: false, error: "Missing url" }, { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(payload.url);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid url" }, { status: 400 });
  }

  if (!targetUrl.protocol.startsWith("http")) {
    return NextResponse.json(
      { ok: false, error: "Only http or https is supported" },
      { status: 400 }
    );
  }

  if (isPrivateHost(targetUrl.hostname)) {
    return NextResponse.json(
      { ok: false, error: "Private hosts are blocked" },
      { status: 400 }
    );
  }

  const method = allowedMethods.has(payload.method ?? "")
    ? (payload.method as string)
    : "GET";

  const timeoutMs = Math.min(
    MAX_TIMEOUT_MS,
    Math.max(MIN_TIMEOUT_MS, payload.timeoutMs ?? 8000)
  );

  const headers = normalizeHeaders(payload.headers);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const start = Date.now();

  try {
    const response = await fetch(targetUrl.toString(), {
      method,
      headers,
      signal: controller.signal,
      redirect: "manual",
    });

    clearTimeout(timeoutId);

    return NextResponse.json({
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      timeMs: Date.now() - start,
      redirected: response.redirected,
      location: response.headers.get("location"),
      contentType: response.headers.get("content-type"),
      contentLength: response.headers.get("content-length"),
      server: response.headers.get("server"),
      accessControlAllowOrigin: response.headers.get(
        "access-control-allow-origin"
      ),
      accessControlAllowMethods: response.headers.get(
        "access-control-allow-methods"
      ),
      accessControlAllowHeaders: response.headers.get(
        "access-control-allow-headers"
      ),
    });
  } catch (error) {
    clearTimeout(timeoutId);

    const message = error instanceof Error ? error.message : "Request failed";

    return NextResponse.json({
      ok: false,
      error: message,
      timeMs: Date.now() - start,
    });
  }
}
