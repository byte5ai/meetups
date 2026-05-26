# OpenClaw Hackathon · 13. Mai 2026 · byte5 Office

Slide-Deck und Abend-Plan für einen OpenClaw-AgentSkills-Hackathon im
byte5-Office am 13. Mai 2026.

## Was ist OpenClaw?

[OpenClaw](https://openclaw.ai) ist ein open-source Personal AI
Assistant von [@steipete](https://x.com/steipete), der auf der eigenen
Maschine läuft. Er lädt **AgentSkills** — portable, versionierte
Ordner mit einem `SKILL.md`-Manifest, die dem Agent beibringen, wie er
spezifische Aufgaben löst. **ClawHub** ist die public Registry, aus
der Skills installiert werden können.

- [openclaw.ai](https://openclaw.ai) — Projekt-Seite
- [docs.openclaw.ai](https://docs.openclaw.ai) — Dokumentation
- [clawhub.ai](https://clawhub.ai) — public Skills-Registry
- [agentskills.io](https://agentskills.io) — die Spec, die OpenClaw implementiert

## Heute Abend

Alle Teilnehmer:innen haben einen laufenden OpenClaw. Wir starten mit
einer kurzen Demo, synchronisieren auf das Skill-Modell, und bauen
dann in kleinen Teams. Gesamt-Dauer ca. 3,5 h.

| Phase | Dauer | Inhalt |
|---|---|---|
| Demo | ~20 min | `non-annoying-news` live + Architektur-Walkthrough |
| **Phase 0 — Brain-Check** | ~30 min | Skill-Anatomy + Smoke-Tests |
| **Phase 1 — Level-Wahl** | ~10 min | Entry · Intermediate · Expert · Team-Bildung |
| **Phase 2 — Build** | ~120 min | Pomodoro 55 + 10 + 55 |
| **Phase 3 — Show & Tell** | ~30 min | 3 min pro Team, Demo > Slides |

## Demo-Skill

[**`non-annoying-news`**](https://github.com/iret77/non-annoying-news)
von [@iret77](https://github.com/iret77) — ein public AgentSkill, der
aus Bookmarks, Reading-Lists und Feeds eine kompakte Zeitung im
Magazin-Stil baut. Anti-Clickbait, Anti-Filler-Boxen, mit einer
*Personalization Gate*, die Onboarding erzwingt, bevor irgendetwas
generiert wird.

Installation während Phase 0:

```bash
openclaw skills install non-annoying-news    # native
clawhub install non-annoying-news            # alternative
```

## Aufgaben pro Level

Jedes Level kommt mit einer empfohlenen Aufgabe und einem **open
slot** für eigene Ideen.

- **Entry** — Bestehenden Skill remixen: Config, Design-Preset oder
  Signal-Quelle anpassen.
- **Intermediate** — Eigener kleiner Skill: *1 Input → 1 Artefakt*
  (RSS → Wochenbrief, Transcript → Action-Items, Notifications →
  Rückblick …). Mindest-Pattern: `SKILL.md` + 1 Reference-Doc + 1
  Script + 1 Asset-Template.
- **Expert** — Meta-Skill (analysiert andere Skills), Composer-Skill
  (orchestriert 2+ Skills mit eigenem QA-Gate) oder Round-Trip auf
  ClawHub (bauen → validieren → publishen).

## Spielregeln

- **Build-Hilfe:** dein eigener Agent als Pair-Programmer · ClawHub
  als Pattern-Quelle · Marcel + Mitstreiter als Mentoren bei Blöckern.
- **Erfolgs-Versprechen:** alle gehen mit etwas, das *läuft* — egal
  welches Level. Funktioniert > schön. Kein Production-Skill in 2 h.
- **Feedback-Regel** in Show & Tell: nur „cool, weil…" — Kritik
  bekommst du danach, einzeln, wenn du sie willst.

## Slides

Live-Deployment dieses Decks:

- **HTML:** <https://byte5ai.github.io/meetups/2026-05-13-openclaw-hackathon-1/>
- **PDF:** <https://byte5ai.github.io/meetups/2026-05-13-openclaw-hackathon-1/deck.pdf>

## Host

**Marcel Wege** · CTO @ byte5 · [mwege@byte5.de](mailto:mwege@byte5.de)
</content>
</invoke>