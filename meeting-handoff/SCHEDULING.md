# Every weekday, automatically (Claude Cowork)

Have your handoff ready before you open your inbox. This uses **scheduled tasks** in Claude Cowork, which come with paid Claude plans (Pro, Max, Ultra, Team, Enterprise).

**Before you start:**

- Install the skill and finish setup once by hand (see [SETUP.md](SETUP.md)). You need your **Setup card**.
- Connect the accounts named in your Setup card (mail, calendar, drive) in Claude. A scheduled task can't read pasted text, so it only works with connected sources.

## 1. Let the read tools run without asking

A scheduled run happens while you're away, so nobody is there to click "Allow". If a connector tool is set to **Always ask**, the run may wait for you, or finish without that source.

In Claude's connector settings, set the **read** tools the handoff uses to **Always allow**: searching or reading mail, listing calendar events, reading files.

**Leave sending, creating, and editing tools on "Always ask"** (send email, create draft, create or update event, edit file). The skill never uses them. Keeping them on "ask" is a second lock.

## 2. Create the task

1. In Claude, click **Scheduled** in the left sidebar, then **New task**.
2. Choose **Set up manually**.
3. Fill in:
   - **Name:** `Meeting Handoff`
   - **Frequency:** **On weekdays**. If it lets you pick a time, choose one before your day starts, like 7:30 a.m.
   - **Approval mode:** the strictest option that still lets the read tools above run.
   - **Folder** (optional): only if you want the ledger saved between runs. Choosing a folder means the task runs **only while your computer is awake and Claude is open**. Without one, it runs in the cloud even when your laptop is closed.
   - **Prompt:** paste the template below, with your Setup card in it.
4. Click **Save**.

### Prompt template

Copy this and replace the bracketed part.

```
Use the Meeting Handoff skill for my scheduled weekday run.

Follow the skill's scheduled-run rules:
- Use ONLY the sources in my Setup card below. Don't search anything else.
- Read recaps from the last 7 days and mark anything from the last 24 hours (since Friday morning on Mondays) as New.
- Check the next 7 days of calendar events for these projects.
- Never send, draft in my mailbox, book, or edit anything. Put drafts inside the handoff only.
- If a source can't be read or needs approval, skip it and say so at the top of Coverage.
- Return the handoff as this task's result, for me only.

[PASTE YOUR MEETING HANDOFF SETUP CARD HERE]

Items I've already closed (don't flag these):
[Optional: paste lines from your latest ledger marked Done or Not a problem, or leave this blank]
```

## 3. Test one run before you rely on it

1. Open **Scheduled** in the sidebar, find **Meeting Handoff**, and run it **on demand** from the task list. You don't have to wait for tomorrow morning.
2. When it finishes, open the result and check:
   - [ ] It starts with `Scheduled run ·` and today's date.
   - [ ] **Coverage** lists every source in your Setup card as read, or explains why it couldn't be.
   - [ ] It quotes at least one line from a real recap. That proves it read the recap, not just the email around it.
   - [ ] Nothing was sent. Check your Sent folder and calendar to be sure.
3. If it all looks right, leave it on. Tomorrow's run happens on its own.

## If a run gets stuck or skips a source

| What you see | Why | Fix |
|---|---|---|
| The run is waiting for you | A connector tool is set to "Always ask" | Approve it now. Then set that **read** tool to "Always allow" (step 1). |
| Coverage says "Couldn't read [source]" | Access expired, or the connector wants re-approval | Reconnect the connector in Claude's settings, run the handoff once by hand, then run the task on demand to confirm. |
| Recap marked "Restricted" | The email only links to the summary | Ask the meeting host to include the summary text in the email. |
| The task didn't run | You chose a folder and the computer was asleep or Claude was closed | Remove the folder (runs in the cloud), or keep Claude open. |
| An old promise disappeared | It's more than 7 days old and no ledger was saved | Paste open items from your last ledger into the prompt, or choose a folder so the ledger is saved. |

## Keep it private

- Results appear in your **Scheduled** list in Claude. On a Team or Enterprise plan, ask your admin whether anyone else can see Cowork task results.
- The handoff is never emailed or posted. If you want it somewhere else, copy it yourself.
- When a project ends or access changes, edit the Setup card in the task prompt.
