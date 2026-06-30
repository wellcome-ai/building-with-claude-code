# Split: a build-along walkthrough

This walks through building a small app with Claude Code, one step at a time. Nothing here is advanced. If you've used Claude Code once, you can do every step yourself.

The idea is simple: don't jump straight into code. Tell Claude what you want, let it write things down as you go, and you end up with a working app plus a clear trail of what you decided and why.

The app is **Split**, a group expense tracker (like Splitwise). You make a group, add a few people by name, log expenses, and it works out who owes whom.

Each step has two parts:
- **Say** - the idea in plain words (this is roughly what you'd say if you were explaining it).
- **Paste** - the exact prompt to give Claude. Copy it as-is.

---

## Before you start

1. Get the project onto your computer and open it in Claude Code. The README's "Get set up" section has the steps.
2. Ask Claude to start the app so you can see it as you go ("install the dependencies, start the app, and open it in my browser"), or run `npm install` then `npm run dev` and open the link it prints. It shows a plain starter page for now. You'll build Split into it as you go.

Two things worth knowing before you dive in:

- `docs/requirements.md` and `docs/plan.md` are already in the repo as finished examples. As you follow the steps, Claude writes your own versions over them. Yours will come out simpler, and that's the point: you're seeing how it's done, not copying the finished article.
- If something looks wrong, or Claude does something you didn't expect, just tell it what you see and ask it to fix it. You don't need to know how any of it works to get unstuck.
- When you build it, the app starts with no groups. You create your first one (the "Byron" group) yourself in step 7, so don't worry that it looks empty at first.

---

## Step 1 - Describe what you want

**Say:** I never start by writing code. First I tell Claude what I'm building and let it write the details down, so we're both clear before anything gets built.

**Paste:**
```
I want to build a group expense tracker (Splitwise-lite) called "Split".
A user creates a group, adds members (just names, no accounts), logs
expenses (amount, who paid, who it's split among), and the app tracks who
owes whom and lets them settle up. One user, no accounts or login.
localStorage, no backend. It's a multi-screen app, not a single page.

Help me think through the user journeys and edge cases first (ask me
anything genuinely ambiguous), then write a short requirements doc to
docs/requirements.md. Cover the three core journeys (create group, log an
expense, settle up) and the money edge cases (cent-rounding when a split
doesn't divide evenly, and netting/simplifying debts across people).
Keep it right-sized - this is a demo app, not production.
```

**You get:** `docs/requirements.md` - what the app does and the tricky bits, written down before any code.

## Step 2 - Make a plan

**Say:** Now I turn that into a plan for how it gets built. This is the doc everything else follows.

**Paste:**
```
Read docs/requirements.md and write an implementation plan to docs/plan.md.
Cover:
- The data model (groups, members, expenses) and how it persists to
  localStorage.
- The screen/route structure for all five screens.
- The split-calculation logic - exactly how cent-rounding remainders are
  distributed so per-person amounts sum to the total.
- The balance/settle-up logic - how you net debts across members so the
  number of transactions is minimised.
- The build order: which screens are the core loop vs deferred.
Right-size it for a demo app. Don't over-engineer.
```

**You get:** `docs/plan.md` - the plan you build from.

## Step 3 - Ask Claude to find problems with the plan

**Say:** Before building, I ask Claude to be a tough critic of its own plan. This is the step that catches mistakes while they're still cheap to fix. You're just asking it to check its work and tell you what's wrong.

**Paste:**
```
Be a tough critic of docs/plan.md. Don't be nice about it - what's wrong,
what's missing, what could break? Look hard at the money maths: a bill that
doesn't divide evenly, and working out who owes whom across a few people.
List each problem and how you'd fix it, then update the plan.
```

**You get:** real problems found and fixed in the plan - usually the money rounding and the who-owes-whom maths - before you've written a line of code.

## Step 4 - Design the screens

**Say:** Now the look. I use claude.ai/design to design the screens and how you move between them, so the build has something to match.

**Do:** This step happens in a different tool. Open [claude.ai/design](https://claude.ai/design) in a new tab (leave your Claude Code window open, you'll come back to it), and paste this:
```
Design a multi-screen mobile-first web app called "Split" - a group
expense tracker (like Splitwise). One user, no login; group members are
just names. This is a multi-screen app. Show me the user journeys AND the
screens.

USER JOURNEYS (show these as a flow / journey map first):
  1. First use: empty Groups list → create a group → name it + add
     members → land in the new empty group.
  2. Log an expense: open a group → add expense (amount, who paid, who
     it's split among, even split) → it appears in the activity feed and
     balances update.
  3. Settle up: open a group → see balances ("Priya owes you $40") →
     tap settle → confirm → balance clears.

SCREENS (design each, with empty AND populated states where relevant):
  1. Groups list - empty state + populated list, each group showing a
     one-line balance summary ("you're owed $60" / "you owe $20").
  2. Create group - name field + add-members inline.
  3. Group detail - two tabs: Balances (who owes whom, clear directional
     "X owes Y $Z") and Activity (chronological expense feed).
  4. Add expense - amount, who paid (picker), split-among (multi-select),
     even-split default. Make entering an expense feel fast.
  5. Settle up - confirm a payment between two people; show the before/
     after balance.

STYLE: clean, friendly, confident. Money numbers are the heroes - make
balances and per-person amounts large and unambiguous, with clear colour
for "owed to you" vs "you owe". Mobile-first, generous spacing, a simple
cohesive component system (buttons, list rows, input fields, tab bar).
Give me a connected flow, not five disconnected mockups.
```

**You get:** polished, clickable screen designs, close to what the built app will look like, so you can see where it's going before you build.

> Doing this for work, where your company has a design system? You can still get on-brand results. The easy way is to describe your brand (colours, fonts, style) in the prompt, or show claude.ai/design a few screenshots of your existing product. For an exact match to your real components there's a more technical setup your engineers can do (it works from the design system's code). You don't need either to follow along here.

> For this example, the design is already in the project: `design_handoff_split_app/` is the handoff bundle from claude.ai/design, unzipped into the repo for you. When you paste the next step, Claude reads it from there, so there's nothing to export or copy across. (If Claude ever asks where the design is, point it to that folder.) When you do this on your own app, the one step to add is bringing the design across: in claude.ai/design, click Export (top right), download the design as a zip (that's the handoff bundle), and unzip it into your project folder, exactly like `design_handoff_split_app/` here. Then ask Claude to build from it.

