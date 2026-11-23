# Setup flow

Ask **one question at a time**. Wait for the answer before asking the next. Keep each question short. The EA may list several projects at the start. Set them up in order, but reuse answers across projects where they say a source is shared.

## 0. Projects

You already asked: "What projects do you want me to track?" Confirm the list back in one line, for example "Got it: Acme rollout, Northwind office move. Let's start with Acme rollout."

## 1. Names

> What else is **[Project]** called in meeting invites or notes? (A customer name, a code name, a short form. Say "none" if it's always called that.)

Use all names when matching recaps and calendar events.

## 2. Approved meetings

> Which meetings for **[Project]** has your exec approved you to see recaps from? For example: the weekly customer call, the internal sync, the project review.

Then give the permission reminders once (not for every project):

> A few checks before we rely on those recaps:
> - **Confirm with your exec, and with the meeting host if that's someone else**, that you're cleared to receive recaps for these meetings.
> - **Zoom:** if you need to manage the meeting or its recording while your exec is away, ask the host to add you as an **alternative host**. Do this only where it's appropriate for that meeting.
> - **Zoom AI Companion summaries are shared separately from the meeting itself.** Being invited or being an alternative host doesn't mean the summary comes to you. Ask the host to check who the summary is shared with.
> - **Test it:** pick one meeting you *didn't* attend and confirm the recap actually reached you.
>
> Notes from other tools work too: Teams, Google Meet, Otter, Fireflies, Granola, or typed notes. They just need to be ones your exec approved.

Record each meeting's name. Any meeting on the calendar with one of these names "expects a recap" (check F).

## 3. Where recaps arrive

> Where do these recaps land? A mail label or filter works best, such as a label called "EA Meeting Recaps". A shared folder works too. If you'd rather not connect anything, say "paste".

If they don't have a label yet, suggest one: create a label such as `EA Meeting Recaps`, plus a filter that applies it to recap emails from the approved meetings (for example, from the Zoom or Teams sender and with the project name in the subject).

**If a mail, drive, or notes connector is available**, explain it before using it:

> To read recaps, I'd use your **[Gmail / Outlook / Drive]** connector. When you connect it, the connector asks for access to your account (your whole mailbox or drive, depending on the provider). **I'll only read the label or folder you name: [label].** I won't search anything else. You can disconnect it any time in Claude's settings.

Then **verify with a real recap**: open the most recent item in that label or folder and check it.

- **Readable**: you can see the meeting's actual decisions and action items in the text. Quote one line back to the EA as proof ("I can read Tue Dec 1's Acme call recap. It starts: 'Maya promised Acme…'").
- **Restricted**: the email exists but only links to the summary ("View meeting summary", a Zoom or Teams link that needs sign-in). Say: "I can see the email, but the recap itself sits behind a Zoom link I can't open. Two fixes: ask the host to share the summary as text in the email, or open it yourself and paste it here."
- **Not found**: nothing in that label or folder. Ask them to check the label name or forward one recap there.
- **No connector, or the EA prefers not to connect**: "No problem. Paste the recap text here (copy everything from the summary)."

## 4. Agenda, tracker, and calendar

> What's the link to **[Project]**'s agenda or tracker? I need the part with owners, dates, approvals, and status. Paste the text instead if you prefer.

Verify: read the document and confirm which section you found. Say what you can see, for example "I can read the 'Approvals' table: 3 rows, with owners and dates." If you can only see the title, or get an access error, say exactly what to share: "Share the doc with view access to the account you connected, or paste the Approvals section."

> Which calendar should I check for **[Project]**? Your exec's, or a shared project calendar. Use only one you're authorized to manage or view.

If a calendar connector is available, explain the same way: it can see that calendar's events. **You'll only look at events matching this project's names, over the next 7 days, plus the last 7 days for missing-recap checks.** Verify: list the matching events you found (title, date, time). Say if you can see titles but not details (some calendars show only "Busy").

Paste option: "Paste the next 7 days of events for this project (title, date, time is enough)."

If the EA already gave a source for an earlier project, ask: "Use the same **[label / calendar]** for **[Project]**?"

## 5. Access check (before the first run)

Show one table per setup, covering every project:

**Access check**

| Project | Recaps | Agenda / tracker | Calendar (next 7 days) | Status |
|---|---|---|---|---|
| Acme rollout | Readable: label "EA Meeting Recaps" (2 recaps) | Readable: Approvals table | Readable: 5 events | READY |
| Northwind move | Restricted: Zoom link only | Readable: Move plan doc | Readable: 2 events | WAITING (recap text) |

Under the table:

- **What I'll use:** each source, by name, per project.
- **What's missing, and the exact fix**, one line per item.
- "I'll run the ready projects now. Northwind will join as soon as a recap is readable. Paste one here, or come back with your Setup card."

## 6. Setup card

Always print this after the access check, so the EA can resume in a new chat or use it in a scheduled task. **Don't put recap contents in it.** Sources only.

```
MEETING HANDOFF SETUP CARD (v1)
Updated: [date]
Project: Acme rollout
  Also called: Acme, Acme Corp, Project Falcon
  Approved meetings: Acme weekly customer call; Acme internal sync; Acme rollout project review
  Recaps: Gmail label "EA Meeting Recaps" (READABLE)
  Agenda/tracker: [link] > Approvals section (READABLE)
  Calendar: [exec name] calendar, events matching project names (READABLE)
  Status: READY
Project: Northwind office move
  Also called: Northwind, NW move
  Approved meetings: Northwind facilities weekly
  Recaps: Gmail label "EA Meeting Recaps" (RESTRICTED: Zoom link only. Fix: host shares summary text, or paste)
  Agenda/tracker: [link] (READABLE)
  Calendar: same as Acme (READABLE)
  Status: WAITING
```

Tell the EA: "Save this card somewhere handy. Paste it into a new chat to pick up where we left off, or into a scheduled task."

## Resuming

When a Setup card is pasted, recheck only the items not marked READABLE, plus one quick read of each readable source (sources can lose access). Update the card and show the new access check table. Then run.
