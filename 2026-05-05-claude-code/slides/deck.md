---
marp: true
theme: byte5
paginate: false
header: 'byte5 GmbH  |  Claude & Claude Code'
footer: 'Tech Talk · byte5'
---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

<span class="eyebrow">Tech Talk · 2026</span>

# Claude & Claude Code

## Vom Chat zum Agenten-Stack <span class="b5-colon">:</span> was geht heute, was nutzen wir?

Marcel Wege · byte5 GmbH

---

<!-- _header: 'Wer spricht da?' -->

## Marcel Wege <span class="b5-colon">:</span> @ byte5

- Tech-Stack <span class="b5-colon">:</span> Laravel · TypeScript · Next.js · Claude Agent SDK
- Daily-Driver <span class="b5-colon">:</span> Claude Code seit Tag eins
- Heute <span class="b5-colon">:</span> 60–75 Min · Mix aus Einordnung, Demos, Diskussion

> [mwege@byte5.de](mailto:mwege@byte5.de)

---

<!-- _header: 'Was passiert in den nächsten 60–75 Minuten' -->

## Roter Faden

1. **Was ist Claude** — Modell & Familie
2. **Touchpoints** — wo begegnet's mir?
3. **Cowork** — kurzer Ausflug + Demo
4. **Claude Code** — warum tunen?
5. **MCP-Stack** — der größte Hebel + Demo
6. **Skills · Hooks · Subagents**
7. **Spec-Driven Development**
8. **Erfahrungsaustausch**

---

<!-- _class: divider -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Phase 1 <span class="b5-colon">:</span> Was ist Claude?

---

<!-- _class: phase phase-1 -->
<!-- _header: 'Phase 1 — Modellfamilie' -->

<div class="phase-bar"></div>

## Anthropic <span class="b5-colon">:</span> drei Modelle, drei Use-Cases

| Modell | Stärke | Wofür |
|---|---|---|
| **Opus 4.7** | maximale Tiefe, 1M Kontext | komplexe Refactors, Recherche, Agents |
| **Sonnet 4.6** | Balance Speed/Qualität | Daily-Driver |
| **Haiku 4.5** | schnell & günstig | High-Volume, Tools |

---

<!-- _class: phase phase-1 -->
<!-- _header: 'Phase 1 — Frontier-Vergleich' -->

<div class="phase-bar"></div>

## Wo Claude steht <span class="b5-colon">:</span> SWE-Bench Verified

| Modell | Score | Kontext | Output $/1M |
|---|---|---|---|
| **Claude Opus 4.7** | **87.6 %** | 1M | $25 |
| Claude Opus 4.6 | 80.8 % | 1M | $25 |
| Gemini 3.1 Pro | 80.6 % | 1M | $15 |
| GPT-5.2 | 80.0 % | 400K | $14 |
| Claude Sonnet 4.6 | 79.6 % | 200K | $15 |

<small>Quelle: llm-stats.com SWE-Bench Verified (Stand Mai 2026, n=89 Modelle) · 500 verifizierte GitHub-Issues, Python.</small>

---

<!-- _class: phase phase-1 -->
<!-- _header: 'Phase 1 — Caveats' -->

<div class="phase-bar"></div>

## Aber <span class="b5-colon">:</span> Benchmark ≠ Wahrheit

- **Andere Benchmarks, anderes Bild:** Artificial Analysis Intelligence Index führt **GPT-5.5** (60) vor **Opus 4.7** (57) und **Gemini 3.1 Pro** — Coding-Spitze ≠ allgemeine Spitze
- **Verified ist kontaminiert:** OpenAI publiziert keine SWE-Bench-Verified-Werte mehr und empfiehlt **SWE-Bench Pro** (1.865 Tasks, multi-language) — dort fällt Opus 4.5 von 80.9 % auf **45.9 %**
- **Take-away:** Für *unsere* Use-Cases (Code-Qualität, lange Kontexte, Tool-Use) ist Claude führend — aber auf einem Benchmark-Markt zu wetten ist riskant

<small>Quellen: artificialanalysis.ai/leaderboards/models · scale.com/leaderboard/swe_bench_pro_public (Mai 2026)</small>

---

<!-- _class: phase phase-1 -->
<!-- _header: 'Phase 1 — Positionierung' -->

<div class="phase-bar"></div>

## Wo steht Claude

