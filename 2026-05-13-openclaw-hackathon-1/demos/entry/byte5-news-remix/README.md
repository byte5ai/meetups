# Demo: `byte5-news-remix` (Entry)

Eine **Config-Overlay** für `non-annoying-news` mit byte5-Identität — kein eigener Code, nur Daten.

## Was es zeigt

„Remix" auf Entry-Level = einen bestehenden Skill mit eigener Identität versehen, ohne den Skill selbst anzufassen. Zwei Stellschrauben:

- **`config.json`** — Onboarding-Antworten fertig vorbereitet: Titel, Topics, Quellen, Cadence, Design-Preset.
- **`design-tokens.css`** — visuelle Identität: byte5-Magenta, Cyan-Akzent, Days One + Nunito Sans.

## Vorbereitung

`non-annoying-news` muss in deinem OpenClaw installiert sein — Phase 0 im Hackathon-Deck zeigt wie.

## Anwendung

Der Skill nennt im Onboarding den exakten Pfad seiner Config-Datei. Statt das Onboarding durchzuklicken:

1. Lass den Skill das Onboarding starten — bis du den Config-Pfad siehst.
2. Brich das Onboarding ab.
3. Kopiere `config.json` und `design-tokens.css` aus diesem Demo an den genannten Pfad.
4. `onboarding.complete` ist hier schon auf `true` gesetzt — Personalization Gate wird sauber passiert.
5. Trigger das nächste Issue:
   > „Render mir den nächsten `byte5 Tech Digest`."

## Was du remixen sollst

- **Topics + Exclusions** — was interessiert dich, was findest du langweilig?
- **Signals** — eigene RSS-Feeds, X-Bookmarks, Read-Later-App.
- **Design-Tokens** — eigene Akzentfarbe statt Magenta, anderer Font, andere Density.

## Was du auf diesem Level NICHT änderst

- **Den Skill-Code selber** — Sinn dieses Levels ist, das Skill-Modell zu *verwenden*, nicht es zu hacken.
- **Editorial-Standard von `non-annoying-news`** — der ist die Identität des Skills. Anderen Standard wollen → eigener Intermediate-Skill bauen (siehe Demo 1 unter `demos/intermediate/`).

## Quellen / Inspiration

- [`non-annoying-news`](https://github.com/iret77/non-annoying-news) — der Skill, den wir hier remixen.
- [AgentSkills Spec](https://agentskills.io) — Personalization als Konzept.
