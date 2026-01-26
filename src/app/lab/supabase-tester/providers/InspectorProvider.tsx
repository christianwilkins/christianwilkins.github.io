"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type TargetKind = "http" | "wss";

export type Target = {
  url: string;
  kind: TargetKind;
  source: "raw" | "derived";
  host: string;
  notes: string[];
};

export type ProbeResult = {
  ok: boolean;
  status?: number;
  statusText?: string;
  timeMs?: number;
  error?: string;
  contentType?: string | null;
  contentLength?: string | null;
  location?: string | null;
  accessControlAllowOrigin?: string | null;
  accessControlAllowMethods?: string | null;
  accessControlAllowHeaders?: string | null;
};

export type WsResult = {
  state: "idle" | "connecting" | "open" | "closed" | "error" | "timeout";
  timeMs?: number;
  code?: number;
  reason?: string;
};

export type ReportSummary = {
  createdAt: string;
  httpTotal: number;
  httpOk: number;
  httpError: number;
  statusCounts: Array<{ status: number; count: number }>;
  wsTotal: number;
  wsOpen: number;
  wsError: number;
  wsTimeout: number;
  wsClosed: number;
  authMode: string;
  signals: string[];
};

export type IssueSeverity = "high" | "medium" | "low" | "info";

export type IssueItem = {
  id: string;
  title: string;
  detail?: string;
  severity: IssueSeverity;
  source: "tests" | "inspection" | "input";
};

export type FetchResult = {
  ok: boolean;
  status?: number;
  statusText?: string;
  timeMs?: number;
  contentType?: string | null;
  contentLength?: string | null;
  contentRange?: string | null;
  truncated?: boolean;
  text?: string;
  error?: string;
};

export type TableAudit = {
  name: string;
  host: string;
  table: string;
  anonStatus?: number;
  anonRows?: number;
  anonSample?: Record<string, unknown> | null;
  serviceStatus?: number;
  serviceRows?: number;
  serviceSample?: Record<string, unknown> | null;
};

export type EndpointCheck = {
  name: string;
  url: string;
  status?: number;
  ok?: boolean;
  error?: string;
};

export type DeepReport = {
  createdAt: string;
  hosts: string[];
  tableEntries: TableEntry[];
  tables: TableAudit[];
  endpointChecks: EndpointCheck[];
  signals: string[];
  warnings: string[];
  vectorResults: VectorResult[];
  bucketSummaries: BucketSummary[];
  corsSummaries: CorsSummary[];
  tableSchemas: Record<string, Record<string, string>>;
};

export type VectorStatus = "pass" | "risk" | "info" | "manual" | "unknown";

export type VectorResult = {
  id: string;
  component: string;
  title: string;
  status: VectorStatus;
  notes?: string;
};

export type VectorCatalogItem = {
  id: string;
  component: string;
  title: string;
  summary: string;
  mode: "auto" | "manual";
};

export type WriteResult = {
  mode: "anon" | "auth" | "service";
  ok?: boolean;
  status?: number;
  error?: string;
  response?: unknown;
  cleanupStatus?: number;
  cleanupError?: string;
};

export type BucketSummary = {
  name: string;
  isPublic: boolean;
};

export type CorsSummary = {
  url: string;
  allowOrigin?: string | null;
  allowMethods?: string | null;
  allowHeaders?: string | null;
};

export type TableEntry = {
  host: string;
  table: string;
};

const SUPABASE_PATHS = [
  "/rest/v1/",
  "/auth/v1/",
  "/storage/v1/",
  "/functions/v1/",
  "/realtime/v1/",
];

export const VECTOR_CATALOG: VectorCatalogItem[] = [
  {
    id: "auth_mfa",
    component: "Authentication",
    title: "MFA and token handling",
    summary:
      "Review token lifetimes and ensure sensitive routes require aal2 after MFA.",
    mode: "manual",
  },
  {
    id: "auth_magic_link",
    component: "Authentication",
    title: "Email link poisoning",
    summary:
      "Confirm redirect urls are allowlisted and email links do not trust forwarded host headers.",
    mode: "manual",
  },
  {
    id: "auth_redirect_allowlist",
    component: "Authentication",
    title: "Redirect url allowlist",
    summary:
      "Verify redirect urls and site url are set for production domains.",
    mode: "manual",
  },
  {
    id: "auth_signup",
    component: "Authentication",
    title: "Public signup exposure",
    summary:
      "Check if signup is disabled or guarded for production projects.",
    mode: "manual",
  },
  {
    id: "auth_captcha",
    component: "Authentication",
    title: "Bot protection",
    summary:
      "Verify CAPTCHA is enabled for sign up and recovery flows when needed.",
    mode: "manual",
  },
  {
    id: "postgrest_openapi",
    component: "PostgREST and RPC",
    title: "Schema enumeration via OpenAPI",
    summary:
      "Detect if the REST schema is visible without auth and list exposed tables.",
    mode: "auto",
  },
  {
    id: "data_api_scope",
    component: "PostgREST and RPC",
    title: "Data API schema scope",
    summary:
      "Ensure only intended schemas are exposed or disable the Data API.",
    mode: "manual",
  },
  {
    id: "rls_missing",
    component: "Row level security",
    title: "Missing or permissive policies",
    summary:
      "Compare anon data access against service role access to spot leaks.",
    mode: "auto",
  },
  {
    id: "column_level",
    component: "Row level security",
    title: "Column access controls",
    summary:
      "Use column privileges for sensitive fields where row policies are not enough.",
    mode: "manual",
  },
  {
    id: "rls_search_path",
    component: "Row level security",
    title: "Search path and helper bypass",
    summary:
      "Audit policies and security definer functions for search path issues.",
    mode: "manual",
  },
  {
    id: "rpc_public",
    component: "Functions and RPC",
    title: "Exposed helpers and injection",
    summary:
      "Review public RPC functions and ensure inputs are validated.",
    mode: "manual",
  },
  {
    id: "extensions_ssrf",
    component: "Extensions",
    title: "SSRF via network extensions",
    summary:
      "Verify http or pg net extensions are restricted to trusted roles.",
    mode: "manual",
  },
  {
    id: "vault_secrets",
    component: "Vault and secrets",
    title: "Secret exfiltration",
    summary:
      "Ensure vault access is limited and secrets are not exposed to anon.",
    mode: "manual",
  },
  {
    id: "edge_functions",
    component: "Edge functions",
    title: "Auth and CORS misconfigs",
    summary:
      "Check if functions enforce auth and do not allow broad CORS origins.",
    mode: "auto",
  },
  {
    id: "storage_public",
    component: "Storage",
    title: "Cross tenant leaks",
    summary:
      "Detect public buckets and review object access patterns.",
    mode: "auto",
  },
  {
    id: "storage_ownership",
    component: "Storage",
    title: "Ownership and signed url scope",
    summary:
      "Confirm storage policies enforce owner access and signed urls expire.",
    mode: "manual",
  },
  {
    id: "realtime_prompt",
    component: "Realtime and MCP",
    title: "Prompt injection and data leaks",
    summary:
      "Review stored prompts and tool use to avoid data leakage in agents.",
    mode: "manual",
  },
  {
    id: "platform_ddos",
    component: "Platform wide",
    title: "DDoS and brute force",
    summary:
      "Verify rate limits, spend caps, and abuse monitoring.",
    mode: "manual",
  },
  {
    id: "api_rate_limits",
    component: "Platform wide",
    title: "Rate limits and custom request rules",
    summary:
      "Check for throttling or custom checks to prevent abuse beyond RLS.",
    mode: "manual",
  },
  {
    id: "service_role_exposure",
    component: "Platform wide",
    title: "Service role key exposure",
    summary:
      "Confirm service role keys are never used in client apps or logs.",
    mode: "auto",
  },
  {
    id: "cors_open",
    component: "Platform wide",
    title: "CORS allows any origin",
    summary:
      "Detect broad Access Control Allow Origin on auth and REST endpoints.",
    mode: "auto",
  },
];

