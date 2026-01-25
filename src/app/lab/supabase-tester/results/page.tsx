"use client";

import Link from "next/link";
import { useInspector } from "../providers/InspectorProvider";
import { SupabaseTesterNav } from "../SupabaseTesterNav";

export default function ResultsPage() {
  const { issueItems, signalItems, report, deepReport } = useInspector();

  const high = issueItems.filter((item) => item.severity === "high");
  const medium = issueItems.filter((item) => item.severity === "medium");
  const low = issueItems.filter((item) => item.severity === "low");
  const info = issueItems.filter((item) => item.severity === "info");
  const totalIssues = issueItems.length;

  const riskCount =
    deepReport?.vectorResults.filter((item) => item.status === "risk").length ??
    0;
  const warningCount = deepReport?.warnings.length ?? 0;
  const tableCount = deepReport?.tableEntries.length ?? 0;
  const publicBuckets =
    deepReport?.bucketSummaries.filter((bucket) => bucket.isPublic).length ?? 0;

  return (
    <div className="min-h-screen pb-16">
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="animate-rise-in mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--color-ink-muted)]">
              Results
            </span>
            <Link
              href="/lab"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]"
            >
              Back to Lab
            </Link>
          </div>
          <h1 className="mt-6 max-w-2xl font-[var(--font-serif)] text-4xl leading-tight text-[var(--color-ink)] sm:text-5xl">
            Results and issues
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-ink-muted)]">
            Review issues and signals from run tests and deep inspection.
          </p>
          <SupabaseTesterNav className="mt-6" />
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <section className="space-y-6">
            <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-card)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                    Severity snapshot
                  </div>
                  <div className="mt-2 text-sm text-[var(--color-ink)]">
                    Total issues {totalIssues}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-[var(--color-ink-muted)]">
                  <span className="rounded-full bg-[var(--color-surface-muted)] px-2 py-1">
                    High {high.length}
                  </span>
                  <span className="rounded-full bg-[var(--color-surface-muted)] px-2 py-1">
                    Medium {medium.length}
                  </span>
                  <span className="rounded-full bg-[var(--color-surface-muted)] px-2 py-1">
                    Low {low.length}
                  </span>
                  <span className="rounded-full bg-[var(--color-surface-muted)] px-2 py-1">
                    Info {info.length}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--color-ink-muted)]">
                Severity reflects likelihood and impact signals. Confirm with your business impact before triage decisions.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                Issues
              </h2>
              {issueItems.length === 0 ? (
                <div className="mt-4 rounded-[16px] border border-dashed border-[var(--color-border)] px-4 py-5 text-sm text-[var(--color-ink-muted)]">
                  Run tests to generate issues.
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {[
                    { label: "High", items: high },
                    { label: "Medium", items: medium },
                    { label: "Low", items: low },
                    { label: "Info", items: info },
                  ].map(
                    (group) =>
                      group.items.length > 0 ? (
                        <div key={group.label}>
                          <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                            {group.label}
                          </div>
                          <div className="mt-2 space-y-2">
                            {group.items.map((item) => (
                              <div
                                key={item.id}
                                className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-xs"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                                  <span>{item.source}</span>
                                  <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5 text-[10px]">
                                    {group.label}
                                  </span>
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
                        </div>
                      ) : null
                  )}
                </div>
              )}
            </div>

            <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                Signals
              </h2>
              {signalItems.length === 0 ? (
                <div className="mt-4 rounded-[16px] border border-dashed border-[var(--color-border)] px-4 py-5 text-sm text-[var(--color-ink-muted)]">
                  No signals yet.
                </div>
              ) : (
                <div className="mt-4 space-y-2 text-sm text-[var(--color-ink-muted)]">
                  {signalItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-xs text-[var(--color-ink)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                Run tests
              </h2>
              {!report ? (
                <div className="mt-4 rounded-[16px] border border-dashed border-[var(--color-border)] px-4 py-5 text-sm text-[var(--color-ink-muted)]">
                  Run tests to see status.
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
                Deep inspection
              </h2>
              {!deepReport ? (
                <div className="mt-4 rounded-[16px] border border-dashed border-[var(--color-border)] px-4 py-5 text-sm text-[var(--color-ink-muted)]">
                  Run deep inspection to see status.
                </div>
              ) : (
                <div className="mt-4 space-y-3 text-sm text-[var(--color-ink)]">
                  <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                      Summary
                    </div>
                    <div className="mt-2 text-sm">{deepReport.createdAt}</div>
                    <div className="mt-2 text-xs text-[var(--color-ink-muted)]">
                      Tables {tableCount}
                    </div>
                  </div>
                  <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                      Coverage
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-[var(--color-ink-muted)]">
                      <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5">
                        Warnings {warningCount}
                      </span>
                      <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5">
                        Risks {riskCount}
                      </span>
                      <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5">
                        Public buckets {publicBuckets}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
