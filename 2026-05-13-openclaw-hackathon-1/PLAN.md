# Plan — drei Demos für die Skill-Levels

Drei Referenz-Skills unter `demos/`, die zeigen, wie ein
Hackathon-Output auf jedem Level konkret aussehen kann. Teilnehmer
können sie klonen, inspizieren oder als Startpunkt für eigene
Varianten nutzen.

**Bau-Reihenfolge:** Intermediate zuerst (`rss-zu-wochenbrief` ist der
Baustein für den Expert-Composer), dann Entry (schneller Win), dann
Expert. Jeder gehäkelte Punkt = ein Commit.

---

## Setup

- [x] `demos/README.md` — Übersicht: was zeigt jede Demo, in welcher Reihenfolge ansehen
- [x] Verzeichnisse anlegen: `demos/entry/`, `demos/intermediate/`, `demos/expert/` *(implizit beim ersten File-Write)*

---

## Demo 1 — Intermediate: `rss-zu-wochenbrief`

**Ziel:** RSS-Feed-URL als Input → 5-Bullet-Wochenbrief im Markdown.
Zeigt das vollständige Mindest-Pattern eines AgentSkills:
`SKILL.md` + 1 Reference + 1 Script + 1 Asset-Template.

**Warum dieses Beispiel:** echtes Netzwerk-Input, deterministische
Output-Form, klares 1-zu-1-Mapping zwischen Input und Artefakt.

**Dateien:**

- [x] `demos/intermediate/rss-zu-wochenbrief/SKILL.md` — Frontmatter (`name`, `description`), Workflow-Schritte, Trigger-Beispiele
- [x] `demos/intermediate/rss-zu-wochenbrief/README.md` — Was es tut, wie lokal testen
- [x] `demos/intermediate/rss-zu-wochenbrief/references/editorial-style.md` — Stil-Regeln: jede Bullet hat Was · Quelle · Datum
- [x] `demos/intermediate/rss-zu-wochenbrief/scripts/fetch_rss.py` — Python-Script: Feed pullen, Items als JSON ausgeben *(stdlib-only, live gegen HN-RSS getestet)*
- [x] `demos/intermediate/rss-zu-wochenbrief/assets/template.md` — Markdown-Template mit Platzhaltern

**Definition of Done:** Agent kann mit einer RSS-URL gefüttert werden
und gibt einen sauberen 5-Bullet-Brief im Stil des Templates zurück.
*Script-Layer verifiziert; Agent-End-to-End wird Phase 0 zeigen.*

---

## Demo 2 — Entry: `byte5-news-remix`

**Ziel:** Personalisierte Variante von `non-annoying-news` ohne eine
Zeile eigenen Code. Zeigt, dass „remix" = Config + Design-Tokens reicht.

**Warum dieses Beispiel:** Phase-0-Installation reicht als
Voraussetzung — kein neues Skill-Setup nötig. Maximaler Erfolg in
minimaler Zeit, ideal für Einstieg.

**Dateien:**

- [x] `demos/entry/byte5-news-remix/README.md` — Wie man's in eigenes `non-annoying-news` reinläd
- [x] `demos/entry/byte5-news-remix/config.json` — Title, Topics, Sources, Cadence, Delivery — alles auf byte5-Tech-News *(7 Top-Level-Keys, JSON-valid)*
- [x] `demos/entry/byte5-news-remix/design-tokens.css` — byte5-Magenta, Days One, Density-Token *(reine Tokens, kein Selektor-Mapping)*

**Definition of Done:** mit installiertem `non-annoying-news` kann ein
Teilnehmer den Config-Pfad überschreiben und ein byte5-gefärbtes Issue
rendern. *Config-Schema entspricht den im Skill-README dokumentierten Onboarding-Feldern.*

---

## Demo 3 — Expert: `daily-briefing` (Composer)

**Ziel:** Orchestriert `rss-zu-wochenbrief` + `non-annoying-news` mit
einem eigenen QA-Gate dazwischen. Zeigt, wie man bestehende Skills als
Bausteine nimmt und mit eigener Logik verheiratet.

**Warum dieses Beispiel:** macht den Composer-Pattern konkret —
Output von Skill A wird durch ein eigenes Gate gevalidiert, bevor
Skill B aufgerufen wird. Echtes Engineering, kein Spielzeug.

**Dateien:**

- [x] `demos/expert/daily-briefing/SKILL.md` — Frontmatter, Composer-Workflow (rss-zu-wochenbrief → QA → non-annoying-news)
- [x] `demos/expert/daily-briefing/README.md` — Architektur + Anleitung
- [x] `demos/expert/daily-briefing/references/qa-gate.md` — Was prüft das Gate (Bullet-Anzahl, Pflichtfelder, Editorial-Standard-Check)
- [x] `demos/expert/daily-briefing/scripts/qa_check.py` — Validator zwischen den Skills *(stdlib, beide Pfade getestet)*
- [x] `demos/expert/daily-briefing/assets/composition-diagram.md` — Mermaid-Diagramm der Pipeline

**Definition of Done:** Agent bekommt eine RSS-URL, der Composer
fährt die Pipeline durch, QA-Gate failed sauber bei kaputtem Input,
sonst landet das Ergebnis als non-annoying-news Issue.
*QA-Gate-Layer verifiziert (pass + fail Pfade); Composer-End-to-End wird Phase 0 zeigen.*

---

## Wenn alle drei stehen

- [x] `demos/README.md` finalisieren — verlinkt jede Demo, erklärt Lese-Reihenfolge
- [x] Closing-Slide #20 ergänzen — Link auf `demos/`
- [x] Commit + Push, Pages-Deploy verifizieren *(Run 25786347920 success)*
</content>
