# byte5 Meetups

Slide decks, demo code, and companion material from byte5 meetups and tech talks.

All decks build to GitHub Pages via the workflow at `.github/workflows/slides.yml`. Each meetup lives in its own dated folder `YYYY-MM-DD-<slug>/`.

## Meetups (newest first)

### 2026-05-13 — OpenClaw Hackathon
**Hackathon · Marcel Wege · 34 slides**

Hackathon-Format zum Bauen eigener OpenClaw-AgentSkills. Live-Demo eines Referenz-Skills, Skill-Anatomie-Check, Level-Wahl (Entry / Intermediate / Expert), zweistündiger Build-Sprint, Show & Tell. Drei Referenz-Skills unter `demos/` zum Forken.

- Slides: <https://byte5ai.github.io/meetups/2026-05-13-openclaw-hackathon-1/>
- PDF: <https://byte5ai.github.io/meetups/2026-05-13-openclaw-hackathon-1/deck.pdf>
- Demos: [`2026-05-13-openclaw-hackathon-1/demos/`](./2026-05-13-openclaw-hackathon-1/demos/)
- Plan: [`2026-05-13-openclaw-hackathon-1/PLAN.md`](./2026-05-13-openclaw-hackathon-1/PLAN.md)

### 2026-05-05 — Claude & Claude Code
**Tech Talk · Marcel Wege · 42 + 8 slides**

Vom Chat zum Agenten-Stack — ein 60–75-Minuten-Streifzug durch das Claude-Ökosystem für Devs. Modellfamilie, Cowork, MCP-Stack, Skills/Hooks/Subagents und Spec-Driven Development. Plus Sub-Deck *Spec-Driven Development mit GitHub Spec-Kit* (Live-Demo, von `.constitution` über `.specify`, `.plan`, `.tasks` bis `.implement` entsteht eine streaming Next.js Chat-App).

- Slides: <https://byte5ai.github.io/meetups/2026-05-05-claude-code/>
- PDF: <https://byte5ai.github.io/meetups/2026-05-05-claude-code/deck.pdf>
- Sub-Deck (Spec-Kit): <https://byte5ai.github.io/meetups/2026-05-05-claude-code/spec-kit-demo.html>
- Sub-Deck PDF: <https://byte5ai.github.io/meetups/2026-05-05-claude-code/spec-kit-demo.pdf>

### 2026-04-15 — Einführung in OpenClaw
**Tech Talk · Marcel Wege · 52 slides**

Ein lokaler AI-Assistent — auf WhatsApp, Telegram, Slack, iMessage, Signal, Matrix. In 90 Minuten live demonstriert: Gateway, Skills als Markdown, LLM frei wählbar (Anthropic, OpenAI, Ollama).

- Slides: <https://byte5ai.github.io/meetups/2026-04-15-openclaw-intro/>
- PDF: <https://byte5ai.github.io/meetups/2026-04-15-openclaw-intro/deck.pdf>
- Installation guide: [`2026-04-15-openclaw-intro/INSTALL.md`](./2026-04-15-openclaw-intro/INSTALL.md)
- Docker demo stack: [`2026-04-15-openclaw-intro/`](./2026-04-15-openclaw-intro/) (`docker-compose.yml`, `Dockerfile`, `stub/`, `workspace/`)

## Adding a new meetup

1. Create a new folder `YYYY-MM-DD-<slug>/` (date = event date, kebab-case slug).
2. Drop slides under `<folder>/slides/deck.md`. If you need a sub-deck, add `<folder>/slides/<name>.md`.
3. Use Marp directives compatible with the existing decks (`marp: true`, `theme: …`, `paginate: true`, …). Existing folders contain `theme.css` + `marp-engine.js` you can copy.
4. Add a build block to `.github/workflows/slides.yml` mirroring the existing ones.
5. Add an entry to this README (newest first).
6. Push to `main` — Pages picks it up.

## History

Each meetup folder retains the full git history from its original standalone repo (merged in via `git subtree`). To explore that history:

```bash
git log -- 2026-04-15-openclaw-intro/
```

Original standalone repos (archived after migration):
- `2026-04-15-openclaw-intro/` ← `byte5ai/openclaw-demo`
- `2026-05-05-claude-code/` ← `byte5ai/claude-demo`
- `2026-05-13-openclaw-hackathon-1/` ← `byte5ai/openclaw-hackathon-1`