function cleanUrl(raw: string) {
  let value = raw.trim();
  while (
    value.endsWith(")") ||
    value.endsWith("]") ||
    value.endsWith(",") ||
    value.endsWith(".")
  ) {
    value = value.slice(0, -1);
  }
  return value;
}

function extractUrls(input: string) {
  const matches =
    input.match(/(https?:\/\/[^\s"']+|wss?:\/\/[^\s"']+)/g) ?? [];
  const unique = new Set<string>();

  for (const match of matches) {
    const value = cleanUrl(match);
    if (value.length > 7) {
      unique.add(value);
    }
  }

  return Array.from(unique);
}

function extractHosts(input: string) {
  const tokens = input
    .split(/[\s,]+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const hosts = new Set<string>();

  for (const token of tokens) {
    try {
      const url = token.includes("://")
        ? new URL(token)
        : new URL(`https://${token}`);
      if (url.hostname) {
        hosts.add(url.hostname);
      }
    } catch {
      continue;
    }
  }

  return Array.from(hosts);
}

function getFirstApiKey(urls: string[]) {
  for (const raw of urls) {
    try {
      const url = new URL(raw);
      const key = url.searchParams.get("apikey");
      if (key) return key;
    } catch {
      continue;
    }
  }
  return "";
}

function decodeJwtRole(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload.padEnd(
      payload.length + ((4 - (payload.length % 4)) % 4),
      "="
    );
    const json = JSON.parse(atob(padded)) as { role?: string };
    return json.role ?? null;
  } catch {
    return null;
  }
}

function classifyKind(protocol: string): TargetKind {
  return protocol.startsWith("ws") ? "wss" : "http";
}

function isSupabaseHost(hostname: string) {
  const value = hostname.toLowerCase();
  return value.endsWith(".supabase.co") || value.endsWith(".supabase.com");
}

function getSupabaseRef(hostname: string) {
  const parts = hostname.split(".");
  if (parts.length < 3) return null;
  return parts[0] ?? null;
}

function buildTargets(
  rawUrls: string[],
  includeDerived: boolean,
  manualHosts: string[]
) {
  const targets: Target[] = [];
  const seen = new Set<string>();
  const derivedHosts = new Set<string>(manualHosts);

  for (const raw of rawUrls) {
    try {
      const url = new URL(raw);
      const key = url.toString();
      if (seen.has(key)) continue;
      seen.add(key);

      if (isSupabaseHost(url.hostname)) {
        derivedHosts.add(url.hostname);
      }

      const notes: string[] = [];
      const apiKey = url.searchParams.get("apikey");
      if (apiKey) {
        notes.push("apikey in query");
        const role = decodeJwtRole(apiKey);
        if (role) {
          notes.push(`role ${role}`);
          if (role === "service_role") {
            notes.push("service role token");
          }
        }
      }
      if (url.protocol === "http:") {
        notes.push("plain http");
      }

      targets.push({
        url: url.toString(),
        kind: classifyKind(url.protocol),
        source: "raw",
        host: url.hostname,
        notes,
      });
    } catch {
      continue;
    }
  }

  if (includeDerived) {
    for (const host of derivedHosts) {
      const origin = `https://${host}`;
      for (const path of SUPABASE_PATHS) {
        const derived = new URL(path, origin).toString();
        if (!seen.has(derived)) {
          seen.add(derived);
          targets.push({
            url: derived,
            kind: "http",
            source: "derived",
            host,
            notes: manualHosts.includes(host)
              ? ["derived from domain input"]
              : ["derived from supabase host"],
          });
        }
      }
      const wsUrl = new URL("/realtime/v1/websocket", origin);
      wsUrl.protocol = "wss:";
      const wsKey = wsUrl.toString();
      if (!seen.has(wsKey)) {
        seen.add(wsKey);
        targets.push({
          url: wsKey,
          kind: "wss",
          source: "derived",
          host,
          notes: manualHosts.includes(host)
            ? ["derived websocket", "domain input"]
            : ["derived websocket"],
        });
      }
    }
  }

  return targets;
}

function buildHttpUrls(
  input: string,
  includeDerived: boolean,
  manualHosts: string[]
) {
  const extracted = extractUrls(input);
  const targets = buildTargets(extracted, includeDerived, manualHosts);
  return targets
    .filter((target) => target.kind === "http")
    .map((target) => target.url);
}

function encodePathSegment(value: string) {
  return encodeURIComponent(value).replace(/%2E/g, ".");
}

function buildAuthHeaders(apiKeyValue: string, bearerValue: string) {
  const headers: Record<string, string> = {};
  if (apiKeyValue.trim()) {
    headers.apikey = apiKeyValue.trim();
  }
  if (bearerValue.trim()) {
    headers.Authorization = `Bearer ${bearerValue.trim()}`;
  }
  return headers;
}

async function fetchResult(
  url: string,
  headers: Record<string, string>,
  timeoutMs: number,
  maxBytes = 200000
) {
  const response = await fetch("/api/supabase-tester/fetch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, headers, timeoutMs, maxBytes }),
  });

  return (await response.json()) as FetchResult;
}

async function fetchJson(
  url: string,
  headers: Record<string, string>,
  timeoutMs: number,
  maxBytes = 200000
) {
  const data = await fetchResult(url, headers, timeoutMs, maxBytes);
  if (!data.ok || !data.text) {
    return { ok: false, result: data };
  }

  try {
    const parsed = JSON.parse(data.text);
    return { ok: true, result: data, json: parsed as unknown };
  } catch {
    return { ok: false, result: data };
  }
}

async function writeResult(
  url: string,
  method: "POST" | "PATCH" | "DELETE",
  headers: Record<string, string>,
  body: unknown,
  timeoutMs: number,
  maxBytes = 200000
) {
  const response = await fetch("/api/supabase-tester/write", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, method, headers, timeoutMs, maxBytes, body }),
  });

  return (await response.json()) as FetchResult;
}

function buildAuthMode(headers: Record<string, string>) {
  const hasApiKey = Boolean(headers.apikey);
  const hasBearer = Boolean(headers.Authorization);

  if (!hasApiKey && !hasBearer) {
    return "No auth headers";
  }
  if (hasApiKey && hasBearer) {
    return "apikey and Bearer headers";
  }
  if (hasApiKey) {
    return "apikey header";
  }
  return "Bearer header";
}

