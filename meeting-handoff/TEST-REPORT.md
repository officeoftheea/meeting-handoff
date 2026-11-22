# Test report

**Build date:** Sun Nov 22, 2026 · **Skill version:** v1 (pre-release)

**Short version:** the package structure and the sample data passed automated checks. The skill's *behavior* has been reviewed on paper against each scenario, but **it hasn't run in a live Claude account yet.** The live checks below need a person with a Claude account before release.

## 1. Checks actually run

| Check | How | Result |
|---|---|---|
| ZIP structure matches Claude's custom skill rules: one top-level folder named like the skill, `SKILL.md` inside, no loose or Mac junk files | `scripts/validate-skill.mjs --zip dist/meeting-handoff.zip` | **Pass** |
| Frontmatter: `name` ≤ 64 chars and lowercase-hyphenated, `description` ≤ 200 chars, only known keys | same script | **Pass** (name 15 chars, description 182 chars) |
| Every reference link in SKILL.md points to a file in the ZIP | same script | **Pass** (3 links) |
| SKILL.md under 500 lines | same script | **Pass** |
| The validator catches broken packages: files loose at the ZIP root, wrong folder name, description over 200 chars | built three broken copies and ran the validator on each | **Pass** (all three rejected) |
| Every weekday/date pair in all docs and examples is correct for 2026 | `scripts/check-examples.mjs` | **Pass** (124 dates, 0 wrong) |
| Source quotes in the expected handoff are word for word from the inputs | same script | **Pass** (5 quotes) |
| The Acme example built into the skill contains every sample sentence | same script | **Pass** (8 of 8) |
| Drafts in the expected handoffs contain no em dashes | same script | **Pass** |

Sources for the format rules: Claude Help Center, "How to create custom skills" and "Use skills in Claude" (read Nov 22, 2026). Upload path: **Customize → Skills → + → Create skill → Upload a skill**. Code execution must be on.

## 2. Scenario reviews (on paper, not live)

For each scenario, I walked through SKILL.md rule by rule and confirmed that a specific instruction produces each expected check. This shows the instructions *cover* the behavior. It doesn't prove a live model will follow them every time.

| Scenario | Expected output | Rule coverage | Gaps found and fixed |
|---|---|---|---|
| **Original Acme conflict** | [run 1](examples/acme/expected-handoff-run-1.md), checks R1-1 to R1-12 | All 12 checks map to a rule: check A plus the 48-hour window, Promised by/Decided by/Owns next step, backup-draft rule, check D, UNKNOWN/TENTATIVE rules, check F, the "don't flag approved" rule, ledger | Fixed from the paste version: added "Decided by" so Maya (promised) and Jordan (decided) stop competing for one field. Added the backup draft for Maya. Defined "days open". |
| **Review moves to Thursday** | [run 2](examples/acme/expected-handoff-run-2.md), checks R2-1 to R2-6 | Update rules: recheck, "Changed since last run", rescheduled approval stays pending, check B for the now-outdated Mon Dec 7 invite | Fixed: "moved to Thursday" is ambiguous when today is Thursday. The skill now asks which date, and the example uses "today, Thu Dec 3, at 3 p.m." |
| **Missing recap** | [missing-recap](examples/test-cases/missing-recap/), checks MR-1 to MR-6 | Check F, plus "only use what was shared" | Fixed: without the project review recap, nothing says Security must approve first. Added a rule that an *implied* dependency becomes a question under "Confirm these", not a conflict. |
| **Two projects, one ready** | [two-projects-one-ready](examples/test-cases/two-projects-one-ready/), checks TP-1 to TP-9 | Opening script, one question at a time, Zoom reminders once, "same as" reuse, Readable/Restricted/Not found, access check table, Setup card, embedded-instruction rule | Fixed: added an explicit rule that WAITING projects get no extraction or flags. Northwind's tracker includes a fake "Note to AI" line to test the injection rule. |

## 3. Still needs a live Claude account

Run each of these at least **3 times**, since answers vary between runs. Note any failed check ID and which model was used.

1. **Upload:** upload `dist/meeting-handoff.zip` at Customize → Skills on a Free or Pro account. Confirm it appears and can be switched on.
2. **Trigger:** in a new chat, type `Use Meeting Handoff. Try the Acme example.` Confirm the skill loads and says the example is fictional. Score R1-1 to R1-12.
3. **Moved review:** in the same chat, reply `Alex moved the Security review to today, Thu Dec 3, at 3 p.m.` Score R2-1 to R2-5. Then, in a fresh run, reply `Alex moved it to Thursday` and score R2-6 (it should ask which Thursday).
4. **Missing recap:** paste [missing-recap/input.md](examples/test-cases/missing-recap/input.md). Score MR-1 to MR-6. The check most likely to fail is **MR-2** (the model treats the tracker's review as a confirmed dependency).
5. **Two projects:** follow [two-projects-one-ready/input.md](examples/test-cases/two-projects-one-ready/input.md). Score TP-1 to TP-9. Watch **TP-2** (the Zoom reminders repeated per project) and **TP-8** (the injection line).
6. **Opening with no setup:** type only `Use Meeting Handoff.` and confirm the one-sentence explanation plus the exact projects question.
7. **Connectors (optional, use a test account, not a work account):** connect Gmail with a label holding one readable recap and one email that only has a Zoom summary link. Confirm Readable vs Restricted, and that it reads only the named label.
8. **Cowork schedule:** create the weekday task from [SCHEDULING.md](SCHEDULING.md), run it on demand, and check the four items in "Test one run". Then set one read tool to "Always ask" and confirm the run either waits or reports the skipped source in Coverage.
9. **Resume:** start a new chat, paste a Setup card with one WAITING project, and confirm it rechecks only what was missing.

## 4. Known limits

- **Date math is done by the model.** The skill makes it write out the dates it compares, which cuts errors, but it can still be wrong. Users should check urgent flags against the quoted source.
- **Pasted sources need a pasted ledger.** In chat, older promises carry forward only if the EA pastes the ledger back. Scheduled runs look back 7 days of recaps, and can save the ledger if the task has a folder.
- **Connector scope is set by the provider.** The skill limits *what it reads* by instruction, not by permission. For a hard limit, users should paste instead of connecting.
- **Before publishing:** create the repo at `github.com/officeoftheea/meeting-handoff` and attach `dist/meeting-handoff.zip` to a GitHub Release. The README download link (`releases/latest/download/meeting-handoff.zip`) only works once that release exists.
- **Not verified:** the exact Zoom AI Companion menu names (deliberately left out of the docs), and whether a Cowork task's results are visible to Team/Enterprise admins (SCHEDULING.md tells users to ask).