- **Code-Qualität** und **lange Kontexte** als Stärken
- **Tool-Use** und **Agentik** tief integriert
- Eigener **Dev-Workflow** (Claude Code), nicht nur Chat-Frontend

---

<!-- _class: divider -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Phase 2 <span class="b5-colon">:</span> Touchpoints

---

<!-- _class: phase phase-2 -->
<!-- _header: 'Phase 2 — Spektrum' -->

<div class="phase-bar"></div>

## Vom Chat zum Agenten

| Touchpoint | Wer? | Use-Case |
|---|---|---|
| **Claude.ai** | alle | Chat, Brainstorm |
| **Desktop / Mobile** | alle | lokale Files, Voice |
| **API / SDK** | Devs | eigene Integrationen |
| **Agent SDK** | Devs | autonome Agents |
| **Claude Code** | Devs | Pair-Programming |

---

<!-- _class: phase phase-2 -->
<!-- _header: 'Phase 2 — Claude.ai & Apps' -->

<div class="phase-bar"></div>

## Der Einstieg <span class="b5-colon">:</span> für alle

- **Browser** · **Desktop** · **Mobile** — gleiches Modell, drei Frontends
- **Connectors** — Drive, GitHub, Slack
- **Skills** — wiederverwendbare Workflows (PDF, Excel, Docs)
- **Projekte** — Kontext kuratieren, Files mitgeben

---

<!-- _class: phase phase-2 -->
<!-- _header: 'Phase 2 — API · SDK · Agent SDK' -->

<div class="phase-bar"></div>

## Für Devs <span class="b5-colon">:</span> drei Schichten

```ts
import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();
const msg = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hallo Claude" }],
});
```

- **API** — HTTP, Prompt-Caching, Tool-Use, Vision
- **SDK** — Streaming, Type-Safety, Batch
- **Agent SDK** — Loop, Tool-Routing, Sub-Agents, Memory

---

<!-- _class: divider -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Phase 3 <span class="b5-colon">:</span> Cowork

---

<!-- _class: phase phase-3 -->
<!-- _header: 'Phase 3 — Was ist Cowork?' -->

<div class="phase-bar"></div>

## Cowork <span class="b5-colon">:</span> die Claude Desktop App im Arbeits-Modus

- **Eigene Desktop-App** — keine IDE, kein Terminal nötig
- **Working Session** statt Chat — Claude öffnet Files, Apps, schreibt Outputs
- **Plugins** bündeln Skills, Connectors und Sub-Agents pro Rolle
- **Bundle für jede Rolle** <span class="b5-colon">:</span> Sales · Finance · Legal · Marketing · HR · Operations · Engineering · Data · …

---

<!-- _class: phase phase-3 -->
<!-- _header: 'Phase 3 — Aktivieren' -->

<div class="phase-bar"></div>

## Aktivieren <span class="b5-colon">:</span> ein Befehl, eine Rolle

```bash
# In Claude Desktop oder Claude Code
/setup-cowork            # Guided Setup: Rolle wählen,
                         # Plugins installieren, Tools verbinden,
                         # ersten Skill ausprobieren
```

- **Geführter Flow** statt manueller Marketplace-Suche
- **Connectors** werden direkt verdrahtet <span class="b5-colon">:</span> Notion · Drive · Slack · GitHub
- **Erster Skill-Run** zum Abschluss — direkt produktiv in der Desktop-App

---

<!-- _class: phase phase-3 -->
<!-- _header: 'Phase 3 — Was kommt mit?' -->

<div class="phase-bar"></div>

## Operations-Plugin <span class="b5-colon">:</span> Bundle-Inhalt

| Slash-Commands (explizit) | Skills (automatisch) |
|---|---|
| `/vendor-review` | `vendor-management` |
| `/process-doc` | `process-optimization` |
| `/change-request` | `change-management` |
| `/capacity-plan` | `resource-planning` |
| `/status-report` | `risk-assessment` |
| `/runbook` | `compliance-tracking` |

> Ein `/setup-cowork`-Aufruf — sechs Workflows + sechs Domain-Heuristiken in der Desktop-App verdrahtet.

---

<!-- _class: phase phase-3 -->
<!-- _header: 'Phase 3 — Hands-on-Beispiel' -->

<div class="phase-bar"></div>

## Beispiel <span class="b5-colon">:</span> Release-Note in einem Prompt

> "Schreib eine Release-Note für v2.4 aus den letzten 30 Commits — Tonalität wie unser letzter Notion-Blog. Output als `.docx` in Drive."

