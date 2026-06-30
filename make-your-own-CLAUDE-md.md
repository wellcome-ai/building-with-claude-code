# Make your own CLAUDE.md

A CLAUDE.md is a plain text file Claude reads at the start of every session. It's where you write down the things you'd otherwise repeat every time: how you work, what you're building, what to always do, what to never do, and how you want Claude to talk to you. Put it at `~/.claude/CLAUDE.md` to apply everywhere (that's the hidden `.claude` folder in your home folder, for example `/Users/yourname/.claude/CLAUDE.md` on a Mac), or `./CLAUDE.md` in a project folder to apply to just that project. If you're not sure where that is, ask Claude to create it in the right place for you.

`example-global-CLAUDE.md` in this repo is a real, mature one. Don't copy it wholesale, it's far more than you need to start, and some of it covers advanced workflows you can safely ignore for now. Skim it for ideas, take the parts that fit, and add more as you go.

## The trick: don't ask Claude to write it for you. Get it to interview you.

If you ask "help me write a CLAUDE.md", Claude guesses, and you get something generic. Instead, have it ask *you* questions first, then write the file from your answers. Paste this:

```
I want to create a personal CLAUDE.md - standing instructions you'll read at
the start of every session so I don't have to repeat myself. Don't write it
yet. First interview me: ask one question at a time about how I like to work,
what I'm building, my stack and tools, the things I always want you to do or
never do, and how I want you to talk to me. Keep asking until you have
enough, then write a tight CLAUDE.md from my answers and save it to
~/.claude/CLAUDE.md (everywhere) or ./CLAUDE.md (just this project).
```

Answer honestly, in your own words. The file is only as good as what you tell it.

## A few rules of thumb

- Keep it short. Every line should change how Claude behaves; if it doesn't, cut it.
- Be specific. "Run the tests before telling me it's done" beats "write good code".
- Grow it over time. When you catch yourself explaining the same thing twice, put it in the file.

The official guide has the full detail: https://code.claude.com/docs/en/memory
