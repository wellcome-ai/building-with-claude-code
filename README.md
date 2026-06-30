# Building with Claude Code

A worked example of taking a real app from idea to working code with Claude Code, using the process from the Wellcome AI build days. This repo has the example app, a step-by-step walkthrough with the exact prompts, and the design and planning artefacts the process produces along the way.

The app is **Split**, a group expense tracker (like Splitwise): make a group, add people by name, log expenses, and see who owes whom. It's small enough to follow in one sitting, with a couple of tricky money cases (a bill that doesn't split evenly, and working out who owes whom) that the review steps are there to catch.

You build Split yourself by following `WALKTHROUGH.md`. The app code starts empty (a fresh Next.js starter), and the walkthrough is how you fill it in.

## The steps

You never start in code. Each step produces something you can look at before moving on:

`describe it → make a plan → find problems with the plan → design the screens → put the design into the plan → build the main flow → try it → review the code`

`WALKTHROUGH.md` walks through every step with the exact prompt to paste. The prompts are plain text, so you can copy them straight in. Nothing here is advanced. If you've used Claude Code once, you can do all of it.

## What's in here

- `WALKTHROUGH.md` - the step-by-step build-along with copy-paste prompts. Start here.
- `docs/requirements.md`, `docs/plan.md` - finished examples of what the early steps produce, kept here for reference. Yours will come out simpler, and that's fine.
- `design-system/` and `design_handoff_split_app/` - the design pieces and the screens claude.ai/design produced. Claude Code reads these for you during the walkthrough, so you don't need to open them. (Heads up: the prototype's money maths has a rounding bug. That's the one the review step is there to catch.)
- `src/` - the app code. It starts as an empty Next.js starter, and you build Split into it by following the walkthrough.
- `AGENTS.md` - a short rules file that keeps Claude on track with this version of Next.js. Claude reads it automatically, so you don't need to do anything with it.
- `example-global-CLAUDE.md` - a sanitised example of a global CLAUDE.md, the standing instructions I give Claude across every project.
- `make-your-own-CLAUDE-md.md` - how to write your own (the trick: get Claude to interview you first).

## Get set up

You need this project on your computer, with Claude Code open on it.

1. Download the repo: on the GitHub page, click the green **Code** button, then **Download ZIP**, and unzip it. (Or clone it, if you're comfortable with git.)
2. You'll need Node.js installed (the free LTS version from [nodejs.org](https://nodejs.org)). Not sure if you have it? Ask Claude to check for you.
3. Open the unzipped folder in Claude Code.
4. Ask Claude to get it running: "install the dependencies, start the app, and open it in my browser." (Or run `npm install` then `npm run dev` yourself and open the link it prints.)

The app shows the default Next.js starter page until you build Split. That's expected. The walkthrough is what turns it into Split.

## Recommended setup

Once you've done the setup above, you don't need any extra plugins or tools, since every step is just a plain prompt. When you're comfortable and want optional shortcuts, the compound-engineering plugin adds them (you won't need it today). Install it with these two commands in Claude Code:

```
/plugin marketplace add EveryInc/compound-engineering-plugin
/plugin install compound-engineering
```

## Video walkthrough

A full video walkthrough of the process: https://drive.google.com/file/d/1rhaPYwx1W4Ie4DsDaV5zP-tWPa_u2D53/view

## Licence

MIT. Built at [Wellcome AI](https://wellcome.me). Use it and share it.
