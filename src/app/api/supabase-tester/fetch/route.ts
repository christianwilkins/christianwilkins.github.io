import { NextResponse } from "next/server";

const blockedHeaderNames = new Set([
  "host",
  "connection",
  "content-length",
  "accept-encoding",
  "transfer-encoding",
]);

const MAX_TIMEOUT_MS = 15000;
const MIN_TIMEOUT_MS = 1000;
const MAX_BYTES = 200000;

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

async function readWithLimit(
  stream: ReadableStream<Uint8Array> | null,
  limit: number
) {
  if (!stream) {
    return { text: "", truncated: false };
  }

  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  let truncated = false;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (!value) continue;

    total += value.length;
    if (total > limit) {
      const remaining = limit - (total - value.length);
      if (remaining > 0) {
        chunks.push(value.slice(0, remaining));
      }
      truncated = true;
      break;
    }
    chunks.push(value);
  }

  const combined = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.length;
  }

  return {
    text: new TextDecoder().decode(combined),
    truncated,
  };
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: {
    url?: string;
    headers?: Record<string, string>;
    timeoutMs?: number;
    maxBytes?: number;
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

  const timeoutMs = Math.min(
    MAX_TIMEOUT_MS,
    Math.max(MIN_TIMEOUT_MS, payload.timeoutMs ?? 8000)
  );

  const maxBytes = Math.min(MAX_BYTES, Math.max(10000, payload.maxBytes ?? MAX_BYTES));
  const headers = normalizeHeaders(payload.headers);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const start = Date.now();

  try {
    const response = await fetch(targetUrl.toString(), {
      method: "GET",
      headers,
      signal: controller.signal,
      redirect: "manual",
    });

    const { text, truncated } = await readWithLimit(response.body, maxBytes);

    clearTimeout(timeoutId);

    return NextResponse.json({
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      timeMs: Date.now() - start,
      contentType: response.headers.get("content-type"),
      contentLength: response.headers.get("content-length"),
      contentRange: response.headers.get("content-range"),
      truncated,
      text,
    });
  } catch (error) {
    clearTimeout(timeoutId);

    const message = error instanceof Error ? error.message : "Request failed";

    return NextResponse.json({ ok: false, error: message, timeMs: Date.now() - start });
  }
}
