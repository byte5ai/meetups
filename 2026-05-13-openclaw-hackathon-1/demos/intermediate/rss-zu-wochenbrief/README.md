# Demo: `rss-zu-wochenbrief` (Intermediate)

Ein OpenClaw-AgentSkill, der einen RSS- oder Atom-Feed in einen kompakten 5-Bullet-Wochenbrief im Markdown verwandelt.

## Was er tut

1. Holt einen RSS- oder Atom-Feed via Python-Stdlib — **kein `pip install` nötig**.
2. Wählt 5 Items aus nach Aktualität · Diversität · Substanz.
3. Schreibt pro Item eine Bullet nach den Regeln aus `references/editorial-style.md`.
4. Setzt das Ergebnis mit `assets/template.md` zusammen.

## Warum das ein guter Intermediate-Demo ist

Diese Demo zeigt das vollständige Mindest-Pattern eines AgentSkills aus der [AgentSkills-Spec](https://agentskills.io) in der einfachsten sinnvollen Form — alle vier Schichten in einem Folder:

```
rss-zu-wochenbrief/
├── SKILL.md                          # Manifest + Workflow
├── references/editorial-style.md     # Lazy-loaded Lese-Stoff
├── scripts/fetch_rss.py              # Ausführbarer Helper
└── assets/template.md                # Output-Template
```

## Lokal testen (ohne OpenClaw)

```bash
# Stdlib-only, läuft sofort:
python3 demos/intermediate/rss-zu-wochenbrief/scripts/fetch_rss.py \
  https://hnrss.org/frontpage --limit 5
```

Erwartet ein JSON-Array an stdout, Fehler an stderr.

## Als OpenClaw-Skill installieren

Kopiere den Folder in deinen aktiven Workspace oder in den Personal-Agent-Scope:

```bash
cp -R demos/intermediate/rss-zu-wochenbrief ~/.openclaw/skills/
```

Dann triggern mit einer Prompt wie:

> „Mach mir einen 5-Bullet-Wochenbrief aus diesem RSS-Feed: https://hnrss.org/frontpage"

## Was du remixen kannst

- **`references/editorial-style.md`** — eigenen Schreibstil (Englisch, fachlicher, sarkastischer, was auch immer).
- **`assets/template.md`** — anderes Layout, andere Sprache, mehr / weniger Metadaten.
- **`scripts/fetch_rss.py`** — Filter ergänzen (z. B. „nur Items mit `[security]` im Titel", oder Datum-Range-Filter).
