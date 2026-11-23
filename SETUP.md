# Setup guide

This guide covers installing the skill, getting permission for recaps, deciding whether to connect accounts, and resuming setup later. If you've never installed a Claude skill, start at step 1.

## 1. Install the skill

1. Download [**meeting-handoff.zip**](https://github.com/officeoftheea/meeting-handoff/raw/main/meeting-handoff.zip). Keep it zipped.
   - *Already on the GitHub page?* Click `meeting-handoff.zip` in the file list, then click the download button (the arrow pointing down, at the top right of the file view).
2. In Claude, open **Settings → Capabilities** and turn on **Code execution and file creation**.
3. Open **Customize → Skills**. Click **+ → Create skill → Upload a skill**, then choose the ZIP.
4. Check that **Meeting Handoff** is switched on.
5. Start a new chat and type: `Use Meeting Handoff. Try the Acme example.`

### If the upload fails

| What you see | What to do |
|---|---|
| Skills option is greyed out | Code execution is off. Turn it on (step 2). On Team or Enterprise, ask your admin to allow skills and code execution. |
| "Missing required skill.md file" or the folder name doesn't match | You may have unzipped and re-zipped it. Download the original ZIP again and upload it without opening it. |
| Mac unzipped it automatically | Safari does this. Download again in another browser, or in Safari turn off "Open safe files after downloading". |
| Uploaded, but Claude doesn't use it | Make sure it's switched on, start a **new** chat, and say "Use Meeting Handoff." |

## 2. Get permission first

Meeting Handoff only works with recaps your exec has cleared you to see. Before setup:

- **Ask your exec** which meetings you can get recaps for. Customer calls, internal syncs, and project reviews are common.
- **Ask the meeting host** too, if that's someone other than your exec.
- **Zoom:**
  - If you need to manage the meeting while your exec is away, the host can add you as an **alternative host**. Do this only where it makes sense for that meeting.
  - **AI Companion summaries are shared separately.** Being invited, or even being an alternative host, doesn't guarantee the summary comes to you. Ask the host to check who the summary goes to.
  - **Test it.** Pick a meeting you *didn't* attend and confirm the recap reached you.
- **Other tools work too:** Teams, Google Meet, Otter, Fireflies, Granola, or notes someone types up. Any approved recap you can paste or forward is fine.

## 3. Choose how Claude reads your sources

For every source you can either **paste** it or **connect** an account. You can mix the two: paste recaps, but connect the calendar.

| Source | Paste option | Connect option |
|---|---|---|
| Meeting recaps | Copy the recap text into the chat | Gmail or Outlook label/folder, or a Drive folder |
| Agenda or tracker | Copy the relevant section | A Google Doc, Sheet, or other doc link via a connector |
| Calendar | Type or copy the next 7 days of events for the project | Google Calendar or Outlook calendar |

### What a connector asks for, and what the skill uses

When you connect Gmail, Google Calendar, Google Drive, or similar in Claude, **the connector asks for access to that account**, often your whole mailbox, calendar, or drive. The provider sets that scope, not this skill.

**Meeting Handoff tells Claude to read only what you name in setup:** one recap label or folder, the specific agenda links, and events matching your project names on the calendar you choose. It doesn't search the rest of your account, and it never sends email, edits documents, or changes events. You can disconnect a connector at any time in Claude's settings.

If your company restricts connecting work accounts to personal AI tools, use the paste option.

### Set up a recap label (recommended)

1. In Gmail, create a label called `EA Meeting Recaps`. In Outlook, use a folder.
2. Create a filter that applies the label to recap emails from approved meetings. For example: emails from your meeting tool's summary sender, with the project name in the subject.
3. Forward one recent recap into the label so there's something to check.

### What "readable" means

During setup, Claude opens a real recap and quotes a line back to you.

- **Readable:** Claude can see the actual decisions and next steps.
- **Restricted:** the email arrived, but the recap sits behind a "View summary" link that needs a sign-in. Claude can't open that. Ask the host to share the summary text in the email, or open it yourself and paste it in.
- **Not found:** the label is empty or named differently.

## 4. The setup conversation

Type `Use Meeting Handoff.` and answer one question at a time:

1. **Projects:** list them all, for example "Acme rollout, Northwind office move, Q1 board prep".
2. For each project:
   - Other names it goes by in invites and notes
   - The approved meetings
   - Where recaps land (or "paste")
   - Agenda or tracker link (or paste the section)
   - Which calendar (or paste the next 7 days)

   If several projects share a recap label or calendar, say "same as Acme" and it reuses it.
3. **Access check:** a table showing what's readable, missing, or restricted for each project, plus the exact fix for each gap.
4. **First handoff:** ready projects run right away. The others wait.

## 5. Save your Setup card

After the access check, Claude prints a **Setup card**. It lists each project's sources and their status, with no meeting content. Save it in a note or doc.

- **To resume** after you get access: start a new chat, type `Use Meeting Handoff.` and paste the card. It rechecks what was missing and runs.
- **For a daily schedule:** paste the card into the scheduled task (see [SCHEDULING.md](SCHEDULING.md)).

## 6. Daily use

1. Start a chat: `Use Meeting Handoff.`
2. Paste your Setup card and **yesterday's ledger** (the table at the end of each handoff). The ledger keeps older promises in view.
3. Add any new recaps you're pasting by hand.
4. Read the handoff. Edit the drafts and send the ones you choose.
5. Reply with anything that's done or not a problem, for example "EMEA contact came in" or "Alex moved the review to Thu Dec 3, 3 p.m." The ledger updates.

Tip: say dates outright ("Thu Dec 3"). "Thursday" is ambiguous when today is Thursday, and Claude will ask.

## Privacy

- The handoff is for you. It doesn't rank or score people.
- Recap and agenda text is treated as evidence. If a document contains instructions aimed at an AI, the skill ignores them and tells you.
- Nothing is sent, booked, or edited without you.