## Step 5 - Put the design into the plan

**Say:** Now I get that design into the plan, so the build follows it instead of guessing. In this example, that design is the one already saved in `design_handoff_split_app/`.

**Paste:**
```
I've designed the screens in claude.ai/design. Update docs/plan.md so the
build matches the design: the screens, the layout, and the colours for
"owed to you" vs "you owe".
```

**You get:** one plan that matches the design. Open `docs/plan.md` and you'll see the screens and the colours for "owed to you" and "you owe" written into it.

## Step 6 - Build it

**Say:** Now Claude writes the code, with a checked plan and a design to follow. I build the main flow first - make a group, add an expense, see the balances.

**Paste:**
```
Read docs/plan.md and build the main flow of Split: make a group with
people, add an expense, and a Balances screen showing who owes whom. Get the
splitting right (the amounts add up to the total) and keep the balances
tidy. Save in the browser. Match the design.
```

**You get:** the main flow built and running. Refresh the app in your browser and you'll see the Groups screen, where you can make a group and add an expense.

## Step 7 - Try it

**Say:** I don't just trust that it works - I open it and try the tricky cases.

**Paste:**
```
Open the app and try it. Make a group called "Byron" - you're already in it
as "You", so just add Priya and Sam. Add a $120 dinner that you paid, split
between all three of you. Check the Balances: Priya and Sam should each owe
you $40 (you're owed $80). Then add a $10 expense split three ways and
confirm the shares still add up to exactly $10. Tell me what you see.
```

**You get:** the app working, and the tricky money case proven on screen. (If Claude can't open the browser on your setup, open the app yourself and check the numbers. They should match what the prompt describes.)

## Step 8 - Review the code

**Say:** Last, I ask Claude to look over the code it wrote and tidy up anything rough.

**Paste:**
```
Look over the code you just wrote, focus on the money maths, find anything
wrong or overcomplicated, and fix it. Tell me what you changed.
```

**You get:** a cleaned-up, working app.

---

## That's it

At the end you have a working app and a clear trail: what you wanted, how you'd build it, the problems you caught early, the design, and a final review. That trail is what makes this repeatable instead of guesswork - and you can do every step of it yourself.

When you're ready, the next step is building your own app the same way: describe it, make a plan, find problems with it, design the screens, put the design into the plan, build it, try it, review it. You already have everything you need to do that. Start here.
