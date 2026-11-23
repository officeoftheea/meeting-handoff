// Mechanical checks on the example files:
// 1. Every "Tue Dec 1"-style date names the right weekday for its year (2026).
// 2. Drafts (blockquotes after "Draft") contain no em dashes.
// 3. The skill's built-in Acme reference contains every sample input sentence.
// 4. Every quoted "Source" sentence in expected outputs appears word for word in an input.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const walk = (d) => readdirSync(d).flatMap((f) => statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]);
const files = [...walk("examples"), ...walk("skill"), "README.md", "SETUP.md", "SCHEDULING.md"].filter((f) => f.endsWith(".md"));
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"], MON = { Nov: 10, Dec: 11 };
let bad = 0, n = 0;
for (const f of files) {
  const t = readFileSync(f, "utf8");
  for (const m of t.matchAll(/\b(Sun|Mon|Tue|Wed|Thu|Fri|Sat) (Nov|Dec) (\d{1,2})\b/g)) {
    n++; const d = new Date(2026, MON[m[2]], +m[3]);
    if (DAYS[d.getDay()] !== m[1]) { bad++; console.log(`DATE FAIL ${f}: "${m[0]}" is a ${DAYS[d.getDay()]}`); }
  }
}
console.log(`dates checked: ${n}, wrong: ${bad}`);
let dash = 0;
for (const f of files.filter((f) => f.includes("expected"))) {
  const lines = readFileSync(f, "utf8").split("\n").filter((l) => l.startsWith("> ") && !l.startsWith("> **"));
  for (const l of lines) if (l.includes("—")) { dash++; console.log(`EM DASH in draft ${f}: ${l.slice(0, 60)}`); }
}
console.log(`em dashes in drafts: ${dash}`);
const inputs = ["examples/acme/01-recap-acme-customer-call.md","examples/acme/02-recap-acme-project-review.md","examples/acme/03-agenda-acme-rollout.md","examples/acme/04-calendar-acme.md"].map((f) => readFileSync(f, "utf8")).join("\n");
const ref = readFileSync("skill/meeting-handoff/references/acme-example.md", "utf8");
const sentences = [...inputs.matchAll(/^- (.+)$/gm)].map((m) => m[1]);
const missing = sentences.filter((s) => !ref.includes(s));
console.log(`input sentences in built-in reference: ${sentences.length - missing.length}/${sentences.length}`); missing.forEach((s) => console.log("  MISSING:", s));
let qbad = 0, qn = 0;
for (const f of ["examples/acme/expected-handoff-run-1.md"]) {
  for (const m of readFileSync(f, "utf8").matchAll(/^- "([^"]+)" \(Recap/gm)) { qn++; if (!inputs.includes(m[1])) { qbad++; console.log("QUOTE NOT VERBATIM:", m[1]); } }
  for (const m of readFileSync(f, "utf8").matchAll(/Source: "([^"]+)"/g)) { qn++; if (!inputs.includes(m[1])) { qbad++; console.log("QUOTE NOT VERBATIM:", m[1]); } }
}
console.log(`source quotes checked: ${qn}, not verbatim: ${qbad}`);
process.exitCode = bad || dash || missing.length || qbad ? 1 : 0;