| Schritt | Werkzeug |
|---|---|
| Commits + PR-Beschreibungen | **GitHub-Connector** |
| Stil-Referenz aus letztem Post | **Notion-Connector** |
| Headline · Highlights · Migration | **Cowork-Skill** |
| Review-fertige Datei | **`.docx` in Drive** |

> Drei Tools, ein Prompt, kein Copy-Paste-Karussell.

---

<!-- _class: phase phase-3 -->
<!-- _header: 'Phase 3 — Take-aways' -->

<div class="phase-bar"></div>

## Was bleibt hängen

- Claude ist **kein reines Dev-Tool** — die Desktop-App bedient ganze Fachabteilungen
- **Plugins** = kuratiertes Onboarding, kein DIY-Setup
- Der gleiche Mechanismus trägt auch im **Dev-Workflow** (Claude Code)

---

<!-- _class: divider -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Phase 4 <span class="b5-colon">:</span> Claude Code — warum tunen?

---

<!-- _class: phase phase-4 -->
<!-- _header: 'Phase 4 — Vanilla vs. getunt' -->

<div class="phase-bar"></div>

## Gleicher Preis, andere Liga

| | Vanilla | Getunt |
|---|---|---|
| Codebase | grep & read | Code-Graph, symbol-level |
| Doku | Trainings-Stand | Live-Doku via MCP |
| Wiederholtes | jedes Mal neu | Skills + Slash-Commands |
| Refactors | Context-Overflow | Subagent-Mapper |
| Permissions | Klick · Klick · Klick | Hooks + Allowlist |

---

<!-- _class: phase phase-4 -->
<!-- _header: 'Phase 4 — Drei Hebel' -->

<div class="phase-bar"></div>

## Drei Hebel <span class="b5-colon">:</span> Tools · Workflows · Kontext

- **MCP Servers** <span class="b5-colon">:</span> was Claude **kann**
- **Skills & Subagents** <span class="b5-colon">:</span> wie Claude **vorgeht**
- **`CLAUDE.md`** <span class="b5-colon">:</span> was Claude über *dein Projekt* **weiß**

---

<!-- _class: divider -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Phase 5 <span class="b5-colon">:</span> Der MCP-Stack

---

<!-- _class: phase phase-5 -->
<!-- _header: 'Phase 5 — MCP als Standard' -->

<div class="phase-bar"></div>

## MCP <span class="b5-colon">:</span> "USB-C für KI"

- **Offener Standard** von Anthropic (Nov 2024) — auch von OpenAI, Google & Microsoft adoptiert
- Löst das **N×M-Problem** <span class="b5-colon">:</span> ein Server, jeder Client spricht's (Claude Code, Cursor, Zed, Claude Desktop, ChatGPT)
- Drei Bausteine <span class="b5-colon">:</span> **Tools** (ausführen) · **Resources** (lesen) · **Prompts** (Templates)

> Real-World <span class="b5-colon">:</span> **Figma** liest Design-Tokens · **Notion** synct Backlog · **Sentry** zieht Stack-Traces · **Playwright** klickt durch UIs

---

<!-- _class: phase phase-5 -->
<!-- _header: 'Phase 5 — Code-Verständnis' -->

<div class="phase-bar"></div>

## Code-Graph-MCPs <span class="b5-colon">:</span> der Token-Hebel

- **Vanilla** liest ganze Files — bei großen Repos teuer
- **Code-Graph** liefert nur Symbole, Referenzen, Aufrufer
- **Beispiele** <span class="b5-colon">:</span> Serena · codebase-memory-mcp
- **Context7** für Live-Doku <span class="b5-colon">:</span> aktueller Stand statt Trainings-Wissen

---

<!-- _class: phase phase-5 -->
<!-- _header: 'Phase 5 — Memory' -->

<div class="phase-bar"></div>

## Was Claude *zwischen* Sessions weiß

| | `CLAUDE.md` | Memory-MCP |
|---|---|---|
| Charakter | statisch, geteilt | dynamisch, persönlich |
| Inhalt | Konventionen, Tabus | Präferenzen, Projektwissen |
| Ort | Repo, gecheckt-in | lokal, persistiert |

> Beispiele <span class="b5-colon">:</span> claude-mem · MCP Memory Server

---

<!-- _class: phase phase-5 -->
<!-- _header: 'Phase 5 — byte5-relevante MCPs' -->

