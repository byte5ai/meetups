# Prompts und Agents — byte5 Tech-Talk, 27. Mai 2026

Reveal.js-Slidedeck zum Talk **„Prompts und Agents — Ein Blick hinter die Kulissen von Claude"** (Christian Wendler, byte5).

37 Slides · 9 Kapitel · 2 interaktive Elemente · 2 progressive Reveals · ~40 Min Talk-Zeit.

## Was hier drin ist

```
2026-05-27-prompts-and-agents/
├── index.html              # das Deck (reveal.js, 1920×1080, fade-Transition)
├── interactive/
│   ├── stateless.html      # Slide 14 — manuelle Stateless-Animation (9 Schritte)
│   └── context-window.html # Slide 16 — Context-Window-Visualizer (lokale Token-Heuristik)
├── css/
│   ├── byte5-tokens.css    # Design-Tokens (Farben, Typo, Spacing) — vendored aus byte5-Designsystem
│   └── byte5-reveal-theme.css  # reveal-Overrides + alle Talk-spezifischen Layouts
├── fonts/
│   └── DaysOne-Regular.ttf # Headline-Font, lokal eingebunden
├── assets/                 # byte5-Logo (white/cyan/black) + Signet
├── shot.js                 # Dev-Tool — Headless-Chromium-Screenshots aller Slides
├── debug-fragments.js      # Dev-Tool — Fragment-State-Inspector für Reveal
├── package.json
└── README.md (diese Datei)
```

## Lokal starten

```bash
npm install
npm run dev
```

Öffnet einen statischen HTTP-Server auf Port **3010** (Port 3000 ist auf devhost belegt). Über Tailscale erreichbar unter <http://devhost:3010/>.

**Navigation:** Pfeiltasten · `Space` (vor) · `F` (Fullscreen) · `Esc` (Slide-Overview) · `?` (Hilfe).

**Progressive Reveals:** auf Slide 5 (Eliza-Pointe), Slide 33 (Vermenschlichungs-Pointe), Slide 37 (3 Take-aways nacheinander) — jeweils per Click ausgelöst, niemals automatisch.

**Interaktive Elemente:** Slide 14 + Slide 16 — als iframes eingebettet. Vollständig manuell Click-gesteuert (kein Auto-Play), Token-Schätzung lokal über Zeichen÷4 (keine API-Calls).

## Deployment

Push auf `main` triggert den Workflow `.github/workflows/slides.yml`. Der baut alle Decks im Repo und veröffentlicht sie als GitHub Pages unter:

→ <https://byte5ai.github.io/meetups/2026-05-27-prompts-and-agents/>

Live nach ~60–90s. Manueller Re-Trigger:

```bash
gh workflow run "Deploy meetup decks to GitHub Pages" --repo byte5ai/meetups
```

Status: `gh run watch --repo byte5ai/meetups`

## Visual-QA-Pipeline

Vor jeder größeren Änderung Screenshots aller Slides ziehen, um Layout-Overflow zu erkennen.

```bash
node ./shot.js 1,2,3,4,5 /tmp/deck-shots          # ausgewählte Slides
node ./shot.js 5:1,37:1,37:2,37:3 /tmp/deck-shots # Fragment-Steps: Slide:N
```

Setzt voraus, dass der Dev-Server läuft und Playwright-Chromium installiert ist:

```bash
npx playwright install chromium
```

(Chromium wird nicht systemweit installiert — bleibt in `~/.cache/ms-playwright/`. Pfad ist in `shot.js` hartcodiert.)

## Embedding in byte5.ai

Das Deck ist eine statische HTML-Site und kann via iframe in die byte5.ai-Website eingebettet werden:

```html
<iframe
  src="https://byte5ai.github.io/meetups/2026-05-27-prompts-and-agents/"
  width="100%"
  height="600"
  allowfullscreen
  loading="lazy"
  title="Prompts und Agents — byte5 Tech-Talk"
></iframe>
```

Reveal.js' native Fullscreen-Button (`F`-Taste innerhalb iframe oder Browser-Vollbild) macht den Talk-Modus zugänglich.

## Konventionen für Content-Änderungen

- **Slide-Layouts:** Klassen in `css/byte5-reveal-theme.css` definiert. Slide-Header-Pattern: `eyebrow` (uppercase Sub-Label, Cyan) → `slide-title` (Days One, ~76px) → optional `lead` mit magenta Doppelpunkt-Marker.
- **Magenta Doppelpunkt** (`<span class="colon">:</span>`): nur als Strukturmarker am Anfang eines Lead-Satzes. Nicht innerhalb von Wörtern, nicht als Highlight, nicht auf Bullets.
- **Quellen-Fußnoten:** `<p class="slide-source">…</p>` — wird automatisch mit „Quelle: " präfixiert, kursiv unten links.
- **Slide-Nummer:** `<span class="slide-num">NN / 37</span>` — Mono, gray, unten rechts. Auf Kapitel-Dividern und Statement-Slides nicht vorhanden (dort wirkt sie deplatziert).
- **Bühne:** 1920×1080 fix. reveal.js skaliert automatisch.
- **Keine Auto-Animationen.** Brand-Regel: alle Übergänge per Click, sanft, nie verspielt.

## Konzeptpapier

Das vollständige Talk-Konzeptpapier lag während der Slide-Erstellung in `tmp/talk-concept-paper.md` (per `.gitignore` aus dem Repo gehalten). Nach Fertigstellung des Decks gelöscht — Backup liegt beim Speaker.
