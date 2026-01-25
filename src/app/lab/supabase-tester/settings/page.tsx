"use client";

import Link from "next/link";
import { useInspector } from "../providers/InspectorProvider";
import { SupabaseTesterNav } from "../SupabaseTesterNav";

export default function SettingsPage() {
  const {
    method,
    setMethod,
    timeoutMs,
    setTimeoutMs,
    apiKey,
    updateApiKey,
    bearerToken,
    updateBearerToken,
    sendApiKey,
    setSendApiKey,
    sendBearer,
    setSendBearer,
  } = useInspector();

  return (
    <div className="min-h-screen pb-16">
      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="animate-rise-in mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--color-ink-muted)]">
              Settings
            </span>
            <Link
              href="/lab"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]"
            >
              Back to Lab
            </Link>
          </div>
          <h1 className="mt-6 max-w-2xl font-[var(--font-serif)] text-4xl leading-tight text-[var(--color-ink)] sm:text-5xl">
            Request settings
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-ink-muted)]">
            Keep these settings in one place for the whole workspace.
          </p>
          <SupabaseTesterNav className="mt-6" />
        </header>

        <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
          <p className="text-xs text-[var(--color-ink-muted)]">
            These headers and timeouts apply to probe, fetch, and write checks.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-[var(--color-ink-muted)]">
              Method
              <select
                value={method}
                onChange={(event) => setMethod(event.target.value)}
                className="mt-2 w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-sm text-[var(--color-ink)]"
              >
                <option value="GET">GET</option>
                <option value="HEAD">HEAD</option>
                <option value="OPTIONS">OPTIONS</option>
              </select>
            </label>
            <label className="block text-sm text-[var(--color-ink-muted)]">
              Timeout ms
              <input
                type="number"
                min={1000}
                max={15000}
                value={timeoutMs}
                onChange={(event) => setTimeoutMs(Number(event.target.value))}
                className="mt-2 w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-sm text-[var(--color-ink)]"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-[var(--color-ink-muted)]">
              apikey header
              <input
                type="text"
                value={apiKey}
                onChange={(event) => updateApiKey(event.target.value)}
                placeholder="Optional"
                className="mt-2 w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-sm text-[var(--color-ink)]"
              />
            </label>
            <label className="block text-sm text-[var(--color-ink-muted)]">
              Bearer token
              <input
                type="text"
                value={bearerToken}
                onChange={(event) => updateBearerToken(event.target.value)}
                placeholder="Optional"
                className="mt-2 w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-sm text-[var(--color-ink)]"
              />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[var(--color-ink-muted)]">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sendApiKey}
                onChange={(event) => setSendApiKey(event.target.checked)}
                className="h-4 w-4 rounded border border-[var(--color-border)]"
              />
              Send apikey header
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sendBearer}
                onChange={(event) => setSendBearer(event.target.checked)}
                className="h-4 w-4 rounded border border-[var(--color-border)]"
              />
              Send Authorization Bearer
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