function buildReportSummary(
  httpUrls: string[],
  httpResults: Record<string, ProbeResult>,
  wsUrls: string[],
  wsResults: Record<string, WsResult>,
  headers: Record<string, string>
) {
  const statusCount = new Map<number, number>();
  let httpOk = 0;
  let httpError = 0;

  for (const url of httpUrls) {
    const result = httpResults[url];
    if (!result) continue;
    if (result.ok) httpOk += 1;
    if (!result.ok) httpError += 1;
    if (typeof result.status === "number") {
      statusCount.set(result.status, (statusCount.get(result.status) ?? 0) + 1);
    }
  }

  let wsOpen = 0;
  let wsError = 0;
  let wsTimeout = 0;
  let wsClosed = 0;

  for (const url of wsUrls) {
    const result = wsResults[url];
    if (!result) continue;
    if (result.state === "open") wsOpen += 1;
    if (result.state === "error") wsError += 1;
    if (result.state === "timeout") wsTimeout += 1;
    if (result.state === "closed") wsClosed += 1;
  }

  const signals: string[] = [];
  const authMode = buildAuthMode(headers);
  const hasAuth = Boolean(headers.apikey || headers.Authorization);

  for (const url of httpUrls) {
    const result = httpResults[url];
    if (!result) continue;
    if (result.status && result.status >= 200 && result.status < 300) {
      if (hasAuth) {
        signals.push(`Success with headers on ${url}`);
      } else {
        signals.push(`Success without auth on ${url}`);
      }
    }
    if (result.status === 401 || result.status === 403) {
      signals.push(`Auth required for ${url}`);
    }
    if (result.status && result.status >= 500) {
      signals.push(`Server error on ${url}`);
    }
    if (result.error) {
      signals.push(`Request error on ${url}`);
    }
  }

  for (const url of wsUrls) {
    const result = wsResults[url];
    if (!result) continue;
    if (result.state === "open") {
      signals.push(`Websocket opened for ${url}`);
    }
    if (result.state === "error") {
      signals.push(`Websocket error for ${url}`);
    }
    if (result.state === "timeout") {
      signals.push(`Websocket timed out for ${url}`);
    }
  }

  const uniqueSignals = Array.from(new Set(signals)).slice(0, 8);
  const statusCounts = Array.from(statusCount.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([status, count]) => ({ status, count }));

  return {
    createdAt: new Date().toLocaleString(),
    httpTotal: httpUrls.length,
    httpOk,
    httpError,
    statusCounts,
    wsTotal: wsUrls.length,
    wsOpen,
    wsError,
    wsTimeout,
    wsClosed,
    authMode,
    signals: uniqueSignals,
  } satisfies ReportSummary;
}

function extractTableNames(schema: unknown) {
  if (!schema || typeof schema !== "object") return [];
  const paths = (schema as { paths?: Record<string, unknown> }).paths ?? {};
  const names: string[] = [];

  for (const path of Object.keys(paths)) {
    if (!path.startsWith("/")) continue;
    if (path === "/") continue;
    if (path.startsWith("/rpc/")) continue;
    if (path.includes("{")) continue;
    const name = path.replace("/", "").trim();
    if (!name) continue;
    if (name.includes("/")) continue;
    names.push(name);
  }

  return names;
}

function extractSchemaMap(openapi: unknown) {
  if (!openapi || typeof openapi !== "object") return {};
  const components = (openapi as { components?: Record<string, unknown> })
    .components as Record<string, unknown> | undefined;
  if (!components || typeof components !== "object") return {};
  const schemas = components.schemas as Record<string, unknown> | undefined;
  if (!schemas || typeof schemas !== "object") return {};

  const result: Record<string, Record<string, string>> = {};
  for (const [name, schema] of Object.entries(schemas)) {
    if (!schema || typeof schema !== "object") continue;
    const properties = (schema as { properties?: Record<string, unknown> })
      .properties as Record<string, unknown> | undefined;
    if (!properties || typeof properties !== "object") continue;
    const entries: Record<string, string> = {};
    for (const [propName, prop] of Object.entries(properties)) {
      if (!prop || typeof prop !== "object") continue;
      const propType = (prop as { type?: string }).type ?? "string";
      entries[propName] = propType;
    }
    if (Object.keys(entries).length > 0) {
      result[name] = entries;
    }
  }
  return result;
}

function pickSampleRow(data: unknown) {
  if (!Array.isArray(data)) return null;
  const [first] = data;
  if (!first || typeof first !== "object") return null;
  return first as Record<string, unknown>;
}

function parseContentRange(range: string | null | undefined) {
  if (!range) return null;
  const parts = range.split("/");
  if (parts.length !== 2) return null;
  const total = Number(parts[1]);
  return Number.isFinite(total) ? total : null;
}

function inferCleanupFilter(row: Record<string, unknown>, table: string) {
  const tableKey = `${table}_id`;
  const candidates = ["id", "uuid", tableKey];
  for (const key of candidates) {
    if (row[key] !== undefined && row[key] !== null) {
      return { key, value: row[key] };
    }
  }

  for (const [key, value] of Object.entries(row)) {
    if (typeof value === "string" || typeof value === "number") {
      return { key, value };
    }
  }

  return null;
}

function buildVectorResults(options: {
  openApiAnonOk: boolean;
  openApiServiceOk: boolean;
  openApiTables: string[];
  tableAudits: TableAudit[];
  bucketSummaries: BucketSummary[];
  corsSummaries: CorsSummary[];
  serviceRoleFound: boolean;
  hasServiceRoleKey: boolean;
  functionReachable: boolean;
}) {
  const {
    openApiAnonOk,
    openApiServiceOk,
    openApiTables,
    tableAudits,
    bucketSummaries,
    corsSummaries,
    serviceRoleFound,
    hasServiceRoleKey,
    functionReachable,
  } = options;

  const anonDataTables = tableAudits
    .filter((table) => (table.anonRows ?? 0) > 0)
    .map((table) => table.name);
  const publicBuckets = bucketSummaries
    .filter((bucket) => bucket.isPublic)
    .map((bucket) => bucket.name);
  const corsAnyOrigin = corsSummaries.some(
    (entry) => entry.allowOrigin === "*"
  );

  return VECTOR_CATALOG.map((item) => {
    switch (item.id) {
      case "postgrest_openapi": {
        if (openApiAnonOk) {
          return {
            ...item,
            status: "info" as VectorStatus,
            notes: openApiTables.length
              ? `OpenAPI visible with ${openApiTables.length} tables`
              : "OpenAPI visible without auth",
          };
        }
        if (openApiServiceOk) {
          return {
            ...item,
            status: "pass" as VectorStatus,
            notes: "OpenAPI requires auth",
          };
        }
        return {
          ...item,
          status: "unknown" as VectorStatus,
          notes: "No OpenAPI response",
        };
      }
      case "rls_missing": {
        if (!hasServiceRoleKey) {
          return {
            ...item,
            status: "manual" as VectorStatus,
            notes: "Service role key not provided for comparison",
          };
        }
        if (anonDataTables.length > 0) {
          return {
            ...item,
            status: "risk" as VectorStatus,
            notes: `Anon data visible in ${anonDataTables.join(", ")}`,
          };
        }
        return {
          ...item,
          status: "pass" as VectorStatus,
          notes: "Anon access did not return rows",
        };
      }
      case "storage_public": {
        if (bucketSummaries.length === 0) {
          return {
            ...item,
            status: "unknown" as VectorStatus,
            notes: "No bucket data returned",
          };
        }
        if (publicBuckets.length > 0) {
          return {
            ...item,
            status: "risk" as VectorStatus,
            notes: `Public buckets ${publicBuckets.join(", ")}`,
          };
        }
        return {
          ...item,
          status: "pass" as VectorStatus,
          notes: "No public buckets detected",
        };
      }
      case "service_role_exposure": {
        if (serviceRoleFound) {
          return {
            ...item,
            status: "risk" as VectorStatus,
            notes: "Service role token detected in input",
          };
        }
        if (hasServiceRoleKey) {
          return {
            ...item,
            status: "info" as VectorStatus,
            notes: "Service role used only inside tool",
          };
        }
        return {
          ...item,
          status: "pass" as VectorStatus,
          notes: "No service role token found",
        };
      }
      case "cors_open": {
        if (!corsSummaries.length) {
          return {
            ...item,
            status: "unknown" as VectorStatus,
            notes: "No CORS data",
          };
        }
        if (corsAnyOrigin) {
          return {
            ...item,
            status: "info" as VectorStatus,
            notes: "Access Control Allow Origin allows any origin",
          };
        }
        return {
          ...item,
          status: "pass" as VectorStatus,
          notes: "CORS does not allow any origin",
        };
      }
      case "edge_functions": {
        if (functionReachable) {
          return {
            ...item,
            status: "info" as VectorStatus,
            notes: "Functions endpoint reachable",
          };
        }
        return {
          ...item,
          status: "unknown" as VectorStatus,
          notes: "No functions response",
        };
      }
      default:
        return { ...item, status: "manual" as VectorStatus };
    }
  });
}

