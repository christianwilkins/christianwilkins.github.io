import test from "node:test";
import assert from "node:assert/strict";
import {
  defaultPlan,
  normalizePlan,
  summarize,
  scheduleDays,
} from "./routine.ts";
test("original, edited and all extras retain the correct working set totals", () => {
  assert.equal(summarize(defaultPlan(true), "alternate").sets, 10);
  const edited = defaultPlan();
  assert.equal(summarize(edited, "alternate").sets, 12);
  for (const v of Object.values(edited)) v.enabled = true;
  assert.equal(summarize(edited, "alternate").sets, 24);
});
test("two week schedule and volume distinguish every other day from fixed weekdays", () => {
  assert.equal(scheduleDays("alternate").filter(Boolean).length, 7);
  assert.equal(scheduleDays("fixed").filter(Boolean).length, 6);
  assert.equal(summarize(defaultPlan(), "alternate").fortnightSets, 84);
  assert.equal(summarize(defaultPlan(), "fixed").fortnightSets, 72);
});
test("saved values are bounded and duplicate row slots are removed", () => {
  const plan = normalizePlan({
    legs: { sets: 99 },
    press: { sets: 3, option: 42, enabled: true },
    pull: { option: 2, enabled: true },
    row: { enabled: true },
  });
  assert.equal(plan.legs.sets, 2);
  assert.equal(plan.press.sets, 3);
  assert.equal(plan.press.option, 0);
  assert.equal(plan.row.enabled, false);
  assert.deepEqual(normalizePlan(null), defaultPlan());
});
test("an empty selection has no phantom workout time", () => {
  const p = defaultPlan();
  for (const s of Object.values(p)) s.enabled = false;
  assert.deepEqual(summarize(p, "fixed").minutes, [0, 0]);
});
