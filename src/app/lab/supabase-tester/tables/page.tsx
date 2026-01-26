"use client";

import Link from "next/link";
import { useState } from "react";
import { useInspector, VECTOR_CATALOG } from "../providers/InspectorProvider";
import { SupabaseTesterNav } from "../SupabaseTesterNav";

export default function TablesPage() {
  const {
    deepReport,
    deepRunning,
    runDeepInspection,
    inspectionHosts,
    tableLimit,
    setTableLimit,
    sampleLimit,
    setSampleLimit,
    serviceRoleKey,
    setServiceRoleKey,
    vectorStatusMap,
    tableEntries,
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
    handleLoadMore,
  } = useInspector();

  const [selectedRowIndexByTable, setSelectedRowIndexByTable] = useState<
    Record<string, number>
  >({});
  const [visibleColumnsByTable, setVisibleColumnsByTable] = useState<
    Record<string, string[]>
  >({});

  const tableKey = tableViewer ? `${tableViewer.host}::${tableViewer.table}` : "none";
  const selectedRowIndex = selectedRowIndexByTable[tableKey] ?? 0;
  const safeSelectedRowIndex = Math.min(
    selectedRowIndex,
    Math.max(0, tableRows.length - 1)
  );
  const visibleColumns = visibleColumnsByTable[tableKey] ?? [];
  const selectedRow = tableRows[safeSelectedRowIndex] ?? null;
  const activeColumns = visibleColumns.length > 0 ? visibleColumns : tableColumns;
  const getCellText = (value: unknown) => {
    if (value === null || value === undefined) {
      return "";
    }
    if (typeof value === "object") {
      try {
        return JSON.stringify(value);
      } catch {
        return String(value);
      }
    }
    return String(value);
  };

  const getDetailText = (value: unknown) => {
    if (value === null || value === undefined) {
      return "";
    }
    if (typeof value === "object") {
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return String(value);
      }
    }
    return String(value);
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="animate-rise-in mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--color-ink-muted)]">
              Tables
            </span>
            <Link
              href="/lab"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]"
            >
              Back to Lab
            </Link>
          </div>
          <h1 className="mt-6 max-w-2xl font-heading text-4xl leading-tight text-[var(--color-ink)] sm:text-5xl">
            Tables and schema
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-ink-muted)]">
            Run deep inspection to list tables, review schema visibility, and
            explore rows in a safe viewer.
          </p>
          <SupabaseTesterNav className="mt-6" />
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <section className="space-y-6">
            <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                    Deep inspection
                  </h2>
                  <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                    Pulls schema and sample rows from your Supabase project.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={runDeepInspection}
                  disabled={deepRunning || inspectionHosts.length === 0}
                  className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold text-[var(--color-paper)] transition hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deepRunning ? "Running" : "Run deep inspection"}
                </button>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="block text-sm text-[var(--color-ink-muted)]">
                  Service role key
                  <input
                    type="text"
                    value={serviceRoleKey}
                    onChange={(event) => setServiceRoleKey(event.target.value)}
                    placeholder="Optional"
                    className="mt-2 w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-sm text-[var(--color-ink)]"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-[var(--color-ink-muted)]">
                    Table limit (0 = all)
                    <input
                      type="number"
                      min={0}
                      max={200}
                      value={tableLimit}
                      onChange={(event) =>
                        setTableLimit(Number(event.target.value))
                      }
                      className="mt-2 w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-sm text-[var(--color-ink)]"
                    />
                  </label>
                  <label className="block text-sm text-[var(--color-ink-muted)]">
                    Sample rows
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={sampleLimit}
                      onChange={(event) =>
                        setSampleLimit(Number(event.target.value))
                      }
                      className="mt-2 w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-sm text-[var(--color-ink)]"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                Test suite
              </h2>
              <div className="mt-4 space-y-3 text-xs text-[var(--color-ink-muted)]">
                {VECTOR_CATALOG.map((item) => {
                  const result = vectorStatusMap.get(item.id);
                  const status = result?.status ?? (item.mode === "auto" ? "unknown" : "manual");
                  const notes = result?.notes ?? item.summary;
                  return (
                    <div
                      key={item.id}
                      className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                        <span>{item.component}</span>
                        <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5 text-[10px]">
                          {status}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-[var(--color-ink)]">
                        {item.title}
                      </div>
                      <div className="mt-1 break-all text-xs text-[var(--color-ink-muted)]">
                        {notes}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                Table viewer
              </h2>
              <div className="mt-3 grid gap-3 md:grid-cols-[1.4fr_0.6fr]">
                <label className="text-xs text-[var(--color-ink-muted)]">
                  Table
                  <select
                    value={
                      tableViewer
                        ? `${tableViewer.host}::${tableViewer.table}`
                        : ""
                    }
                    onChange={(event) => {
                      const [host, table] = event.target.value.split("::");
                      if (host && table) {
                        handleViewTable({ host, table });
                      }
                    }}
                    className="mt-2 w-full rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-2 text-xs text-[var(--color-ink)]"
                  >
                    <option value="">Select a table</option>
                    {tableEntries.map((entry) => (
                      <option
                        key={`${entry.host}::${entry.table}`}
                        value={`${entry.host}::${entry.table}`}
                      >
                        {entry.host} {entry.table}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-xs text-[var(--color-ink-muted)]">
                  Mode
                  <select
                    value={tableMode}
                    onChange={(event) =>
                      setTableMode(
                        event.target.value as "anon" | "auth" | "service"
                      )
                    }
                    className="mt-2 w-full rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-2 text-xs text-[var(--color-ink)]"
                  >
                    <option value="anon">anon</option>
                    <option value="auth">auth</option>
                    <option value="service">service</option>
                  </select>
                </label>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--color-ink-muted)]">
                <label className="flex items-center gap-2">
                  Page size
                  <input
                    type="number"
                    min={10}
                    max={200}
                    value={tablePageSize}
                    onChange={(event) =>
                      setTablePageSize(Number(event.target.value))
                    }
                    className="w-20 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-xs text-[var(--color-ink)]"
                  />
                </label>
                <button
                  type="button"
                  onClick={() =>
                    tableViewer && loadTableRows(tableViewer, 0, false)
                  }
                  disabled={!tableViewer || tableLoading}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold text-[var(--color-ink)] hover:border-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {tableLoading ? "Loading" : "Load rows"}
                </button>
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={!tableViewer || tableLoading}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold text-[var(--color-ink)] hover:border-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Load more
                </button>
                {tableTotal !== null && (
                  <span className="rounded-full bg-[var(--color-surface)] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                    total {tableTotal}
                  </span>
                )}
              </div>
              {tableColumns.length > 0 && (
                <details className="mt-3 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-ink-muted)]">
                  <summary className="cursor-pointer text-[11px] font-semibold text-[var(--color-ink)]">
                    Columns
                  </summary>
                  <p className="mt-2 text-[11px] text-[var(--color-ink-muted)]">
                    Hide columns to focus the viewer on the data you need.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleColumnsByTable((prev) => ({
                          ...prev,
                          [tableKey]: tableColumns,
                        }))
                      }
                      className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[10px] font-semibold text-[var(--color-ink)] hover:border-[var(--color-accent)]"
                    >
                      Show all
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleColumnsByTable((prev) => ({
                          ...prev,
                          [tableKey]: [],
                        }))
                      }
                      className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[10px] font-semibold text-[var(--color-ink)] hover:border-[var(--color-accent)]"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="mt-3 max-h-36 space-y-2 overflow-auto pr-1 text-[11px] text-[var(--color-ink)]">
                    {tableColumns.map((column) => {
                      const checked = activeColumns.includes(column);
                      return (
                        <label key={column} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setVisibleColumnsByTable((prev) => {
                                const current = prev[tableKey] ?? tableColumns;
                                const next = current.includes(column)
                                  ? current.filter((item) => item !== column)
                                  : [...current, column];
                                return { ...prev, [tableKey]: next };
                              })
                            }
                            className="h-4 w-4 rounded border border-[var(--color-border)]"
                          />
                          <span className="break-words">{column}</span>
                        </label>
                      );
                    })}
                  </div>
                </details>
              )}
              {tableError && (
                <div className="mt-2 text-xs text-[var(--color-danger)]">
                  {tableError}
                </div>
              )}
              {tableRows.length > 0 && (
                <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                  <div className="overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <div className="max-h-[420px] overflow-auto">
                      <table className="min-w-full table-fixed border-collapse text-xs">
                        <thead className="sticky top-0 z-10 bg-[var(--color-surface-muted)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                          <tr>
                            <th className="w-14 px-2 py-2 text-left">Row</th>
                            {activeColumns.map((column) => (
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
                          {tableRows.map((row, index) => {
                            const isActive = index === safeSelectedRowIndex;
                            return (
                              <tr
                                key={`${tableViewer?.table}-${index}`}
                                className={`${isActive ? "bg-[var(--color-surface-muted)]" : "bg-[var(--color-surface)]"} transition-colors hover:bg-[var(--color-surface-muted)]`}
                              >
                                <td className="border-t border-[var(--color-border)] px-2 py-2 align-top">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setSelectedRowIndexByTable((prev) => ({
                                        ...prev,
                                        [tableKey]: index,
                                      }))
                                    }
                                    className="rounded-full border border-[var(--color-border)] px-2 py-1 text-[10px] font-semibold text-[var(--color-ink)] hover:border-[var(--color-accent)]"
                                  >
                                    View
                                  </button>
                                </td>
                                {activeColumns.map((column) => {
                                  const previewText = getCellText(row[column]);
                                  return (
                                    <td
                                      key={`${column}-${index}`}
                                      className="border-t border-[var(--color-border)] px-2 py-2 align-top"
                                    >
                                      <div
                                        className="max-w-[260px] truncate text-[11px]"
                                        title={previewText}
                                      >
                                        {previewText}
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                      Row detail
                    </div>
                    {!selectedRow ? (
                      <div className="mt-3 text-xs text-[var(--color-ink-muted)]">
                        Select a row to see all fields.
                      </div>
                    ) : (
                      <div className="mt-3 space-y-3">
                        {activeColumns.map((column) => (
                          <div
                            key={`${column}-detail`}
                            className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2"
                          >
                            <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                              {column}
                            </div>
                            <div className="mt-2 whitespace-pre-wrap break-words text-xs text-[var(--color-ink)]">
                              {getDetailText(selectedRow[column])}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-[var(--radius-card)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                Deep inspection summary
              </h2>
              {!deepReport ? (
                <div className="mt-4 rounded-[16px] border border-dashed border-[var(--color-border)] px-4 py-5 text-sm text-[var(--color-ink-muted)]">
                  Run deep inspection to see results.
                </div>
              ) : (
                <div className="mt-4 space-y-3 text-sm text-[var(--color-ink)]">
                  <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                      Report
                    </div>
                    <div className="mt-2 text-sm">{deepReport.createdAt}</div>
                    <div className="mt-2 break-all text-xs text-[var(--color-ink-muted)]">
                      Hosts {deepReport.hosts.join(", ")}
                    </div>
                  </div>
                  {deepReport.warnings.length > 0 && (
                    <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3">
                      <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                        Warnings
                      </div>
                      <div className="mt-2 space-y-2 text-xs text-[var(--color-ink-muted)]">
                        {deepReport.warnings.map((warning) => (
                          <div key={warning} className="break-all">
                            {warning}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