function buildTemplateValue(type: string) {
  switch (type) {
    case "integer":
    case "number":
      return 0;
    case "boolean":
      return false;
    case "array":
      return [];
    case "object":
      return {};
    default:
      return "";
  }
}

function buildSchemaTemplate(schema: Record<string, string>) {
  const template: Record<string, unknown> = {};
  for (const [key, type] of Object.entries(schema)) {
    template[key] = buildTemplateValue(type);
  }
  return template;
}

function startWebSocketProbe(
  url: string,
  setWsResults: React.Dispatch<
    React.SetStateAction<Record<string, WsResult>>
  >
) {
  return new Promise<WsResult>((resolve) => {
    const start = Date.now();
    setWsResults((prev) => ({
      ...prev,
      [url]: { state: "connecting" },
    }));

    let settled = false;
    const ws = new WebSocket(url);

    const finish = (result: WsResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      setWsResults((prev) => ({ ...prev, [url]: result }));
      resolve(result);
    };

    const timeoutId = setTimeout(() => {
      ws.close();
      finish({ state: "timeout" });
    }, 8000);

    ws.onopen = () => {
      ws.close();
      finish({ state: "open", timeMs: Date.now() - start });
    };

    ws.onerror = () => {
      finish({ state: "error" });
    };

    ws.onclose = (event) => {
      finish({
        state: "closed",
        code: event.code,
        reason: event.reason,
        timeMs: Date.now() - start,
      });
    };
  });
}

function parseWritePayload(raw: string) {
  const value = raw.trim();
  if (!value) return { ok: false, error: "Payload is empty." };
  try {
    return { ok: true, payload: JSON.parse(value) as unknown };
  } catch {
    return { ok: false, error: "Payload is not valid JSON." };
  }
}

function buildCurl(
  url: string,
  method: string,
  headers: Record<string, string>
) {
  const parts = [`curl`, "-X", method, `'${url}'`];
  for (const [key, value] of Object.entries(headers)) {
    parts.push("-H", `'${key}: ${value}'`);
  }
  return parts.join(" ");
}

export type InspectorContextValue = {
  rawInput: string;
  setRawInput: (value: string) => void;
  projectDomains: string;
  setProjectDomains: (value: string) => void;
  includeDerived: boolean;
  setIncludeDerived: (value: boolean) => void;
  method: string;
  setMethod: (value: string) => void;
  timeoutMs: number;
  setTimeoutMs: (value: number) => void;
  apiKey: string;
  setApiKey: (value: string) => void;
  updateApiKey: (value: string) => void;
  bearerToken: string;
  setBearerToken: (value: string) => void;
  updateBearerToken: (value: string) => void;
  serviceRoleKey: string;
  setServiceRoleKey: (value: string) => void;
  sendApiKey: boolean;
  setSendApiKey: (value: boolean) => void;
  sendBearer: boolean;
  setSendBearer: (value: boolean) => void;
  selectedHttp: string[];
  setSelectedHttp: React.Dispatch<React.SetStateAction<string[]>>;
  results: Record<string, ProbeResult>;
  wsResults: Record<string, WsResult>;
  report: ReportSummary | null;
  deepReport: DeepReport | null;
  issueItems: IssueItem[];
  signalItems: string[];
  runningAll: boolean;
  running: boolean;
  deepRunning: boolean;
  httpTargets: Target[];
  wsTargets: Target[];
  supabaseRefs: string[];
  inspectionHosts: string[];
  requestHeaders: Record<string, string>;
  anonHeaders: Record<string, string>;
  serviceHeaders: Record<string, string> | null;
  findings: string[];
  vectorStatusMap: Map<string, VectorResult>;
  runAllTests: () => Promise<void>;
  runAllProbes: () => Promise<void>;
  runDeepInspection: () => Promise<void>;
  runWebSocketTest: (url: string) => void;
  toggleSelection: (url: string) => void;
  handleInputChange: (value: string) => void;
  handleDomainInputChange: (value: string) => void;
  handleIncludeDerivedChange: (value: boolean) => void;
  curlPreview: string;
  tableViewer: TableEntry | null;
  tableRows: Record<string, unknown>[];
  tableColumns: string[];
  tableTotal: number | null;
  tablePage: number;
  tablePageSize: number;
  setTablePageSize: (value: number) => void;
  tableMode: "anon" | "auth" | "service";
  setTableMode: (value: "anon" | "auth" | "service") => void;
  tableLoading: boolean;
  tableError: string;
  handleViewTable: (entry: TableEntry, modeOverride?: "anon" | "auth" | "service") => void;
  loadTableRows: (
    entry: TableEntry,
    page: number,
    append: boolean,
    modeOverride?: "anon" | "auth" | "service"
  ) => void;
  handleLoadMore: () => void;
  writeEnabled: boolean;
  setWriteEnabled: (value: boolean) => void;
  writeConfirm: string;
  setWriteConfirm: (value: string) => void;
  writeTable: string;
  setWriteTable: (value: string) => void;
  writePayload: string;
  setWritePayload: (value: string) => void;
  writeModes: { anon: boolean; auth: boolean; service: boolean };
  setWriteModes: React.Dispatch<
    React.SetStateAction<{ anon: boolean; auth: boolean; service: boolean }>
  >;
  writeCleanup: boolean;
  setWriteCleanup: (value: boolean) => void;
  writeRunning: boolean;
  writeResults: Record<string, WriteResult>;
  writeAllowed: boolean;
  runWriteTests: () => Promise<void>;
  tableEntries: TableEntry[];
  publicTableEntries: TableEntry[];
  tableSchemas: Record<string, Record<string, string>>;
  applySchemaTemplate: () => void;
  applySampleTemplate: (mode: "anon" | "service") => void;
  setTableLimit: (value: number) => void;
  setSampleLimit: (value: number) => void;
  tableLimit: number;
  sampleLimit: number;
};

const InspectorContext = createContext<InspectorContextValue | null>(null);

