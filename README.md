# byte5 Meetups

Slide-Decks, Demo-Code und Companion-Material aus byte5-Meetups und Tech-Talks.

Alle Decks werden via Workflow `.github/workflows/slides.yml` nach GitHub Pages gebaut. Jedes Meetup lebt in einem eigenen, datierten Subordner `YYYY-MM-DD-<slug>/`.

## Meetups (neueste zuerst)

### 2026-05-13 — OpenClaw Hackathon
**Hackathon · Marcel Wege · 34 Slides**

Hackathon-Format zum Bauen eigener OpenClaw-AgentSkills. Live-Demo eines Referenz-Skills, Skill-Anatomie-Check, Level-Wahl (Entry / Intermediate / Expert), zweistündiger Build-Sprint, Show & Tell. Drei Referenz-Skills unter `demos/` zum Forken.

- Slides: <https://byte5ai.github.io/meetups/2026-05-13-openclaw-hackathon-1/>
- PDF: <https://byte5ai.github.io/meetups/2026-05-13-openclaw-hackathon-1/deck.pdf>
- Demos: [`2026-05-13-openclaw-hackathon-1/demos/`](./2026-05-13-openclaw-hackathon-1/demos/)
- Plan: [`2026-05-13-openclaw-hackathon-1/PLAN.md`](./2026-05-13-openclaw-hackathon-1/PLAN.md)

### 2026-05-05 — Claude & Claude Code
**Tech Talk · Marcel Wege · 42 + 8 Slides**

Vom Chat zum Agenten-Stack — ein 60–75-Minuten-Streifzug durch das Claude-Ökosystem für Devs. Modellfamilie, Cowork, MCP-Stack, Skills/Hooks/Subagents und Spec-Driven Development. Plus Sub-Deck *Spec-Driven Development mit GitHub Spec-Kit* (Live-Demo, von `.constitution` über `.specify`, `.plan`, `.tasks` bis `.implement` entsteht eine streaming Next.js Chat-App).

- Slides: <https://byte5ai.github.io/meetups/2026-05-05-claude-code/>
- PDF: <https://byte5ai.github.io/meetups/2026-05-05-claude-code/deck.pdf>
- Sub-Deck (Spec-Kit): <https://byte5ai.github.io/meetups/2026-05-05-claude-code/spec-kit-demo.html>
- Sub-Deck PDF: <https://byte5ai.github.io/meetups/2026-05-05-claude-code/spec-kit-demo.pdf>

### 2026-04-15 — Einführung in OpenClaw
**Tech Talk · Marcel Wege · 52 Slides**

Ein lokaler AI-Assistent — auf WhatsApp, Telegram, Slack, iMessage, Signal, Matrix. In 90 Minuten live demonstriert: Gateway, Skills als Markdown, LLM frei wählbar (Anthropic, OpenAI, Ollama).

- Slides: <https://byte5ai.github.io/meetups/2026-04-15-openclaw-intro/>
- PDF: <https://byte5ai.github.io/meetups/2026-04-15-openclaw-intro/deck.pdf>
- Installations-Leitfaden: [`2026-04-15-openclaw-intro/INSTALL.md`](./2026-04-15-openclaw-intro/INSTALL.md)
- Docker-Demo-Stack: [`2026-04-15-openclaw-intro/`](./2026-04-15-openclaw-intro/) (`docker-compose.yml`, `Dockerfile`, `stub/`, `workspace/`)

## Neues Meetup hinzufügen

1. Neuen Subordner `YYYY-MM-DD-<slug>/` anlegen (Datum = Event-Datum, Slug in kebab-case).
2. Slides unter `<folder>/slides/deck.md` ablegen. Bei Bedarf Sub-Deck als `<folder>/slides/<name>.md` danebenstellen.
3. Marp-Direktiven kompatibel zu den bestehenden Decks verwenden (`marp: true`, `theme: …`, `paginate: true`, …). Bestehende Subordner enthalten `theme.css` + `marp-engine.js` zum Kopieren.
4. Build-Block in `.github/workflows/slides.yml` nach dem Muster der bestehenden Blöcke ergänzen.
5. Eintrag in dieser README hinzufügen (neueste zuerst).
6. Auf `main` pushen — Pages baut automatisch.

Ausführlicher Leitfaden mit Templates und Stolpersteinen: siehe [`CLAUDE.md`](./CLAUDE.md).

## Historie

Jeder Meetup-Subordner enthält die vollständige Git-Historie des ursprünglichen Standalone-Repos (via `git subtree` eingespielt). Historie anzeigen:

```bash
git log -- 2026-04-15-openclaw-intro/
```

Ursprüngliche Standalone-Repos (nach Migration archiviert):
- `2026-04-15-openclaw-intro/` ← `byte5ai/openclaw-demo`
- `2026-05-05-claude-code/` ← `byte5ai/claude-demo`
- `2026-05-13-openclaw-hackathon-1/` ← `byte5ai/openclaw-hackathon-1`