<div class="phase-bar"></div>

## Der pragmatische Katalog

- **GitHub** — Issues, PRs
- **Atlassian** — Jira, Confluence
- **Notion** — Backlog, Docs
- **Figma** — Designs
- **PostgreSQL / MariaDB** — Schemas
- **Sentry** — Exceptions
- **Playwright / Chrome DevTools** — UI-Tests

---

<!-- _class: divider -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Phase 6 <span class="b5-colon">:</span> Skills · Hooks · Subagents

---

<!-- _class: phase phase-6 -->
<!-- _header: 'Phase 6 — Skills' -->

<div class="phase-bar"></div>

## Skills <span class="b5-colon">:</span> wiederverwendbare Workflows

- Markdown-Datei in `.claude/skills/<name>/SKILL.md`
- Beschreibt **wann** triggern und **wie** vorgehen
- Beispiele <span class="b5-colon">:</span> `task-new` · `task-update` · `sync-docs` (Odoo-Bot ↔ Notion)

> Einmal sauber schreiben — alle nutzen's.

---

<!-- _class: phase phase-6 -->
<!-- _header: 'Phase 6 — Subagents' -->

<div class="phase-bar"></div>

## Subagents <span class="b5-colon">:</span> mehr Hände

- Ein Claude beauftragt einen anderen — **eigener Kontext**
- Ergebnis kommt als **Summary** zurück, nicht als Raw-Output
- Killer-Use-Case <span class="b5-colon">:</span> große Codebases parallel mappen

---

<!-- _class: phase phase-6 -->
<!-- _header: 'Phase 6 — Hooks & Plugins' -->

<div class="phase-bar"></div>

## Automatisierung um Claude herum

- **Hooks** <span class="b5-colon">:</span> Shell bei Events — `PreToolUse` · `PostEdit` · `Stop`
- **Slash-Commands** <span class="b5-colon">:</span> `/fix-issue` · `/review` · `/security-review`
- **Plugins** (`/plugin`) <span class="b5-colon">:</span> Skills + Hooks + Subagents + MCPs als Bundle
- **Permission-Modes** <span class="b5-colon">:</span> `default` · `acceptEdits` · `plan` · `bypassPermissions`

---

<!-- _class: divider -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Phase 7 <span class="b5-colon">:</span> Spec-Driven Development

---

<!-- _class: phase phase-7 -->
<!-- _header: 'Phase 7 — Toolkit-Vergleich' -->

<div class="phase-bar"></div>

## Drei Optionen <span class="b5-colon">:</span> Stärken & Schwächen

| Tool | Stärken | Schwächen |
|---|---|---|
| **Plan Mode** | Built-in, kein Setup, Plan-Approve im Chat | Pro Session, keine Spec-Persistenz |
| **Spec-Kit** | Constitution + Spec + Plan + Tasks getrennt, 30+ Agents | uv/Python-Setup, experimentell, Overhead bei Kleinkram |
| **BMAD-METHOD** | Multi-Rollen-SDLC, stark bei Brownfield-Modernisierung | Hoher Lernaufwand, Overkill bei kleinen Projekten |

---

<!-- _class: phase phase-7 -->
<!-- _header: 'Phase 7 — Warum überhaupt?' -->

<div class="phase-bar"></div>

## Vibe-Coding <span class="b5-colon">:</span> skaliert nicht

Drei Sessions später:

- **Drift** <span class="b5-colon">:</span> Rabattlogik widerspricht der Steuerlogik
- **Amnesie** <span class="b5-colon">:</span> jede Session erfindet Anforderungen neu
- **Kein Audit-Trail** <span class="b5-colon">:</span> warum steht das so im Code?

> Das Problem ist nicht der Agent — das Briefing ist's.

---

<!-- _class: phase phase-7 -->
<!-- _header: 'Phase 7 — Spec-Kit Workflow' -->

<div class="phase-bar"></div>

## Vier Commands <span class="b5-colon">:</span> in dieser Reihenfolge

```bash
specify init --integration claude
```

1. `/speckit.constitution` — Prinzipien (einmal pro Projekt)
2. `/speckit.specify` — *was* wird gebaut, in User-Stories
3. `/speckit.plan` — *wie*: Architektur, Datenmodell, API
4. `/speckit.tasks` → `/speckit.implement` — atomar, prüfbar

**Code ist der letzte Schritt, nicht der erste.**

---

