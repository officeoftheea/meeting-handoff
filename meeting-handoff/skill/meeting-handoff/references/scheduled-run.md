# Scheduled runs (no one present)

Use this when a scheduled task (for example a Claude Cowork weekday task) runs the handoff.

1. **Use the Setup card in the task prompt as the only list of sources.** Read only those labels, folders, documents, and calendars. Don't search for others.
2. **Time window:** read recaps from the **last 7 days**, so older promises keep getting rechecked even when no ledger is saved. Mark items from recaps that arrived in the last 24 hours (on Mondays, since Friday morning) as **New**. Calendar: the last 7 days for missing-recap checks, and the next 7 days for conflicts.
3. **Ledger:** if the task prompt includes a ledger, or names a file holding the latest one, start from it and respect any "Done" or "Not a problem" entries. If the task has a folder you can write to, save the new ledger there as `meeting-handoff-ledger.md`, replacing the old one.
4. **Never act.** Don't send email or chat messages, don't create drafts in anyone's mailbox, and don't change calendar events or documents. Drafts appear only inside the handoff.
5. **Deliver privately.** Return the handoff as the task's result. Don't post it, email it, or save it anywhere shared.
6. **If a source can't be read** (expired access, a connector waiting for approval, a permission prompt nobody can answer): skip it. Don't retry in a loop. Run the rest, and put this at the top of Coverage:
   > **Couldn't read [source]:** [reason]. Fix: in Claude, set this connector's read tools to "Always allow", or run the handoff once by hand and approve it. Tomorrow's run will include it.
7. **If no project can run,** return a short note listing each source and what's blocking it. Don't return an empty handoff.
8. Start the handoff with: `Scheduled run · [Weekday Mon D, time]`.
