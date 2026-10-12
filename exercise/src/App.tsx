import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Moon,
  Printer,
  RotateCcw,
  Sun,
} from "lucide-react";
import {
  defaultPlan,
  exercises,
  normalizePlan,
  scheduleDays,
  summarize,
} from "./routine";
import type { Exercise, Plan, Schedule } from "./routine";

const storageKey = "exercise.plan.v1";
function readSaved(): { plan: Plan; schedule: Schedule } {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey) || "null");
    return {
      plan: normalizePlan(data?.plan),
      schedule: data?.schedule === "fixed" ? "fixed" : "alternate",
    };
  } catch {
    return { plan: defaultPlan(), schedule: "alternate" };
  }
}
export default function App() {
  const [saved] = useState(readSaved);
  const [plan, setPlan] = useState(saved.plan);
  const [schedule, setSchedule] = useState<Schedule>(saved.schedule);
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark"),
  );
  const [notice, setNotice] = useState("");
  const [storageAvailable, setStorageAvailable] = useState(true);
  const stats = summarize(plan, schedule);
  const hasRow =
    plan.row.enabled || (plan.pull.enabled && plan.pull.option === 2);
  const hasVertical = plan.pull.enabled && plan.pull.option !== 2;
  const name = (e: Exercise) => e.options?.[plan[e.id].option] || e.name;
  const extraSets = exercises
    .filter((e) => !e.original)
    .reduce((n, e) => n + (plan[e.id].enabled ? plan[e.id].sets : 0), 0);
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ plan, schedule }));
      setStorageAvailable(true);
    } catch {
      setStorageAvailable(false);
    }
  }, [plan, schedule]);
  function update(id: string, change: Partial<Plan[string]>) {
    setPlan((previous) =>
      normalizePlan({ ...previous, [id]: { ...previous[id], ...change } }),
    );
    setNotice("");
  }
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("exercise.theme", next ? "dark" : "light");
    } catch {
      /* Theme works without persistence. */
    }
  }
  function reset() {
    setPlan(defaultPlan());
    setSchedule("alternate");
    setNotice("Edited routine restored.");
  }
  async function copyPlan() {
    const text = [
      "Full body · " +
        (schedule === "alternate"
          ? "Every other day"
          : "Monday, Wednesday, Friday"),
      ...stats.selected.map(
        (e) => `${name(e)} — ${plan[e.id].sets} × ${e.reps}`,
      ),
      `${stats.sets} working sets. Warmups separate.`,
      "https://exercise.chriswiki.com/",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setNotice("Routine copied.");
    } catch {
      setNotice(
        "Copy unavailable in this browser. Use Print routine to save a copy.",
      );
    }
  }
  function exerciseRow(e: Exercise, index: number) {
    const s = plan[e.id];
    const duplicate =
      e.id === "row" && plan.pull.enabled && plan.pull.option === 2;
    return (
      <article className={`exercise ${s.enabled ? "included" : ""}`} key={e.id}>
        <div className="exercise-line">
          <label className="include-control">
            <input
              type="checkbox"
              checked={s.enabled}
              disabled={duplicate}
              onChange={(event) =>
                update(e.id, { enabled: event.target.checked })
              }
              aria-label={`Include ${e.name}`}
            />
            <span className="check-box">
              <Check size={13} strokeWidth={2.5} />
            </span>
          </label>
          <span className="exercise-number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="exercise-title">
            {e.options ? (
              <div className="select-wrap">
                <select
                  aria-label={`${e.name} variation`}
                  value={s.option}
                  onChange={(event) =>
                    update(e.id, { option: Number(event.target.value) })
                  }
                >
                  {e.options.map((option, i) => (
                    <option key={option} value={i}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} aria-hidden="true" />
              </div>
            ) : (
              <h3>{e.name}</h3>
            )}
            <span className="muscles">
              {duplicate ? "Already selected in your main pull slot" : e.note}
            </span>
          </div>
          <label className="sets-control">
            <span className="sr-only">Sets for {e.name}</span>
            <select
              aria-label={`Sets for ${e.name}`}
              value={s.sets}
              disabled={!s.enabled}
              onChange={(event) =>
                update(e.id, { sets: Number(event.target.value) })
              }
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span> × {e.reps}</span>
          </label>
        </div>
        <details className="exercise-detail">
          <summary>
            Why it’s here <ChevronDown size={12} />
          </summary>
          <p>{e.tradeoff}</p>
        </details>
      </article>
    );
  }
  return (
    <>
      <a className="skip-link" href="#routine">
        Skip to routine
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="https://chriswiki.com">
            Christian Wilkins
          </a>
          <span className="header-divider">/</span>
          <span className="sub-brand">Exercise</span>
          <nav aria-label="Main">
            <a className="active" href="#routine">
              Routine
            </a>
            <a href="#tradeoffs">Tradeoffs</a>
            <a href="#progression">Progression</a>
            <button
              onClick={toggleTheme}
              className="icon-button"
              aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </nav>
        </div>
      </header>
      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">A personal field guide / 01</p>
            <h1>
              Full body.
              <br />
              <em>Every other day.</em>
            </h1>
            <p className="hero-copy">
              One familiar workout. A rest day between sessions.
              <br className="desktop-break" /> A few thoughtful edits as the
              routine grows.
            </p>
            <a className="text-link" href="#routine">
              Build today’s session <span>↓</span>
            </a>
          </div>
          <div className="hero-note">
            <span className="note-mark" aria-hidden="true">
              ↗
            </span>
            <p>
              Keep what works.
              <br />
              Understand what
              <br />
              each extra adds.
            </p>
            <span className="small-label">The routine, with room to grow</span>
          </div>
        </section>
        <section
          className="schedule-section rail-section"
          aria-labelledby="rhythm-heading"
        >
          <div className="section-label">
            <span className="eyebrow">01 / The rhythm</span>
            <h2 id="rhythm-heading">Train. Rest. Repeat.</h2>
          </div>
          <div>
            <div className="schedule-top">
              <div
                className="segmented"
                role="group"
                aria-label="Training schedule"
              >
                <button
                  aria-pressed={schedule === "alternate"}
                  onClick={() => setSchedule("alternate")}
                >
                  Every other day
                </button>
                <button
                  aria-pressed={schedule === "fixed"}
                  onClick={() => setSchedule("fixed")}
                >
                  Mon / Wed / Fri
                </button>
              </div>
              <span className="small-label">
                {stats.sessions} sessions / 14 days
              </span>
            </div>
            <div
              className="calendar"
              aria-label="Illustrative two week schedule starting Monday"
            >
              {scheduleDays(schedule).map((train, i) => (
                <div className={`day ${train ? "train" : ""}`} key={i}>
                  <span>{["M", "T", "W", "T", "F", "S", "S"][i % 7]}</span>
                  <span
                    className="day-dot"
                    aria-label={`Week ${Math.floor(i / 7) + 1}, ${["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][i % 7]}: ${train ? "train" : "rest"}`}
                  >
                    {train ? "T" : "·"}
                  </span>
                </div>
              ))}
            </div>
            <p className="caption">
              {schedule === "alternate"
                ? "A rolling rhythm: 3 sessions one week, 4 the next. Training days shift, including weekends."
                : "A fixed rhythm: 3 sessions each week. The weekend gives you two rest days together."}{" "}
              <span className="legend">
                <span>● Train</span>
                <span>○ Rest</span>
              </span>
            </p>
          </div>
        </section>
        <section
          className="routine-section"
          id="routine"
          aria-labelledby="routine-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / The workout</p>
              <h2 id="routine-heading">Same foundation. Your edits.</h2>
            </div>
            <button className="quiet-button" onClick={reset}>
              <RotateCcw size={14} /> Reset edits
            </button>
          </div>
          <p className="section-intro">
            The original five stay in the mix. Lateral raises are a regular
            addition; choose the extras that fit today. Equipment alternatives
            share one slot.
          </p>
          <div className="workout-layout">
            <div className="exercise-list">
              <div className="list-heading">
                <h3>The foundation</h3>
                <span>Working sets × reps</span>
              </div>
              {exercises.slice(0, 6).map(exerciseRow)}
              <div className="list-heading extras-heading">
                <h3>A little extra, when it fits</h3>
                <span>Optional additions</span>
              </div>
              {exercises.slice(6).map((e, i) => exerciseRow(e, i + 6))}
              <p className="caption">
                Start with 2 working sets per exercise, carried over from the
                original plan. Edit sets to match what you actually do. Warmup
                sets are separate.
              </p>
            </div>
            <aside
              className="session-panel"
              id="tradeoffs"
              aria-labelledby="session-heading"
            >
              <div className="panel-title">
                <span className="eyebrow">The tradeoff</span>
                <span className="live-dot" /> Live session
              </div>
              <h2 id="session-heading">What today adds up to.</h2>
              <div className="session-stats" aria-live="polite">
                <div>
                  <strong>{stats.sets}</strong>
                  <span>working sets</span>
                </div>
                <div>
                  <strong>
                    {stats.minutes[0]}–{stats.minutes[1]}
                  </strong>
                  <span>minutes, estimated</span>
                </div>
              </div>
              <div className="comparison-bars">
                <div>
                  <span>Original foundation</span>
                  <span>10 sets</span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-original"
                    style={{ width: `${(10 / 48) * 100}%` }}
                  />
                </div>
                <div>
                  <span>Today’s selection</span>
                  <span>{stats.sets} sets</span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-selected"
                    style={{ width: `${(stats.sets / 48) * 100}%` }}
                  />
                </div>
              </div>
              <p className="panel-note">
                {stats.sets === 0
                  ? "Select an exercise to build your session."
                  : stats.sets > 20
                    ? "A substantial session. All extras are available, but you do not need them all every visit."
                    : extraSets
                      ? `${extraSets} sets from additions to the original five. Keep the amount you can repeat and recover from.`
                      : "A compact session built around the original foundation."}
              </p>
              <div className="coverage">
                <h3>Movement coverage</h3>
                {[
                  ["Leg press", plan.legs.enabled],
                  ["Chest press", plan.press.enabled],
                  ["Vertical pull", hasVertical],
                  ["Horizontal pull", hasRow],
                  ["Leg curl", plan.curl.enabled],
                  ["Core", plan.core.enabled],
                ].map(([label, enabled]) => (
                  <div className="coverage-row" key={String(label)}>
                    <span>{label}</span>
                    <span className={enabled ? "covered" : "not-covered"}>
                      {enabled ? "Included" : "Not today"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="context-notes">
                {!hasRow && (
                  <p>
                    <strong>Room for a row.</strong> Your main pull is{" "}
                    {hasVertical ? "vertical" : "not selected"}. A low cable row
                    adds horizontal pulling; fit it into the week when
                    practical.
                  </p>
                )}
                {hasRow && !hasVertical && (
                  <p>
                    <strong>A different pull.</strong> A row covers horizontal
                    pulling. Work a pull-up or pulldown into another session for
                    vertical pulling.
                  </p>
                )}
                {plan.shoulder.enabled && plan.press.enabled && (
                  <p>
                    <strong>Pressing overlap.</strong> Chest and shoulder
                    presses both involve your front delts and triceps. Count the
                    extra recovery demand.
                  </p>
                )}
                {plan.fly.enabled && plan.press.enabled && (
                  <p>
                    <strong>More chest volume.</strong> The fly adds chest work
                    after your press; it does not fill a missing movement
                    pattern.
                  </p>
                )}
                {plan.biceps.enabled && (hasVertical || hasRow) && (
                  <p>
                    <strong>Extra arm work.</strong> Preacher curls add direct
                    biceps work on top of your pulling.
                  </p>
                )}
              </div>
              <details className="estimate-details">
                <summary>
                  How the estimate works <ChevronDown size={13} />
                </summary>
                <p>
                  5–8 minutes warming up, 2–3 minutes per working set including
                  rest, and 1 minute between exercises. Equipment waits and your
                  pace will change this.
                </p>
                <p>
                  {stats.fortnightSets} total working sets over 14 days if you
                  repeat this exact selection. This is whole session volume, not
                  sets per muscle.
                </p>
              </details>
              <div className="panel-actions">
                <button className="primary-button" onClick={copyPlan}>
                  <Copy size={15} /> Copy routine
                </button>
                <button className="quiet-button" onClick={() => window.print()}>
                  <Printer size={15} /> Print
                </button>
              </div>
              <p className="save-note" role="status">
                {notice ||
                  (storageAvailable
                    ? "Your choices are saved in this browser."
                    : "Browser storage is unavailable. Choices last for this visit.")}
              </p>
            </aside>
          </div>
        </section>
        <section
          className="rail-section progression"
          id="progression"
          aria-labelledby="progression-heading"
        >
          <div className="section-label">
            <p className="eyebrow">03 / Keep it moving</p>
            <h2 id="progression-heading">Earn the next step.</h2>
          </div>
          <div className="progression-steps">
            <article>
              <span>01</span>
              <div>
                <h3>Repeat, then build.</h3>
                <p>
                  Keep the routine while your reps or weights improve and you
                  feel recovered for the next session. You do not need novelty
                  to make progress.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Reps first. Weight next.</h3>
                <p>
                  When every set reaches the top of its rep range with
                  controlled form, try the smallest weight increase. For
                  assisted pull-ups, reduce assistance. Track different machines
                  separately.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Leave some room.</h3>
                <p>
                  The original beginner plan left 3–4 reps in reserve. Keep sets
                  controlled, and take an extra rest day if you need it. Add
                  volume gradually as recovery allows.
                </p>
              </div>
            </article>
            <details className="next-pattern">
              <summary>
                A future addition: the hip hinge <ChevronDown size={15} />
              </summary>
              <p>
                Leg curls train knee flexion; they do not replace a hip hinge. A
                Romanian deadlift or a controlled back extension is a movement
                worth learning with suitable instruction when you are ready. It
                is not automatically added to today’s routine.
              </p>
            </details>
          </div>
        </section>
        <section className="rail-section sources">
          <div className="section-label">
            <span className="eyebrow">Notes / Context</span>
            <h2>A living routine.</h2>
          </div>
          <div>
            <p>
              This is my gym routine, combining the original full body plan with
              the equipment and extras I use now. The controls explore
              tradeoffs; they do not measure recovery or predict results.
            </p>
            <details>
              <summary>
                What the research supports <ChevronDown size={14} />
              </summary>
              <p>
                ACSM’s 2026 guidance emphasizes consistency, training major
                muscle groups at least twice a week, and adapting training to
                the person. Machines are a valid way to train. More volume can
                help, but the returns diminish and recovery still matters.
              </p>
              <a
                href="https://acsm.org/resistance-training-guidelines-update-2026/"
                target="_blank"
                rel="noreferrer"
              >
                ACSM resistance training guidance, 2026{" "}
                <ArrowUpRight size={13} />
              </a>
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/41343037/"
                target="_blank"
                rel="noreferrer"
              >
                Resistance training dose response review{" "}
                <ArrowUpRight size={13} />
              </a>
            </details>
            <a
              className="text-link anatomy-link"
              href="https://gym.chriswiki.com"
            >
              Explore the anatomy guide <ArrowUpRight size={14} />
            </a>
          </div>
        </section>
      </main>
      <a
        className="mobile-session"
        href="#tradeoffs"
        aria-label={`View tradeoffs: ${stats.sets} working sets, ${stats.minutes[0]} to ${stats.minutes[1]} estimated minutes`}
      >
        <span>
          <strong>{stats.sets} sets</strong>
          <span>
            {stats.minutes[0]}–{stats.minutes[1]} min, estimated
          </span>
        </span>
        <span>View tradeoffs ↑</span>
      </a>
      <footer>
        <span>Christian Wilkins / Exercise</span>
        <a href="https://chriswiki.com">
          Back to chriswiki.com <ArrowUpRight size={13} />
        </a>
      </footer>
    </>
  );
}
