export type Exercise = {
  id: string;
  name: string;
  options?: string[];
  reps: string;
  pattern: string;
  note: string;
  tradeoff: string;
  original?: boolean;
  regular?: boolean;
};
export const exercises: Exercise[] = [
  {
    id: "legs",
    name: "Seated V leg press",
    reps: "8–12",
    pattern: "Knee dominant",
    original: true,
    note: "Quads & glutes",
    tradeoff:
      "Your original leg press, with the machine you use now. Use a controlled, comfortable range.",
  },
  {
    id: "press",
    name: "Machine chest press",
    options: ["Machine chest press", "Machine incline press"],
    reps: "8–12",
    pattern: "Chest press",
    original: true,
    note: "Chest, front delts & triceps",
    tradeoff:
      "Either press fills this slot. Incline changes the angle; keep separate weight records for each machine.",
  },
  {
    id: "pull",
    name: "Assisted pull-up",
    options: ["Assisted pull-up", "Lat pulldown", "Low cable row"],
    reps: "8–12",
    pattern: "Vertical pull",
    original: true,
    note: "Back & biceps",
    tradeoff:
      "Pull-ups and pulldowns are vertical pulls. A cable row is a horizontal pull; use both patterns across the week when practical.",
  },
  {
    id: "curl",
    name: "Seated leg curl",
    options: ["Seated leg curl", "Lying leg curl"],
    reps: "10–15",
    pattern: "Knee flexion",
    original: true,
    note: "Hamstrings",
    tradeoff:
      "Seated or lying both fit your original hamstring slot. Choose the one that feels comfortable and track it consistently.",
  },
  {
    id: "core",
    name: "Dead bug",
    reps: "6–8 / side",
    pattern: "Core",
    original: true,
    note: "Trunk control",
    tradeoff:
      "Keep this from the original routine. One set includes both sides; move slowly without arching your back.",
  },
  {
    id: "lateral",
    name: "Lateral raise",
    reps: "12–20",
    pattern: "Shoulder isolation",
    regular: true,
    note: "Side delts",
    tradeoff:
      "A regular part of your edited routine. Adds direct side delt work alongside your presses.",
  },
  {
    id: "calf",
    name: "Calf raise machine",
    reps: "10–20",
    pattern: "Calves",
    note: "Calves",
    tradeoff:
      "Adds direct calf work that the leg press does not cover in the same way.",
  },
  {
    id: "row",
    name: "Low cable row",
    reps: "8–12",
    pattern: "Horizontal pull",
    note: "Back & biceps",
    tradeoff:
      "Adds horizontal pulling when your main pull is vertical. If you choose a row in the main slot, this extra is already covered.",
  },
  {
    id: "rear",
    name: "Rear delt machine",
    reps: "12–20",
    pattern: "Rear delts",
    note: "Rear delts & upper back",
    tradeoff:
      "Use the reverse setting on the fly machine. Adds direct rear delt work, with some overlap from rows.",
  },
  {
    id: "biceps",
    name: "Preacher curl machine",
    reps: "10–15",
    pattern: "Arm isolation",
    note: "Biceps",
    tradeoff:
      "Adds direct biceps work. Your pull-ups, pulldowns and rows already involve the biceps.",
  },
  {
    id: "fly",
    name: "Chest fly machine",
    reps: "10–15",
    pattern: "Chest isolation",
    note: "Chest",
    tradeoff:
      "More chest work after pressing, with less triceps involvement. Useful extra volume if you recover well.",
  },
  {
    id: "shoulder",
    name: "Shoulder press",
    reps: "8–12",
    pattern: "Overhead press",
    note: "Delts & triceps",
    tradeoff:
      "Adds overhead pressing. It also asks more of the front delts and triceps already involved in chest pressing.",
  },
];
export type Schedule = "alternate" | "fixed";
export type Selection = { sets: number; option: number; enabled: boolean };
export type Plan = Record<string, Selection>;
export function defaultPlan(original = false): Plan {
  return Object.fromEntries(
    exercises.map((e) => [
      e.id,
      {
        sets: 2,
        option: 0,
        enabled: !!e.original || (!original && !!e.regular),
      },
    ]),
  );
}
export function normalizePlan(value: unknown): Plan {
  const plan = defaultPlan();
  if (!value || typeof value !== "object") return plan;
  for (const e of exercises) {
    const v = (value as Record<string, Partial<Selection>>)[e.id];
    if (!v || typeof v !== "object") continue;
    plan[e.id] = {
      sets:
        Number.isInteger(v.sets) && Number(v.sets) >= 1 && Number(v.sets) <= 4
          ? Number(v.sets)
          : 2,
      option:
        Number.isInteger(v.option) &&
        Number(v.option) >= 0 &&
        Number(v.option) < (e.options?.length ?? 1)
          ? Number(v.option)
          : 0,
      enabled: typeof v.enabled === "boolean" ? v.enabled : plan[e.id].enabled,
    };
  }
  if (plan.pull.option === 2 && plan.pull.enabled) plan.row.enabled = false;
  return plan;
}
export function summarize(plan: Plan, schedule: Schedule) {
  const selected = exercises.filter((e) => plan[e.id].enabled);
  const sets = selected.reduce((sum, e) => sum + plan[e.id].sets, 0);
  const sessions = schedule === "alternate" ? 7 : 6;
  // Planning estimate: 5–8 minutes warming up, 2–3 minutes per set including rest,
  // and one minute per transition. It is not a measured workout duration.
  const transitions = Math.max(0, selected.length - 1);
  return {
    selected,
    sets,
    sessions,
    fortnightSets: sets * sessions,
    minutes: sets
      ? [5 + 2 * sets + transitions, 8 + 3 * sets + transitions]
      : [0, 0],
  };
}
export function scheduleDays(schedule: Schedule) {
  return Array.from({ length: 14 }, (_, i) =>
    schedule === "alternate" ? i % 2 === 0 : [0, 2, 4].includes(i % 7),
  );
}
