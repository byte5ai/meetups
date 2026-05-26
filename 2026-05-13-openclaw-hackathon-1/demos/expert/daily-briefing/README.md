# Demo: `daily-briefing` (Expert)

Ein Composer-AgentSkill — verbindet `rss-zu-wochenbrief` (Demo 1) und `non-annoying-news` über ein eigenes QA-Gate dazwischen.

## Was er zeigt

**Composer-Pattern** auf Expert-Level: bestehende Skills als Bausteine nehmen, eigene Logik (hier: ein Validator) dazwischenschalten, das Ergebnis weiterreichen.

```
RSS-URL  →  rss-zu-wochenbrief  →  QA-Gate  →  non-annoying-news  →  Issue
```

Volles Architektur-Diagramm + Datenfluss-Tabelle: [`assets/composition-diagram.md`](./assets/composition-diagram.md).

## Voraussetzungen

- `rss-zu-wochenbrief` installiert (Demo 1 unter `demos/intermediate/`).
- `non-annoying-news` installiert und durchs Onboarding gegangen.
- Python 3 verfügbar (stdlib-only für `qa_check.py`).

## Lokal testen — nur das QA-Gate

```bash
# Eigenes Markdown-File mit 5 Bullets bauen, durchs Gate jagen:
python3 demos/expert/daily-briefing/scripts/qa_check.py sample.md
echo "Exit: $?"
```

JSON-Report an stdout, Exit-Code `0` (pass) oder `1` (fail).

## Als OpenClaw-Skill installieren

```bash
cp -R demos/expert/daily-briefing ~/.openclaw/skills/
```

Triggern z. B. mit:

> „Mach mir ein Daily Briefing aus diesem Feed: https://hnrss.org/frontpage"

## Was du remixen kannst

- **`references/qa-gate.md` + `scripts/qa_check.py`** — eigene Qualitätsregeln. Andere Wortlängen-Grenzen, eigene Hype-Wort-Liste, neue Pflichtfelder.
- **`SKILL.md` Pipeline** — anderen Skill als Schritt 1 oder Schritt 3 einsetzen. Z. B. ein `meeting-zu-action-items` → QA-Gate → `non-annoying-news`.
- **`assets/composition-diagram.md`** — Mermaid-Diagramm aktualisieren, wenn du die Pipeline änderst.

## Warum das ein guter Expert-Demo ist

Drei Eigenschaften, die einen Composer von einem Standalone-Skill unterscheiden:

1. **Wiederverwendung statt Reimplementierung** — RSS-Parsing und Issue-Rendering kommen aus existierenden Skills.
2. **Gate als eigene Verantwortung** — der Composer prüft *zwischen* den Bausteinen, nicht innerhalb. Das ist der Mehrwert.
3. **Klare Failure-Modes** — wenn `rss-zu-wochenbrief` halluziniert, fängt das QA-Gate es ab, bevor `non-annoying-news` ein schwaches Issue rendert.
