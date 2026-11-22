#!/usr/bin/env bash
# Builds skill/meeting-handoff/references/acme-example.md from examples/acme,
# validates the skill, and writes dist/meeting-handoff.zip.
set -euo pipefail
cd "$(dirname "$0")/.."
SKILL=skill/meeting-handoff
OUT=$SKILL/references/acme-example.md
{
  echo "# Acme example (fictional)"
  echo
  echo "Generated from examples/acme by scripts/build.sh. Edit those files, not this one."
  echo
  echo "Use this when the EA says \"Try the Acme example\". Say up front that it's fictional and needs no work account. Treat **today as Thu Dec 3, 2026**. Treat Acme's approved meetings as: Acme weekly customer call, Acme internal sync, Acme rollout project review. Run the full handoff (Steps 1–4 in SKILL.md) on the inputs below."
  echo
  echo "After the handoff, offer the follow-up: \"Want to see what happens when plans change? Reply: *Alex moved the Security review to today, Thu Dec 3, at 3 p.m.*\" Then handle that reply like any EA update: recheck, show \"Changed since last run\", and keep sign-off pending."
  echo
  echo "Finish by offering to set up the EA's own projects: \"Ready to try it on your own project? Tell me which projects to track.\""
  for f in examples/acme/0*.md; do
    echo; echo "---"; echo; sed 's/^# /## /' "$f"
  done
  echo; echo "---"; echo
  echo "## What a good result looks like"
  echo
  echo "Must include: the Friday-vs-Monday conflict under Needs action today (promised by Maya Chen, decided by Jordan Kim, next step owned by Alex Rivera), a draft to Alex asking for review before Friday's call, a backup draft asking Maya to reset Acme's expectation, the EMEA IT contact as past due, the dry run (owner UNKNOWN) and kickoff dinner (TENTATIVE) under Confirm these, the Wed Dec 2 9:30 a.m. internal sync recap as missing, and the pricing sheet under Not flagged (template approved Tue Nov 10)."
} > "$OUT"
node scripts/validate-skill.mjs "$SKILL"
rm -f dist/meeting-handoff.zip
( cd skill && COPYFILE_DISABLE=1 zip -rqX ../dist/meeting-handoff.zip meeting-handoff -x '*.DS_Store' )
node scripts/validate-skill.mjs --zip dist/meeting-handoff.zip
echo "Built dist/meeting-handoff.zip"
