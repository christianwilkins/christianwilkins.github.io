"use client";

import Link from "next/link";
import { useInspector } from "./providers/InspectorProvider";
import { SupabaseTesterNav } from "./SupabaseTesterNav";

export default function Home() {
  const {
    rawInput,
    projectDomains,
    includeDerived,
    supabaseRefs,
    handleInputChange,
    handleDomainInputChange,
    handleIncludeDerivedChange,
    runAllTests,
    runningAll,
    report,
    runDeepInspection,
    deepRunning,
    inspectionHosts,
    issueItems,
    signalItems,
    tableEntries,
  } = useInspector();

  const issuePreview = issueItems.slice(0, 4);
  const tableCount = tableEntries.length;

  return (
    <div className="min-h-screen pb-16">
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="animate-rise-in mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--color-ink-muted)]">
              Supabase inspector
            </span>
            <Link
              href="/lab"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]"
            >
              Back to Lab
            </Link>
          </div>
          <h1 className="mt-6 max-w-2xl font-[var(--font-serif)] text-4xl leading-tight text-[var(--color-ink)] sm:text-5xl">
            Supabase Exposure Explorer
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-ink-muted)]">
            Paste a public domain or url, then run a guided test suite. Results
            stay in your browser.
          </p>
          <SupabaseTesterNav className="mt-6" />
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <section className="space-y-6">
            <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                Step 1 Input
              </h2>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                Paste urls or network logs. Or just enter the public domain for
                your app.
              </p>
              <textarea
                value={rawInput}
                onChange={(event) => handleInputChange(event.target.value)}
                placeholder="Paste urls or network output here"
                rows={5}
                className="mt-4 w-full break-all rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm text-[var(--color-ink)] shadow-[var(--shadow-soft)] focus:border-[var(--color-accent)] focus:outline-none"
              />
              <label className="mt-4 block text-sm text-[var(--color-ink-muted)]">
                Project domain names
                <textarea
                  value={projectDomains}
                  onChange={(event) =>
                    handleDomainInputChange(event.target.value)
                  }
                  placeholder="myapp.com or myproject.supabase.co"
                  rows={2}
                  className="mt-2 w-full break-all rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm text-[var(--color-ink)] shadow-[var(--shadow-soft)] focus:border-[var(--color-accent)] focus:outline-none"
                />
              </label>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--color-ink-muted)]">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeDerived}
                    onChange={(event) =>
                      handleIncludeDerivedChange(event.target.checked)
                    }
                    className="h-4 w-4 rounded border border-[var(--color-border)]"
                  />
                  Include common Supabase endpoints
                </label>
                {supabaseRefs.length > 0 && (
                  <span className="rounded-full bg-[var(--color-surface-muted)] px-3 py-1">
                    Project refs {supabaseRefs.join(", ")}
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                Step 2 Run tests
              </h2>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                Run the standard probes. Deep inspection is optional and uses
                a service role key if provided.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={runAllTests}
                  disabled={runningAll}
                  className="rounded-full bg-[var(--color-ink)] px-5 py-2 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-[var(--color-ink-muted)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {runningAll ? "Running" : "Run all tests"}
                </button>
                <button
                  type="button"
                  onClick={runDeepInspection}
                  disabled={deepRunning || inspectionHosts.length === 0}
                  className="rounded-full border border-[var(--color-border)] px-5 py-2 text-sm font-semibold text-[var(--color-ink)]"
                >
                  {deepRunning ? "Running" : "Run deep inspection"}
                </button>
              </div>

              <div className="mt-4 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                    Issues
                  </div>
                  <Link
                    href="/lab/supabase-tester/results"
                    className="text-xs font-semibold text-[var(--color-ink)]"
                  >
                    View full results
                  </Link>
                </div>
                {issueItems.length === 0 ? (
                  <div className="mt-3 text-sm text-[var(--color-ink-muted)]">
                    Run tests to see issues and signals.
                  </div>
                ) : (
                  <div className="mt-3 space-y-2 text-sm text-[var(--color-ink)]">
                    {issuePreview.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs"
                      >
                        <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                          {item.severity}
                        </div>
                        <div className="mt-1 text-[12px] text-[var(--color-ink)]">
                          {item.title}
                        </div>
                        {item.detail && (
                          <div className="mt-1 text-[11px] text-[var(--color-ink-muted)]">
                            {item.detail}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {signalItems.length > 0 && (
                  <div className="mt-3 text-xs text-[var(--color-ink-muted)]">
                    {signalItems.slice(0, 3).join(", ")}
                  </div>
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                Latest report
              </h2>
              {!report ? (
                <div className="mt-4 rounded-[16px] border border-dashed border-[var(--color-border)] px-4 py-5 text-sm text-[var(--color-ink-muted)]">
                  Run the test suite to generate a report.
                </div>
              ) : (
                <div className="mt-4 space-y-3 text-sm text-[var(--color-ink)]">
                  <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                      Summary
                    </div>
                    <div className="mt-2 text-sm">{report.createdAt}</div>
                    <div className="mt-2 text-xs text-[var(--color-ink-muted)]">
                      {report.authMode}
                    </div>
                  </div>
                  <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                      Http
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-[var(--color-ink-muted)]">
                      <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5">
                        Total {report.httpTotal}
                      </span>
                      <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5">
                        Ok {report.httpOk}
                      </span>
                      <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5">
                        Error {report.httpError}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                      Websocket
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-[var(--color-ink-muted)]">
                      <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5">
                        Total {report.wsTotal}
                      </span>
                      <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5">
                        Open {report.wsOpen}
                      </span>
                      <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5">
                        Error {report.wsError}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                Shortcuts
              </h2>
              <div className="mt-4 space-y-3 text-sm text-[var(--color-ink-muted)]">
                <Link
                  href="/lab/supabase-tester/tables"
                  className="block rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-[var(--color-ink)]"
                >
                  <div className="flex items-center justify-between">
                    <span>View tables and schema</span>
                    {tableCount > 0 && (
                      <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5 text-xs text-[var(--color-ink)]">
                        {tableCount}
                      </span>
                    )}
                  </div>
                </Link>
                <Link
                  href="/lab/supabase-tester/writes"
                  className="block rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-[var(--color-ink)]"
                >
                  Run write tests
                </Link>
                <Link
                  href="/lab/supabase-tester/results"
                  className="block rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-[var(--color-ink)]"
                >
                  View results
                </Link>
                <Link
                  href="/lab/supabase-tester/settings"
                  className="block rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-[var(--color-ink)]"
                >
                  Update headers and timeouts
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
