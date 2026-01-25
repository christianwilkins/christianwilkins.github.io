"use client";

import Link from "next/link";
import { useInspector } from "../providers/InspectorProvider";
import { SupabaseTesterNav } from "../SupabaseTesterNav";

export default function WritesPage() {
  const {
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
    applySchemaTemplate,
    applySampleTemplate,
  } = useInspector();

  return (
    <div className="min-h-screen pb-16">
      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="animate-rise-in mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--color-ink-muted)]">
              Write tests
            </span>
            <Link
              href="/lab"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]"
            >
              Back to Lab
            </Link>
          </div>
          <h1 className="mt-6 max-w-2xl font-heading text-4xl leading-tight text-[var(--color-ink)] sm:text-5xl">
            Write payload tests
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-ink-muted)]">
            This page is opt in. Use it to test insert permissions and cleanup
            behavior. Payloads can be generated from schema or sample rows.
          </p>
          <SupabaseTesterNav className="mt-6" />
        </header>

        <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
          <div className="mt-3 grid gap-4">
            <div className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-xs text-[var(--color-ink-muted)]">
              Writes can mutate production data. Use a test project or confirm cleanup
              before running service-role checks.
            </div>
            <label className="flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
              <input
                type="checkbox"
                checked={writeEnabled}
                onChange={(event) => setWriteEnabled(event.target.checked)}
                className="h-4 w-4 rounded border border-[var(--color-border)]"
              />
              Enable write tests
            </label>
            <label className="text-xs text-[var(--color-ink-muted)]">
              Type RUN WRITE TESTS to confirm
              <input
                type="text"
                value={writeConfirm}
                onChange={(event) => setWriteConfirm(event.target.value)}
                className="mt-2 w-full rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-2 text-xs text-[var(--color-ink)]"
              />
            </label>
            <label className="text-xs text-[var(--color-ink-muted)]">
              Target table
              <select
                value={writeTable}
                onChange={(event) => setWriteTable(event.target.value)}
                className="mt-2 w-full rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-2 text-xs text-[var(--color-ink)]"
              >
                <option value="">Select a table</option>
                {tableEntries.map((entry) => (
                  <option
                    key={`write-${entry.host}::${entry.table}`}
                    value={`${entry.host}::${entry.table}`}
                  >
                    {entry.host} {entry.table}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex flex-wrap gap-2 text-xs text-[var(--color-ink-muted)]">
              <button
                type="button"
                onClick={applySchemaTemplate}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold text-[var(--color-ink)]"
              >
                Use schema template
              </button>
              <button
                type="button"
                onClick={() => applySampleTemplate("anon")}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold text-[var(--color-ink)]"
              >
                Use anon sample
              </button>
              <button
                type="button"
                onClick={() => applySampleTemplate("service")}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold text-[var(--color-ink)]"
              >
                Use service sample
              </button>
            </div>
            <label className="text-xs text-[var(--color-ink-muted)]">
              Payload JSON
              <textarea
                value={writePayload}
                onChange={(event) => setWritePayload(event.target.value)}
                rows={6}
                className="mt-2 w-full break-all rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-2 font-mono text-[11px] text-[var(--color-ink)]"
              />
            </label>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-ink-muted)]">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={writeModes.anon}
                  onChange={(event) =>
                    setWriteModes((prev) => ({
                      ...prev,
                      anon: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border border-[var(--color-border)]"
                />
                anon
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={writeModes.auth}
                  onChange={(event) =>
                    setWriteModes((prev) => ({
                      ...prev,
                      auth: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border border-[var(--color-border)]"
                />
                auth
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={writeModes.service}
                  onChange={(event) =>
                    setWriteModes((prev) => ({
                      ...prev,
                      service: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border border-[var(--color-border)]"
                />
                service
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={writeCleanup}
                  onChange={(event) => setWriteCleanup(event.target.checked)}
                  className="h-4 w-4 rounded border border-[var(--color-border)]"
                />
                cleanup
              </label>
              <button
                type="button"
                onClick={runWriteTests}
                disabled={!writeAllowed || writeRunning}
                className="rounded-full bg-[var(--color-ink)] px-3 py-1 text-xs font-semibold text-[var(--color-paper)] transition hover:bg-[var(--color-ink-muted)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {writeRunning ? "Running" : "Run write tests"}
              </button>
            </div>
            {Object.keys(writeResults).length > 0 && (
              <div className="space-y-2 text-xs text-[var(--color-ink-muted)]">
                {Object.entries(writeResults).map(([mode, result]) => (
                  <div
                    key={`write-${mode}`}
                    className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                      <span>{mode}</span>
                      <span className="rounded-full bg-[var(--color-surface-muted)] px-2 py-0.5 text-[10px]">
                        {result.ok ? "ok" : "error"}
                      </span>
                    </div>
                    <div className="mt-1 break-all text-xs text-[var(--color-ink-muted)]">
                      status {result.status ?? "n/a"}
                    </div>
                    {result.error && (
                      <div className="mt-1 break-all text-xs text-[var(--color-danger)]">
                        {result.error}
                      </div>
                    )}
                    {result.cleanupStatus && (
                      <div className="mt-1 break-all text-xs text-[var(--color-ink-muted)]">
                        cleanup {result.cleanupStatus}
                      </div>
                    )}
                    {result.cleanupError && (
                      <div className="mt-1 break-all text-xs text-[var(--color-danger)]">
                        {result.cleanupError}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
