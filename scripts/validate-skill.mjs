// Check a skill folder or ZIP against Claude's custom-skill upload rules.
// Usage: node scripts/validate-skill.mjs skill/meeting-handoff
//        node scripts/validate-skill.mjs --zip meeting-handoff.zip
// Rules (Claude help center, "How to create custom skills"):
//  - ZIP holds one top-level folder (no loose files), named like the skill
//  - folder has SKILL.md starting with YAML frontmatter
//  - name <= 64 chars, description <= 200 chars, both required
//  - name is lowercase-hyphenated; only known frontmatter keys
//  - every .md link in SKILL.md resolves; SKILL.md under 500 lines
import { readFileSync, readdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, basename, relative } from "node:path";

const ALLOWED = new Set(["name","description","license","compatibility","metadata","allowed-tools","dependencies"]);
const fail = (m) => { console.log("  FAIL:", m); process.exitCode = 1; };

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const args = process.argv.slice(2);
let files = {}, root, label;
if (args[0] === "--zip") {
  label = `ZIP ${args[1]}`;
  const names = execFileSync("unzip", ["-Z1", args[1]], { encoding: "utf8" }).split("\n").filter((n) => n && !n.endsWith("/"));
  const bad = names.filter((n) => !n.includes("/") || n.includes("__MACOSX") || n.endsWith(".DS_Store"));
  if (bad.length) { fail(`loose or junk files: ${bad}`); process.exit(1); }
  const tops = [...new Set(names.map((n) => n.split("/")[0]))];
  if (tops.length !== 1) { fail(`need exactly one top-level folder, found ${tops}`); process.exit(1); }
  root = tops[0];
  for (const n of names) files[n] = execFileSync("unzip", ["-p", args[1], n], { encoding: "utf8" });
} else {
  root = basename(args[0]); label = `folder ${args[0]}`;
  for (const p of walk(args[0])) if (!p.endsWith(".DS_Store")) files[`${root}/${relative(args[0], p)}`] = readFileSync(p, "utf8");
}
console.log(`Checking ${label}`);
const md = files[`${root}/SKILL.md`];
if (!md) { fail(`missing ${root}/SKILL.md`); process.exit(1); }
if (!md.startsWith("---\n")) fail("SKILL.md must start with --- frontmatter");
const end = md.indexOf("\n---", 4);
const fm = {};
for (const line of md.slice(4, end).split("\n")) {
  const m = line.match(/^([A-Za-z-]+):\s*(.*)$/);
  if (m) fm[m[1]] = m[2];
}
const name = fm.name ?? "", desc = fm.description ?? "";
if (!name) fail("missing name"); if (!desc) fail("missing description");
if (name.length > 64) fail(`name is ${name.length} chars (max 64)`);
if (desc.length > 200) fail(`description is ${desc.length} chars (max 200)`);
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) fail(`name '${name}' should be lowercase-hyphenated`);
if (name !== root) fail(`folder '${root}' doesn't match name '${name}'`);
const extra = Object.keys(fm).filter((k) => !ALLOWED.has(k));
if (extra.length) fail(`unexpected frontmatter keys: ${extra}`);
for (const [, link] of md.matchAll(/\]\(([^)#]+\.md)\)/g)) if (!files[`${root}/${link}`]) fail(`broken link: ${link}`);
const lines = md.split("\n").length;
if (lines > 500) fail(`SKILL.md is ${lines} lines (keep under 500)`);
for (const [p, t] of Object.entries(files)) if (/�/.test(t)) fail(`${p} isn't valid UTF-8`);
console.log(`  name='${name}' (${name.length} chars), description ${desc.length} chars, SKILL.md ${lines} lines, ${Object.keys(files).length} files`);
if (!process.exitCode) console.log("  PASS");
