# Meeting Handoff

**A Claude skill for Executive Assistants, from Office of the EA.**

You can't sit in every meeting, and nobody remembers to tell you when a decision changes something you own. Meeting Handoff reads the meeting recaps your exec has approved. It checks them against your project agenda and calendar, then tells you what needs your attention before anyone has to chase you.

> *"I wasn't in either meeting, and I still caught the customer promise we were about to miss."*

## See it catch something

The Acme example is fictional and built in. It has two meetings, and you weren't in either one.

- **Tuesday's customer call:** Maya from Sales promises Acme a revised rollout plan **by Friday**.
- **Wednesday's project review:** Jordan confirms **Security must approve the plan** before it goes to Acme.
- **The project agenda:** Security's review is on **Monday**.
- **The calendar:** the Acme customer update is still set for **Friday at 11 a.m.**

Nobody has noticed that these don't fit together. Meeting Handoff puts this at the top of your handoff:

> **Needs action today: Acme expects the rollout plan Friday, but Security can't approve it until Monday**
> Promised by: Maya Chen · Decided by: Jordan Kim · Owns next step: Alex Rivera
> Sources: both meeting recaps (quoted), the agenda, and the calendar
>
> **Draft to Alex:** *Hi Alex, quick one on the Acme rollout plan. Maya told Acme they'd have the revised plan by Friday, ahead of their 11 a.m. update, and Jordan confirmed it needs Security's approval first. Could you review it before Friday's call?…*
>
> **If Alex can't:** a draft asking Maya to reset Acme's expectation before Friday.

It also flags a promise that's already past due, lists a meeting recap nobody shared, and asks about a task with no owner. [See the full example handoff →](examples/acme/expected-handoff-run-1.md)

Nothing gets sent. You review every draft and decide what to do.

## Install (about 3 minutes)

You need a Claude account. Skills work on the Free, Pro, Max, Team, and Enterprise plans. On Enterprise, your admin has to turn skills on first.

1. **Download the skill:** [**meeting-handoff.zip**](https://github.com/officeoftheea/meeting-handoff/releases/latest/download/meeting-handoff.zip). Don't unzip it. Claude wants the ZIP file as is.
2. **Turn on code execution** (skills need it). In Claude, go to **Settings → Capabilities** and turn on **Code execution and file creation**.
3. **Upload the skill.** Go to **Customize → Skills** ([claude.ai/customize/skills](https://claude.ai/customize/skills)). Click **+**, then **Create skill**, then **Upload a skill**, and choose the ZIP you downloaded.
4. Make sure **Meeting Handoff** is switched **on** in your skills list.

**Then start a new chat and type:**

```
Use Meeting Handoff. Try the Acme example.
```

You'll get the handoff above in about a minute. No work account needed.

Trouble uploading? See [SETUP.md → If the upload fails](SETUP.md#if-the-upload-fails).

## Use it on your own projects

Start a new chat and type:

```
Use Meeting Handoff.
```

It asks which projects to track. List as many as you like. Then it walks you through each one, one question at a time:

1. What the project is called in invites and notes
2. Which meetings your exec approved you to see
3. Where the recaps land (a mail label or folder), or paste them in
4. Your agenda or tracker, and the calendar you're allowed to use

Before the first run, it shows what it could read, what's missing, and exactly how to fix it. Projects that are ready run right away. The rest wait for access. You get a **Setup card** to save, so you can pick up later without starting over.

**You don't have to connect a work account.** You can paste every source in. The full walkthrough, with Zoom permissions and connector details, is in [SETUP.md](SETUP.md).

## Every weekday, automatically

With Claude Cowork you can have the handoff waiting for you each morning. See [SCHEDULING.md](SCHEDULING.md).

## What's in this folder

| File | What it's for |
|---|---|
| [`dist/meeting-handoff.zip`](dist/meeting-handoff.zip) | The file you upload to Claude |
| [`SETUP.md`](SETUP.md) | Step-by-step setup, permissions, and troubleshooting |
| [`SCHEDULING.md`](SCHEDULING.md) | Weekday scheduled task template for Claude Cowork |
| [`skill/meeting-handoff/`](skill/meeting-handoff/) | The skill instructions (what's inside the ZIP) |
| [`examples/acme/`](examples/acme/) | Fictional recaps, agenda, calendar, and expected handoffs |
| [`examples/test-cases/`](examples/test-cases/) | Extra tests: missing recap, two projects with one ready |
| [`TEST-REPORT.md`](TEST-REPORT.md) | What's been tested and what hasn't |

## Before you use it at work

- Use only recaps your exec has approved you to see.
- Check your company's AI policy before connecting a work account or pasting work content.
- Before acting on an urgent flag, check it against the quoted source. The skill quotes its evidence so you can.

## License

MIT. Use it, share it, adapt it for your team.
