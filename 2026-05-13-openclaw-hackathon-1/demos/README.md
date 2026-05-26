# Demos — drei Skill-Levels in Echt-Code

Drei Referenz-Skills, einer pro Hackathon-Skill-Level. Anschauen, klonen, remixen, oder als Startpunkt für eigene Ideen nehmen.

## Lese-Reihenfolge

Empfohlene Reihenfolge — von leicht nach schwer, weil der Expert-Composer den Intermediate-Skill als Baustein verwendet:

1. **Entry** → [`entry/byte5-news-remix/`](./entry/byte5-news-remix/) — Config + Design-Tokens für `non-annoying-news`. Kein eigener Code, nur Daten.
2. **Intermediate** → [`intermediate/rss-zu-wochenbrief/`](./intermediate/rss-zu-wochenbrief/) — Eigener kleiner Skill: RSS-Feed → 5-Bullet-Markdown. Volles AgentSkills-Pattern mit `SKILL.md` + `references` + `scripts` + `assets`.
3. **Expert** → [`expert/daily-briefing/`](./expert/daily-briefing/) — Composer: `rss-zu-wochenbrief` + QA-Gate + `non-annoying-news`.

## Wie die drei zusammenhängen

```
                                              non-annoying-news
                                            (Phase-0 Demo-Skill)
                                                     ▲
                                                     │
Demo Entry  ─────────  config/tokens overlay  ───────┤
(byte5-news-remix)                                   │
                                                     │
Demo Intermediate  ─────────────  produces  ─────────┐
(rss-zu-wochenbrief)                                 │
                                                     │
Demo Expert  ───────────────────  composes  ─────────┘
(daily-briefing)              + QA-Gate
```

- **Entry** modifiziert `non-annoying-news` von außen — Daten + Design.
- **Intermediate** ist ein eigenständiger Skill — neuer Code, neues Artefakt.
- **Expert** ist ein Composer, der Intermediate + `non-annoying-news` mit einem QA-Validator verheiratet.

## Inspektion ohne Installation

Jede Demo hat ein eigenes README mit Architektur-Erklärung. Lesen funktioniert ohne OpenClaw — die vier Schichten der [AgentSkills-Spec](https://agentskills.io) (`SKILL.md` · `references/` · `scripts/` · `assets/`) sind als Anschauungsmaterial gemacht.

## Installation in deinen Workspace

```bash
# Eine Demo in deinen aktiven OpenClaw-Skills-Ordner kopieren:
cp -R demos/<level>/<demo-name> ~/.openclaw/skills/

# Beispiel:
cp -R demos/intermediate/rss-zu-wochenbrief ~/.openclaw/skills/
```

Pfad-Präzedenz und alternative Scopes: [docs.openclaw.ai/tools/skills](https://docs.openclaw.ai/tools/skills).

## Was diese Demos nicht sind

- **Keine production-fertigen Skills** — sie zeigen Patterns, nicht Robustheit. Edge-Cases (kaputte Feeds, große Inputs, parallele Aufrufe) sind nicht abgedeckt.
- **Keine vollständigen Tutorials** — die READMEs erklären *was* der Skill tut, nicht *wie* du jeden Schritt selbst nachprogrammierst. Lies den Code direkt.
- **Nicht 1:1 als ClawHub-Publish-Kandidat gedacht** — das wäre ein eigenes Expert-Vorhaben.
