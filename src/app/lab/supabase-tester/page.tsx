"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
    publicTableEntries,
    deepReport,
    tableViewer,
    tableRows,
    tableColumns,
    tableTotal,
    tablePageSize,
    setTablePageSize,
    tableMode,
    setTableMode,
    tableLoading,
    tableError,
    handleViewTable,
    loadTableRows,
    tableSchemas,
  } = useInspector();

  const issuePreview = issueItems.slice(0, 4);
  const tableCount = tableEntries.length;
  const [tableSearch, setTableSearch] = useState("");
  const autoRunKey = useRef<string>("");

  useEffect(() => {
    if (!inspectionHosts.length) return;
    const key = inspectionHosts.join("|");
    if (autoRunKey.current === key) return;
    autoRunKey.current = key;
    runDeepInspection();
  }, [inspectionHosts, runDeepInspection]);

  const publicAudits = useMemo(() => {
    if (!deepReport) return [];
    return deepReport.tables.filter(
      (table) => typeof table.anonStatus === "number" && table.anonStatus < 400
    );
  }, [deepReport]);

  const auditByKey = useMemo(() => {
    return new Map(publicAudits.map((table) => [`${table.host}::${table.table}`, table]));
  }, [publicAudits]);

  const filteredTables = useMemo(() => {
    if (!tableSearch.trim()) return publicTableEntries;
    const term = tableSearch.trim().toLowerCase();
    return publicTableEntries.filter((entry) =>
      `${entry.host} ${entry.table}`.toLowerCase().includes(term)
    );
  }, [publicTableEntries, tableSearch]);

  const activeSchema = tableViewer ? tableSchemas[tableViewer.table] : null;
  const schemaEntries = activeSchema ? Object.entries(activeSchema) : [];
  const displayColumns = tableColumns.length
    ? tableColumns
    : schemaEntries.map(([name]) => name);

  const getCellText = (value: unknown) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "object") {
      try {
        return JSON.stringify(value);
      } catch {
        return String(value);
      }
    }
    return String(value);
  };

  useEffect(() => {
    if (!publicTableEntries.length) return;
    if (tableViewer) return;
    const first = publicTableEntries[0];
    if (!first) return;
    setTableMode("anon");
    handleViewTable(first, "anon");
  }, [handleViewTable, publicTableEntries, setTableMode, tableViewer]);

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
          <h1 className="mt-6 max-w-2xl font-heading text-4xl leading-tight text-[var(--color-ink)] sm:text-5xl">
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

        <section className="mt-10 rounded-[var(--radius-card)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                Public table explorer
              </h2>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                Styled after Supabase&apos;s table editor. Publicly readable tables load automatically.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              <span className="rounded-full bg-[var(--color-surface-muted)] px-3 py-1">
                Tables {publicTableEntries.length}
              </span>
              {deepRunning && (
                <span className="rounded-full bg-[var(--color-surface-muted)] px-3 py-1">
                  Scanning
                </span>
              )}
              {tableViewer && (
                <span className="rounded-full bg-[var(--color-surface-muted)] px-3 py-1">
                  Viewing {tableViewer.table}
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,0.7fr)]">
            <div className="overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                Tables
                <input
                  type="search"
                  value={tableSearch}
                  onChange={(event) => setTableSearch(event.target.value)}
                  placeholder="Search"
                  className="ml-auto w-32 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-[10px] text-[var(--color-ink)] focus:outline-none"
                />
              </div>
              <div className="max-h-[360px] overflow-auto">
                {filteredTables.length === 0 ? (
                  <div className="px-4 py-6 text-xs text-[var(--color-ink-muted)]">
                    {publicTableEntries.length === 0
                      ? "Run a scan to detect publicly readable tables."
                      : "No tables match that search."}
                  </div>
                ) : (
                  filteredTables.map((entry) => {
                    const key = `${entry.host}::${entry.table}`;
                    const audit = auditByKey.get(key);
                    const isActive =
                      tableViewer?.host === entry.host &&
                      tableViewer?.table === entry.table;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleViewTable(entry, "anon")}
                        className={`w-full border-b border-[var(--color-border)] px-4 py-3 text-left text-xs transition ${
                          isActive
                            ? "bg-[var(--color-surface)] text-[var(--color-ink)]"
                            : "text-[var(--color-ink-muted)] hover:bg-[var(--color-surface)]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold text-[var(--color-ink)]">
                            {entry.table}
                          </span>
                          {typeof audit?.anonRows === "number" && (
                            <span className="rounded-full bg-[var(--color-surface-muted)] px-2 py-0.5 text-[10px] text-[var(--color-ink-muted)]">
                              {audit.anonRows} rows
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-[10px] text-[var(--color-ink-muted)]">
                          {entry.host}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-ink)]">
                    {tableViewer ? tableViewer.table : "Select a table"}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                    {tableViewer ? tableViewer.host : "Public read only"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                  <span className="rounded-full bg-[var(--color-surface-muted)] px-2 py-1">
                    Mode {tableMode}
                  </span>
                  {typeof tableTotal === "number" && (
                    <span className="rounded-full bg-[var(--color-surface-muted)] px-2 py-1">
                      Total {tableTotal}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,220px)]">
                <div className="overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="max-h-[360px] overflow-auto">
                    {tableLoading ? (
                      <div className="px-4 py-6 text-xs text-[var(--color-ink-muted)]">
                        Loading rows...
                      </div>
                    ) : tableRows.length === 0 ? (
                      <div className="px-4 py-6 text-xs text-[var(--color-ink-muted)]">
                        {tableViewer
                          ? "No rows returned for this table."
                          : "Select a table to view rows."}
                      </div>
                    ) : (
                      <table className="min-w-full table-fixed border-collapse text-xs">
                        <thead className="sticky top-0 z-10 bg-[var(--color-surface-muted)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                          <tr>
                            <th className="w-16 px-3 py-2 text-left">Row</th>
                            {displayColumns.map((column) => (
                              <th
                                key={column}
                                className="px-3 py-2 text-left"
                                title={column}
                              >
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="text-[11px] text-[var(--color-ink)]">
                          {tableRows.map((row, index) => (
                            <tr
                              key={`${tableViewer?.table}-${index}`}
                              className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]"
                            >
                              <td className="px-3 py-2 text-[10px] text-[var(--color-ink-muted)]">
                                {index + 1}
                              </td>
                              {displayColumns.map((column) => (
                                <td key={`${column}-${index}`} className="px-3 py-2">
                                  <div
                                    className="max-w-[240px] truncate"
                                    title={getCellText(row[column])}
                                  >
                                    {getCellText(row[column])}
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                  {tableError && (
                    <div className="border-t border-[var(--color-border)] px-4 py-2 text-xs text-[var(--color-danger)]">
                      {tableError}
                    </div>
                  )}
                </div>

                <div className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                    Columns
                  </div>
                  {schemaEntries.length === 0 ? (
                    <div className="mt-3 text-xs text-[var(--color-ink-muted)]">
                      {tableViewer ? "Schema not available." : "Select a table."}
                    </div>
                  ) : (
                    <div className="mt-3 space-y-2 text-xs text-[var(--color-ink)]">
                      {schemaEntries.map(([name, type]) => (
                        <div key={name} className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2">
                          <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                            {type}
                          </div>
                          <div className="mt-1 text-xs text-[var(--color-ink)]">
                            {name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] px-4 py-3 text-xs text-[var(--color-ink-muted)]">
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2">
                    Mode
                    <select
                      value={tableMode}
                      onChange={(event) =>
                        setTableMode(event.target.value as "anon" | "auth" | "service")
                      }
                      className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-xs text-[var(--color-ink)]"
                    >
                      <option value="anon">anon</option>
                      <option value="auth">auth</option>
                      <option value="service">service</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-2">
                    Page size
                    <input
                      type="number"
                      min={10}
                      max={200}
                      value={tablePageSize}
                      onChange={(event) => setTablePageSize(Number(event.target.value))}
                      className="w-20 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-xs text-[var(--color-ink)]"
                    />
                  </label>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => tableViewer && loadTableRows(tableViewer, 0, false)}
                    disabled={!tableViewer || tableLoading}
                    className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold text-[var(--color-ink)] hover:border-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {tableLoading ? "Loading" : "Reload rows"}
                  </button>
                  <button
                    type="button"
                    onClick={() => tableViewer && loadTableRows(tableViewer, 0, false)}
                    disabled={!tableViewer || tableLoading}
                    className="rounded-full bg-[var(--color-ink)] px-3 py-1 text-xs font-semibold text-[var(--color-paper)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Sync
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