export function InspectorProvider({ children }: { children: React.ReactNode }) {
  const [rawInput, setRawInput] = useState("");
  const [includeDerived, setIncludeDerived] = useState(true);
  const [method, setMethod] = useState("GET");
  const [timeoutMs, setTimeoutMs] = useState(8000);
  const [apiKey, setApiKey] = useState("");
  const [apiKeyTouched, setApiKeyTouched] = useState(false);
  const [bearerToken, setBearerToken] = useState("");
  const [bearerTouched, setBearerTouched] = useState(false);
  const [serviceRoleKey, setServiceRoleKey] = useState("");
  const [projectDomains, setProjectDomains] = useState("");
  const [tableLimit, setTableLimit] = useState(0);
  const [sampleLimit, setSampleLimit] = useState(3);
  const [sendApiKey, setSendApiKey] = useState(true);
  const [sendBearer, setSendBearer] = useState(true);
  const [selectedHttp, setSelectedHttp] = useState<string[]>([]);
  const [selectionTouched, setSelectionTouched] = useState(false);
  const [results, setResults] = useState<Record<string, ProbeResult>>({});
  const [running, setRunning] = useState(false);
  const [runningAll, setRunningAll] = useState(false);
  const [wsResults, setWsResults] = useState<Record<string, WsResult>>({});
  const [report, setReport] = useState<ReportSummary | null>(null);
  const [deepRunning, setDeepRunning] = useState(false);
  const [deepReport, setDeepReport] = useState<DeepReport | null>(null);
  const [tableViewer, setTableViewer] = useState<TableEntry | null>(null);
  const [tableRows, setTableRows] = useState<Record<string, unknown>[]>([]);
  const [tableColumns, setTableColumns] = useState<string[]>([]);
  const [tableTotal, setTableTotal] = useState<number | null>(null);
  const [tablePage, setTablePage] = useState(0);
  const [tablePageSize, setTablePageSize] = useState(50);
  const [tableMode, setTableMode] = useState<"anon" | "auth" | "service">(
    "anon"
  );
  const [tableLoading, setTableLoading] = useState(false);
  const [tableError, setTableError] = useState("");
  const [writeEnabled, setWriteEnabled] = useState(false);
  const [writeConfirm, setWriteConfirm] = useState("");
  const [writeTable, setWriteTable] = useState("");
  const [writePayload, setWritePayload] = useState("{\n  \n}");
  const [writeModes, setWriteModes] = useState({
    anon: true,
    auth: true,
    service: false,
  });
  const [writeCleanup, setWriteCleanup] = useState(true);
  const [writeRunning, setWriteRunning] = useState(false);
  const [writeResults, setWriteResults] = useState<Record<string, WriteResult>>(
    {}
  );

  function updateApiKey(value: string) {
    setApiKeyTouched(true);
    setApiKey(value);
  }

  function updateBearerToken(value: string) {
    setBearerTouched(true);
    setBearerToken(value);
  }

  const extractedUrls = useMemo(() => extractUrls(rawInput), [rawInput]);
  const manualHosts = useMemo(
    () => extractHosts(projectDomains),
    [projectDomains]
  );
  const targets = useMemo(
    () => buildTargets(extractedUrls, includeDerived, manualHosts),
    [extractedUrls, includeDerived, manualHosts]
  );

  const httpTargets = useMemo(
    () => targets.filter((target) => target.kind === "http"),
    [targets]
  );
  const wsTargets = useMemo(
    () => targets.filter((target) => target.kind === "wss"),
    [targets]
  );

  const supabaseRefs = useMemo(() => {
    const refs = new Set<string>();
    for (const target of targets) {
      if (!isSupabaseHost(target.host)) continue;
      const ref = getSupabaseRef(target.host);
      if (ref) refs.add(ref);
    }
    return Array.from(refs);
  }, [targets]);

  const supabaseHosts = useMemo(() => {
    const hosts = new Set<string>();
    for (const target of targets) {
      if (!isSupabaseHost(target.host)) continue;
      hosts.add(target.host);
    }
    return Array.from(hosts);
  }, [targets]);

  const inspectionHosts = useMemo(() => {
    const hosts = new Set<string>(manualHosts);
    for (const host of supabaseHosts) {
      hosts.add(host);
    }
    return Array.from(hosts);
  }, [manualHosts, supabaseHosts]);

  const requestHeaders = useMemo(() => {
    const headers: Record<string, string> = {};
    if (sendApiKey && apiKey.trim()) {
      headers.apikey = apiKey.trim();
    }
    if (sendBearer && bearerToken.trim()) {
      headers.Authorization = `Bearer ${bearerToken.trim()}`;
    }
    return headers;
  }, [apiKey, bearerToken, sendApiKey, sendBearer]);

  const anonHeaders = useMemo(
    () => buildAuthHeaders(sendApiKey ? apiKey : "", ""),
    [apiKey, sendApiKey]
  );

  const serviceHeaders = useMemo(
    () =>
      serviceRoleKey.trim()
        ? buildAuthHeaders(serviceRoleKey, serviceRoleKey)
        : null,
    [serviceRoleKey]
  );

  const findings = useMemo(() => {
    const items: string[] = [];
    for (const target of targets) {
      for (const note of target.notes) {
        if (note === "service role token") {
          items.push(
            `Service role token detected on ${target.host}. Treat this as sensitive.`
          );
        }
        if (note === "apikey in query") {
          items.push(
            `apikey appears in query string on ${target.host}. This is visible in logs.`
          );
        }
        if (note === "plain http") {
          items.push(`Plain http used for ${target.host}.`);
        }
      }
    }
    return Array.from(new Set(items));
  }, [targets]);

  const issueItems = useMemo(() => {
    const items: IssueItem[] = [];

    if (report) {
      if (report.httpError > 0) {
        items.push({
          id: "tests-http-errors",
          title: `Http errors found in ${report.httpError} requests`,
          detail: "Check endpoint status codes and request headers.",
          severity: "high",
          source: "tests",
        });
      }
      if (report.wsError > 0 || report.wsTimeout > 0) {
        const total = report.wsError + report.wsTimeout;
        items.push({
          id: "tests-ws-errors",
          title: `Websocket issues found in ${total} checks`,
          detail: "Check websocket auth and connection timeouts.",
          severity: "medium",
          source: "tests",
        });
      }
    }

    for (const note of findings) {
      items.push({
        id: `input-${note}`,
        title: note,
        severity: "info",
        source: "input",
      });
    }

    if (deepReport) {
      deepReport.warnings.forEach((warning, index) => {
        items.push({
          id: `inspection-warning-${index}`,
          title: warning,
          severity: "medium",
          source: "inspection",
        });
      });

      deepReport.endpointChecks.forEach((check, index) => {
        if (check.ok) return;
        items.push({
          id: `inspection-endpoint-${index}`,
          title: `${check.name} did not respond`,
          detail: check.error ?? `Status ${check.status ?? "unknown"}`,
          severity: "medium",
          source: "inspection",
        });
      });

      deepReport.tables.forEach((table) => {
        if ((table.anonRows ?? 0) > 0) {
          items.push({
            id: `inspection-anon-${table.name}`,
            title: `Anon data visible in ${table.name}`,
            detail: "Review RLS and anon permissions.",
            severity: "high",
            source: "inspection",
          });
        }
      });

      deepReport.bucketSummaries.forEach((bucket) => {
        if (!bucket.isPublic) return;
        items.push({
          id: `inspection-bucket-${bucket.name}`,
          title: `Public storage bucket ${bucket.name}`,
          detail: "Confirm the bucket is intended to be public.",
          severity: "high",
          source: "inspection",
        });
      });

      deepReport.corsSummaries.forEach((cors, index) => {
        if (cors.allowOrigin !== "*") return;
        items.push({
          id: `inspection-cors-${index}`,
          title: `Cors allows any origin for ${cors.url}`,
          detail: "Tighten allowed origins for public endpoints.",
          severity: "medium",
          source: "inspection",
        });
      });

      deepReport.vectorResults.forEach((vector) => {
        if (vector.status === "pass") return;
        items.push({
          id: `inspection-vector-${vector.id}`,
          title: vector.title,
          detail: vector.notes ?? vector.component,
          severity: vector.status === "risk" ? "high" : "info",
          source: "inspection",
        });
      });
    }

    return items;
  }, [deepReport, findings, report]);

  const signalItems = useMemo(() => {
    const items: string[] = [];
    if (report?.signals?.length) {
      items.push(...report.signals);
    }
    if (deepReport?.signals?.length) {
      items.push(...deepReport.signals);
    }
    return Array.from(new Set(items));
  }, [deepReport, report]);

  const vectorStatusMap = useMemo(() => {
    if (!deepReport) return new Map<string, VectorResult>();
    return new Map(deepReport.vectorResults.map((item) => [item.id, item]));
  }, [deepReport]);

  const curlPreview = useMemo(() => {
    if (!selectedHttp.length) return "";
    return buildCurl(selectedHttp[0], method, requestHeaders);
  }, [method, requestHeaders, selectedHttp]);

  const writeAllowed = useMemo(
    () => writeEnabled && writeConfirm.trim() === "RUN WRITE TESTS",
    [writeConfirm, writeEnabled]
  );

  const tableEntries = useMemo(() => deepReport?.tableEntries ?? [], [deepReport]);

  const publicTableEntries = useMemo(() => {
    if (!deepReport) return [];
    const map = new Map<string, TableEntry>();
    deepReport.tables.forEach((table) => {
      if (typeof table.anonStatus !== "number") return;
      if (table.anonStatus >= 400) return;
      const key = `${table.host}::${table.table}`;
      map.set(key, { host: table.host, table: table.table });
    });
    return Array.from(map.values());
  }, [deepReport]);

  const tableSchemas = useMemo(() => deepReport?.tableSchemas ?? {}, [deepReport]);

  function syncSelection(nextHttpUrls: string[]) {
    setSelectedHttp((prev) => {
      if (!selectionTouched) {
        return nextHttpUrls;
      }
      return prev.filter((item) => nextHttpUrls.includes(item));
    });
  }

  function handleInputChange(value: string) {
    if (!value.trim()) {
      setRawInput(value);
      setSelectionTouched(false);
      setSelectedHttp([]);
      setResults({});
      setWsResults({});
      setReport(null);
      setDeepReport(null);
      setTableViewer(null);
      setTableRows([]);
      setTableColumns([]);
      setTableTotal(null);
      setTablePage(0);
      setWriteResults({});
      return;
    }

    setRawInput(value);
    const nextHttpUrls = buildHttpUrls(value, includeDerived, manualHosts);
    syncSelection(nextHttpUrls);

    const nextKey = getFirstApiKey(extractUrls(value));
    if (nextKey) {
      if (!apiKeyTouched && !apiKey) {
        setApiKey(nextKey);
      }
      if (!bearerTouched && !bearerToken) {
        setBearerToken(nextKey);
      }
    }
  }

  function handleIncludeDerivedChange(value: boolean) {
    setIncludeDerived(value);
    const nextHttpUrls = buildHttpUrls(rawInput, value, manualHosts);
    syncSelection(nextHttpUrls);
  }

  function handleDomainInputChange(value: string) {
    setProjectDomains(value);
    const nextHosts = extractHosts(value);
    const nextHttpUrls = buildHttpUrls(rawInput, includeDerived, nextHosts);
    syncSelection(nextHttpUrls);
  }

  function toggleSelection(url: string) {
    setSelectionTouched(true);
    setSelectedHttp((prev) =>
      prev.includes(url) ? prev.filter((item) => item !== url) : [...prev, url]
    );
  }

  async function runProbe(url: string) {
    const response = await fetch("/api/supabase-tester/probe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        method,
        timeoutMs,
        headers: requestHeaders,
      }),
    });

    const data = (await response.json()) as ProbeResult;
    setResults((prev) => ({ ...prev, [url]: data }));
    return data;
  }

  async function runHttpProbes(urls: string[]) {
    if (!urls.length) return {};
    setRunning(true);
    setResults({});

    const queue = [...urls];
    const localResults: Record<string, ProbeResult> = {};
    const limit = 4;

    const workers = Array.from({ length: limit }, async () => {
      while (queue.length) {
        const nextUrl = queue.shift();
        if (!nextUrl) return;
        try {
          const data = await runProbe(nextUrl);
          localResults[nextUrl] = data;
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Request failed";
          const fallback = { ok: false, error: message } as ProbeResult;
          setResults((prev) => ({ ...prev, [nextUrl]: fallback }));
          localResults[nextUrl] = fallback;
        }
      }
    });

    await Promise.all(workers);
    setRunning(false);
    return localResults;
  }

  async function runAllProbes() {
    await runHttpProbes(selectedHttp);
  }

  function runWebSocketTest(url: string) {
    void startWebSocketProbe(url, setWsResults);
  }

  async function runWebSocketProbes(urls: string[]) {
    const localResults: Record<string, WsResult> = {};
    await Promise.all(
      urls.map(async (url) => {
        const result = await startWebSocketProbe(url, setWsResults);
        localResults[url] = result;
      })
    );
    return localResults;
  }

  async function runAllTests() {
    if (!selectedHttp.length && !wsTargets.length) return;
    setRunningAll(true);
    setReport(null);
    setResults({});
    setWsResults({});

    const httpUrls = [...selectedHttp];
    const wsUrls = wsTargets.map((target) => target.url);

    try {
      const [httpResults, wsResultsLocal] = await Promise.all([
        runHttpProbes(httpUrls),
        runWebSocketProbes(wsUrls),
      ]);

      const summary = buildReportSummary(
        httpUrls,
        httpResults,
        wsUrls,
        wsResultsLocal,
        requestHeaders
      );
      setReport(summary);
    } finally {
      setRunningAll(false);
    }
  }

  async function runDeepInspection() {
    if (!inspectionHosts.length) return;
    setDeepRunning(true);
    setDeepReport(null);

    const warnings: string[] = [];
    if (!serviceHeaders) {
      warnings.push("Service role key not set. Data samples use anon headers.");
    }

    const endpointChecks: EndpointCheck[] = [];
    const tables: TableAudit[] = [];
    const signals: string[] = [];
    const bucketSummaries: BucketSummary[] = [];
    const corsSummaries: CorsSummary[] = [];
    let openApiAnonOk = false;
    let openApiServiceOk = false;
    const openApiTableNames = new Set<string>();
    const tableEntryMap = new Map<string, TableEntry>();
    let functionsReachable = false;
    const serviceRoleFound = targets.some((target) =>
      target.notes.includes("service role token")
    );
    const tableSchemas: Record<string, Record<string, string>> = {};

    for (const host of inspectionHosts) {
      const base = `https://${host}`;
      const endpoints = [
        {
          name: "rest openapi",
          path: "/rest/v1/",
          accept: "application/openapi+json",
        },
        {
          name: "auth settings",
          path: "/auth/v1/settings",
          accept: "application/json",
        },
        {
          name: "storage buckets",
          path: "/storage/v1/bucket",
          accept: "application/json",
        },
        {
          name: "functions root",
          path: "/functions/v1/",
          accept: "application/json",
        },
      ];

      for (const endpoint of endpoints) {
        const url = `${base}${endpoint.path}`;
        const result = await fetchResult(
          url,
          { ...anonHeaders, Accept: endpoint.accept },
          timeoutMs,
          60000
        );
        endpointChecks.push({
          name: `${endpoint.name} on ${host}`,
          url,
          status: result.status,
          ok: result.ok,
          error: result.error,
        });
        if (result.ok) {
          signals.push(`${endpoint.name} responded on ${host}`);
        }
        if (endpoint.name === "functions root" && result.ok) {
          functionsReachable = true;
        }
      }

      const openapiPrimary = await fetchJson(
        `${base}/rest/v1/`,
        { ...anonHeaders, Accept: "application/openapi+json" },
        timeoutMs
      );

      let tableNames = openapiPrimary.ok
        ? extractTableNames(openapiPrimary.json)
        : [];
      if (openapiPrimary.ok) {
        openApiAnonOk = true;
        if (tableNames.length) {
          tableNames.forEach((tableName) => {
            openApiTableNames.add(tableName);
            tableEntryMap.set(`${host}:${tableName}`, { host, table: tableName });
          });
        }
        const schemaMap = extractSchemaMap(openapiPrimary.json);
        for (const [key, value] of Object.entries(schemaMap)) {
          tableSchemas[key] = value;
        }
      }

      if (!tableNames.length && serviceHeaders) {
        const openapiService = await fetchJson(
          `${base}/rest/v1/`,
          { ...serviceHeaders, Accept: "application/openapi+json" },
          timeoutMs
        );
        tableNames = openapiService.ok
          ? extractTableNames(openapiService.json)
          : [];
        if (openapiService.ok) {
          openApiServiceOk = true;
          if (tableNames.length) {
            tableNames.forEach((tableName) => {
              openApiTableNames.add(tableName);
              tableEntryMap.set(`${host}:${tableName}`, {
                host,
                table: tableName,
              });
            });
          }
          const schemaMap = extractSchemaMap(openapiService.json);
          for (const [key, value] of Object.entries(schemaMap)) {
            tableSchemas[key] = value;
          }
        }
      }

      if (!tableNames.length) {
        warnings.push(`No tables found for ${host}. Check exposed schemas.`);
      }

      const authSettings = await fetchJson(
        `${base}/auth/v1/settings`,
        { ...anonHeaders, Accept: "application/json" },
        timeoutMs,
        60000
      );

      if (authSettings.ok && authSettings.json && typeof authSettings.json === "object") {
        signals.push(`Auth settings reachable on ${host}`);
      }

      const storageBuckets = await fetchJson(
        `${base}/storage/v1/bucket`,
        { ...anonHeaders, Accept: "application/json" },
        timeoutMs,
        60000
      );

      if (storageBuckets.ok && Array.isArray(storageBuckets.json)) {
        for (const bucket of storageBuckets.json) {
          if (!bucket || typeof bucket !== "object") continue;
          const name = String((bucket as { name?: string }).name ?? "");
          const isPublic = Boolean((bucket as { public?: boolean }).public);
          if (name) {
            bucketSummaries.push({ name: `${host} ${name}`, isPublic });
          }
        }
      }

      const corsTargets = [
        `${base}/auth/v1/`,
        `${base}/rest/v1/`,
        `${base}/functions/v1/`,
      ];
      for (const url of corsTargets) {
        const corsResult = await fetch("/api/supabase-tester/probe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url,
            method: "OPTIONS",
            timeoutMs,
            headers: {
              Origin: "https://example.com",
              "Access-Control-Request-Method": "GET",
            },
          }),
        });
        const data = (await corsResult.json()) as ProbeResult;
        corsSummaries.push({
          url,
          allowOrigin: data.accessControlAllowOrigin ?? null,
          allowMethods: data.accessControlAllowMethods ?? null,
          allowHeaders: data.accessControlAllowHeaders ?? null,
        });
      }

      if (!tableNames.length) {
        continue;
      }

      const effectiveLimit = tableLimit > 0 ? tableLimit : tableNames.length;
      const limitedTables = tableNames.slice(0, Math.max(1, effectiveLimit));

      for (const table of limitedTables) {
        const tableUrl = `${base}/rest/v1/${encodePathSegment(table)}?select=*&limit=${Math.max(1, sampleLimit)}`;
        const tableAudit: TableAudit = {
          name: `${host} ${table}`,
          host,
          table,
        };

        const anonResult = await fetchJson(
          tableUrl,
          { ...anonHeaders, Accept: "application/json" },
          timeoutMs,
          120000
        );
        if (anonResult.result.status) {
          tableAudit.anonStatus = anonResult.result.status;
        }
        if (anonResult.ok && Array.isArray(anonResult.json)) {
          tableAudit.anonRows = anonResult.json.length;
          tableAudit.anonSample = pickSampleRow(anonResult.json);
          if (anonResult.json.length > 0) {
            signals.push(`Anon data visible in ${table} on ${host}`);
          }
        }

        if (serviceHeaders) {
          const serviceResult = await fetchJson(
            tableUrl,
            { ...serviceHeaders, Accept: "application/json" },
            timeoutMs,
            120000
          );
          if (serviceResult.result.status) {
            tableAudit.serviceStatus = serviceResult.result.status;
          }
          if (serviceResult.ok && Array.isArray(serviceResult.json)) {
            tableAudit.serviceRows = serviceResult.json.length;
            tableAudit.serviceSample = pickSampleRow(serviceResult.json);
            if ((tableAudit.anonRows ?? 0) === 0 && (tableAudit.serviceRows ?? 0) > 0) {
              signals.push(`RLS likely active on ${table} for anon`);
            }
          }
        }

        tables.push(tableAudit);
      }
    }

    const vectorResults = buildVectorResults({
      openApiAnonOk,
      openApiServiceOk,
      openApiTables: Array.from(openApiTableNames),
      tableAudits: tables,
      bucketSummaries,
      corsSummaries,
      serviceRoleFound,
      hasServiceRoleKey: Boolean(serviceHeaders),
      functionReachable: functionsReachable,
    });

    const publicTables = tables
      .filter((table) => typeof table.anonStatus === "number" && table.anonStatus < 400)
      .map((table) => ({ host: table.host, table: table.table }));

    setDeepReport({
      createdAt: new Date().toLocaleString(),
      hosts: inspectionHosts,
      tableEntries: Array.from(tableEntryMap.values()),
      tables,
      endpointChecks,
      signals: Array.from(new Set(signals)).slice(0, 12),
      warnings: Array.from(new Set(warnings)),
      vectorResults,
      bucketSummaries,
      corsSummaries,
      tableSchemas,
    });
    if (!writeTable && (publicTables.length > 0 || tableEntryMap.size > 0)) {
      const first = publicTables[0] ?? Array.from(tableEntryMap.values())[0];
      if (first) {
        setWriteTable(`${first.host}::${first.table}`);
        handleViewTable(first, "anon");
      }
    }
    setDeepRunning(false);
  }

  function getHeadersForMode(mode: "anon" | "auth" | "service") {
    if (mode === "anon") return anonHeaders;
    if (mode === "auth") return requestHeaders;
    return serviceHeaders;
  }

  async function loadTableRows(
    entry: TableEntry,
    page: number,
    append: boolean,
    modeOverride?: "anon" | "auth" | "service"
  ) {
    const mode = modeOverride ?? tableMode;
    const headers = getHeadersForMode(mode);
    if (!headers || (mode === "service" && !serviceHeaders)) {
      setTableError("Missing headers for selected mode.");
      return;
    }

    setTableLoading(true);
    setTableError("");
    const base = `https://${entry.host}`;
    const offset = page * tablePageSize;
    const url = `${base}/rest/v1/${encodePathSegment(entry.table)}?select=*&limit=${tablePageSize}&offset=${offset}`;

    const response = await fetchJson(
      url,
      { ...headers, Prefer: "count=exact" },
      timeoutMs,
      200000
    );

    if (!response.ok || !Array.isArray(response.json)) {
      setTableError(response.result.error ?? "Failed to load table rows.");
      setTableLoading(false);
      return;
    }

    const rows = response.json as Record<string, unknown>[];
    setTableRows((prev) => (append ? [...prev, ...rows] : rows));
    setTableColumns((prev) => {
      if (prev.length) return prev;
      const [first] = rows;
      return first ? Object.keys(first) : [];
    });
    setTableTotal(parseContentRange(response.result.contentRange));
    setTablePage(page);
    setTableLoading(false);
  }

  function handleViewTable(entry: TableEntry, modeOverride?: "anon" | "auth" | "service") {
    if (modeOverride) {
      setTableMode(modeOverride);
    }
    setTableViewer(entry);
    setTableRows([]);
    setTableColumns([]);
    setTableTotal(null);
    setTablePage(0);
    void loadTableRows(entry, 0, false, modeOverride);
  }

  function handleLoadMore() {
    if (!tableViewer) return;
    void loadTableRows(tableViewer, tablePage + 1, true);
  }

  async function runWriteTests() {
    if (!writeAllowed || !writeTable) return;

    const parsed = parseWritePayload(writePayload);
    if (!parsed.ok) {
      setWriteResults({
        error: { mode: "anon", ok: false, error: parsed.error },
      });
      return;
    }

    const [host, table] = writeTable.split("::");
    if (!host || !table) {
      setWriteResults({
        error: { mode: "anon", ok: false, error: "Invalid table selection." },
      });
      return;
    }

    setWriteRunning(true);
    setWriteResults({});

    const modes: Array<"anon" | "auth" | "service"> = [];
    if (writeModes.anon) modes.push("anon");
    if (writeModes.auth) modes.push("auth");
    if (writeModes.service) modes.push("service");

    const results: Record<string, WriteResult> = {};

    for (const mode of modes) {
      const headers = getHeadersForMode(mode);
      if (!headers || (mode === "service" && !serviceHeaders)) {
        results[mode] = {
          mode,
          ok: false,
          error: "Missing headers for selected mode.",
        };
        continue;
      }

      const url = `https://${host}/rest/v1/${encodePathSegment(table)}`;
      const result = await writeResult(
        url,
        "POST",
        { ...headers, Prefer: "return=representation" },
        parsed.payload,
        timeoutMs,
        200000
      );

      let responseData: unknown = null;
      if (result.text) {
        try {
          responseData = JSON.parse(result.text);
        } catch {
          responseData = result.text;
        }
      }

      const writeResultItem: WriteResult = {
        mode,
        ok: result.ok,
        status: result.status,
        error: result.error,
        response: responseData,
      };

      if (writeCleanup && result.ok && Array.isArray(responseData)) {
        const [firstRow] = responseData as Record<string, unknown>[];
        if (firstRow && typeof firstRow === "object") {
          const cleanup = inferCleanupFilter(firstRow, table);
          if (cleanup) {
            const value = encodeURIComponent(String(cleanup.value));
            const cleanupUrl = `https://${host}/rest/v1/${encodePathSegment(
              table
            )}?${cleanup.key}=eq.${value}`;
            const cleanupResult = await writeResult(
              cleanupUrl,
              "DELETE",
              { ...headers, Prefer: "return=minimal" },
              null,
              timeoutMs,
              200000
            );
            writeResultItem.cleanupStatus = cleanupResult.status;
            writeResultItem.cleanupError = cleanupResult.error;
          }
        }
      }

      results[mode] = writeResultItem;
    }

    setWriteResults(results);
    setWriteRunning(false);
  }

  function applySchemaTemplate() {
    const [, table] = writeTable.split("::");
    if (!table) return;
    const schema = tableSchemas[table];
    if (!schema) return;
    const template = buildSchemaTemplate(schema);
    setWritePayload(JSON.stringify(template, null, 2));
  }

  function applySampleTemplate(mode: "anon" | "service") {
    if (!deepReport || !writeTable) return;
    const [host, table] = writeTable.split("::");
    if (!host || !table) return;
    const entry = deepReport.tables.find(
      (item) => item.host === host && item.table === table
    );
    if (!entry) return;
    const sample = mode === "anon" ? entry.anonSample : entry.serviceSample;
    if (!sample) return;
    setWritePayload(JSON.stringify(sample, null, 2));
  }

  const value: InspectorContextValue = {
    rawInput,
    setRawInput,
    projectDomains,
    setProjectDomains,
    includeDerived,
    setIncludeDerived,
    method,
    setMethod,
    timeoutMs,
    setTimeoutMs,
    apiKey,
    setApiKey,
    updateApiKey,
    bearerToken,
    setBearerToken,
    updateBearerToken,
    serviceRoleKey,
    setServiceRoleKey,
    sendApiKey,
    setSendApiKey,
    sendBearer,
    setSendBearer,
    selectedHttp,
    setSelectedHttp,
    results,
    wsResults,
    report,
    deepReport,
    issueItems,
    signalItems,
    runningAll,
    running,
    deepRunning,
    httpTargets,
    wsTargets,
    supabaseRefs,
    inspectionHosts,
    requestHeaders,
    anonHeaders,
    serviceHeaders,
    findings,
    vectorStatusMap,
    runAllTests,
    runAllProbes,
    runDeepInspection,
    runWebSocketTest,
    toggleSelection,
    handleInputChange,
    handleDomainInputChange,
    handleIncludeDerivedChange,
    curlPreview,
    tableViewer,
    tableRows,
    tableColumns,
    tableTotal,
    tablePage,
    tablePageSize,
    setTablePageSize,
    tableMode,
    setTableMode,
    tableLoading,
    tableError,
    handleViewTable,
    loadTableRows,
    handleLoadMore,
    writeEnabled,
    setWriteEnabled,
    writeConfirm,
    setWriteConfirm,
    writeTable,
    setWriteTable,
    writePayload,
    setWritePayload,
    writeModes,
    setWriteModes,
    writeCleanup,
    setWriteCleanup,
    writeRunning,
    writeResults,
    writeAllowed,
    runWriteTests,
    tableEntries,
    publicTableEntries,
    tableSchemas,
    applySchemaTemplate,
    applySampleTemplate,
    setTableLimit,
    setSampleLimit,
    tableLimit,
    sampleLimit,
  };

  return (
    <InspectorContext.Provider value={value}>
      {children}
    </InspectorContext.Provider>
  );
}

export function useInspector() {
  const context = useContext(InspectorContext);
  if (!context) {
    throw new Error("useInspector must be used within InspectorProvider");
  }
  return context;
}
