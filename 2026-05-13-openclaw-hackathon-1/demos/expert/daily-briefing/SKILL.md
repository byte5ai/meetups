---
name: daily-briefing
description: Composer-Skill — verbindet rss-zu-wochenbrief mit non-annoying-news über ein eigenes QA-Gate. Trigger, wenn der Nutzer einen Daily Briefing, Tages-Brief, End-to-End-Issue aus einem RSS-Feed oder eine Pipeline RSS → Newspaper haben möchte.
---

# daily-briefing

Ein Composer-AgentSkill — orchestriert zwei andere Skills mit einer Qualitätsprüfung dazwischen.

## Pipeline

```
RSS-URL
    │
    ▼
rss-zu-wochenbrief     (Demo 1)
    │  5-Bullet-Markdown
    ▼
QA-Gate                (scripts/qa_check.py)
    │  pass  →  weiter
    │  fail  →  Diagnose + Stopp
    ▼
non-annoying-news      (Demo-Skill aus Phase 0)
    │
    ▼
Issue (HTML + ggf. PDF)
```

## Voraussetzungen

- `rss-zu-wochenbrief` muss installiert sein (siehe `demos/intermediate/`).
- `non-annoying-news` muss installiert *und* durchs Onboarding gegangen sein.

## Wann triggern

- Nutzer gibt eine RSS-URL und möchte ein **fertiges Issue**, nicht nur Bullets.
- Nutzer fragt nach „Daily Briefing", „End-to-End-Brief", „RSS zu Newspaper".

## Workflow

1. Lade `references/qa-gate.md` — beschreibt die QA-Kriterien.
2. **Step 1 — rss-zu-wochenbrief.** Ruf den Skill mit der RSS-URL auf, lass ihn die vollständige 5-Bullet-Markdown-Datei erzeugen. Schreibe das Ergebnis in eine temporäre Datei.
3. **Step 2 — QA-Gate.** Ruf `scripts/qa_check.py <markdown-pfad>` auf.
   - Exit-Code `0` und `"passed": true` → weiter zu Step 3.
   - Exit-Code `1` → zeige die JSON-Diagnose im Chat, breche ab. Frag den Nutzer, ob er die rss-zu-wochenbrief-Ausführung wiederholen, eine andere URL probieren oder die QA-Regeln anpassen möchte.
4. **Step 3 — non-annoying-news.** Übergib das QA-validierte Markdown als „pasted content"-Signal an `non-annoying-news`. Lass den Skill das finale Issue rendern (HTML zuerst, dann PDF wenn möglich).
5. Gib dem Nutzer am Ende: den Pfad zum Issue, eine 1-Satz-Zusammenfassung, und den QA-Report.

## Was NICHT tun

- **QA-Gate nicht überspringen** — auch wenn das Markdown auf den ersten Blick gut aussieht. Der Gate *ist* der Mehrwert dieses Skills.
- **Den rss-zu-wochenbrief-Output nicht modifizieren** zwischen Step 1 und Step 2 — dann wäre die QA wertlos.
- **Keine eigene RSS-Logik einbauen** — wenn rss-zu-wochenbrief fehlschlägt, ist das ein Bug *dort*. Hier nur weiterreichen.
- **Bei fehlenden Skills:** dem Nutzer sagen, *welcher* Baustein fehlt und wie man ihn installiert. Kein Silent-Fallback.

## Beispiel-Aufruf

> „Mach mir ein Daily Briefing aus https://hnrss.org/frontpage."