<!-- _class: phase phase-7 -->
<!-- _header: 'Phase 7 — Wann Spec-Kit?' -->

<div class="phase-bar"></div>

## Faustregel <span class="b5-colon">:</span> nicht für jeden Task

Spec-Kit zwingt zur Vorab-Planung — das zahlt sich nur ein, wenn das Feature groß genug für Drift ist.

| Sinnvoll | Übertrieben |
|---|---|
| Neues Feature, > 2 Std. Arbeit | Bugfix — der Code beschreibt das Verhalten |
| Mehrere Sessions am gleichen Feature | One-Shot-Skript |
| Mehrere Devs / Agents im gleichen Code | Wegwerf-Prototyp |
| Compliance, Audit, hohes Risiko | Explorative Phase |

> Spec-Kit ersetzt **kein** Code-Review.

---

<!-- _class: phase phase-7 -->
<!-- _header: 'Phase 7 — Welcher Workflow wann?' -->

<div class="phase-bar"></div>

## Drei Stufen

| Projekt | Tool | Aufwand |
|---|---|---|
| Tools, Skripte | **Plan Mode** | gering |
| Mittlere Features | **Spec-Kit** | mittel |
| SDLC mit Multi-Rollen | **BMAD-METHOD** | hoch |

---

<!-- _class: divider -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Phase 8 <span class="b5-colon">:</span> Erfahrungsaustausch

---

<!-- _class: phase phase-8 -->
<!-- _header: 'Phase 8 — Eure Reihe' -->

<div class="phase-bar"></div>

## Diskussions-Trigger

- Wie groß ist eure **`CLAUDE.md`**?
- Wo bricht Claude Code bei euch **reproduzierbar**?
- Welche **MCPs habt ihr nach 2 Wochen rausgeschmissen**?
- **Subagents für alles** — oder Master-Clone-Pattern?
- Wo ist **eure Linie** ab der ihr selbst tippt?

---

<!-- _class: phase phase-8 -->
<!-- _header: 'Phase 8 — Mein Fazit' -->

<div class="phase-bar"></div>

## Drei Sätze

1. Vanilla nutzt niemand — getunt ist eine andere Liga.
2. **MCP** ist der größte Hebel, nicht der Modell-Wechsel.
3. **Cowork** zeigt <span class="b5-colon">:</span> der Stack ist nicht mehr nur für Devs.

---

<!-- _class: divider -->
<!-- _header: '' -->
<!-- _footer: '' -->

# „One more thing…"

<span class="eyebrow">Steve Jobs</span>

---

<!-- _header: '' -->
<!-- _footer: '' -->

## aiui <span class="b5-colon">:</span> native macOS-Dialoge für Claude Code

Statt im Chat zurückzuschreiben, öffnet der Agent **echte Mac-Dialoge** — dort, wo du eh schon arbeitest.

- **`confirm`** vor zerstörerischen Aktionen — Delete, Drop, Force-Push, Deploy
- **`ask`** für Auswahl aus mehreren Optionen, wenn Kontext pro Option zählt
- **`form`** für mehrere Felder, Secrets, Datum, Slider, Bildvergleich

> Drag-and-drop Install (DMG, Apple Silicon). Kein Python, kein Homebrew, kein Terminal.

[github.com/byte5ai/aiui](https://github.com/byte5ai/aiui) — Open Source (MIT), made by **byte5**.

---

<!-- _class: closing -->
<!-- _header: '' -->

# Vielen Dank.

<span class="eyebrow">Material zum Mitnehmen</span>

- **Claude Code Docs** <span class="b5-colon">:</span> [code.claude.com/docs](https://code.claude.com/docs)
- **Cowork & Plugins** <span class="b5-colon">:</span> [claude.com/plugins](https://claude.com/plugins)
- **Spec-Kit** <span class="b5-colon">:</span> [github.com/github/spec-kit](https://github.com/github/spec-kit)
- **Wie LLMs wirklich funktionieren** <span class="b5-colon">:</span> [byte5.ai/de/tutorials/wie-llms-wirklich-funktionieren](https://www.byte5.ai/de/tutorials/wie-llms-wirklich-funktionieren)
- **byte5** <span class="b5-colon">:</span> [byte5.de](https://www.byte5.de)

<span class="eyebrow">Du suchst Unterstützung bei deinem digitalen Projekt?</span>

**Dein digitales Projekt** <span class="b5-colon">:</span> unsere Expert:innen beraten dich transparent.
