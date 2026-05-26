# CLAUDE.md — Projekt-Kontext für Claude Code

Dieses Dokument beschreibt das Repository, damit Claude Code (und andere
KI-Assistenten) sinnvoll mitarbeiten können. Es ist die Single Source of
Truth für Konventionen, Build-Prozess und Deployment dieses Decks.

## Was ist das hier?

Eine **byte5 Marp-Slide-Deck-Boilerplate** — Tech-Vorträge werden in
Markdown geschrieben und mit [Marp](https://marp.app/) zu HTML- und
PDF-Decks gerendert. Push nach `main` triggert automatisch ein
GitHub-Pages-Deployment.

**Kernidee:** Slides sind Code. Versionierbar, diff-bar, im Editor
schreibbar, ohne Klick-Tooling.

## Tech-Stack

| Komponente | Zweck |
| --- | --- |
| **Marp CLI** (`@marp-team/marp-cli`) | Markdown → HTML/PDF Renderer |
| **Custom Marp Engine** (`slides/marp-engine.js`) | Erweitert Marp um Copy-to-Clipboard auf Code-Blöcken |
| **byte5-Theme** (`slides/theme.css`) | CI-Design: Days One + Nunito Sans, Magenta-Pointer, Phase-Progressbar, Kontext-Badges |
| **GitHub Actions** (`.github/workflows/slides.yml`) | Auto-Build + Deploy nach GitHub Pages |
| **Node.js / npm** | Toolchain (keine Anwendungslogik) |

Es gibt **keine** Runtime-Anwendung — keinen Server, keine API, keine
Datenbank. Nur ein statisches Build-Artefakt.

## Repo-Layout

```
.
├── package.json                  # npm-Scripts + Marp-Dependencies
├── .gitignore
├── .github/workflows/slides.yml  # GitHub Pages CI
├── README.md                     # Public-facing Doku
├── CLAUDE.md                     # diese Datei
└── slides/
    ├── deck.md                   # Vortrags-Inhalt — hier editieren
    ├── theme.css                 # byte5-Theme (CSS)
    ├── marp-engine.js            # Custom Engine (Copy-Buttons)
    ├── README.md                 # Slide-spezifische Hinweise
    └── assets/                   # Logos, Signets, Hintergründe (PNG)
```

**Bearbeitet wird primär `slides/deck.md`.** Theme und Engine sind
stabil — nur anfassen, wenn das CI-Design oder das Render-Verhalten
selbst geändert werden soll.

## Workflows

### Lokales Schreiben

```bash
npm install        # einmalig
npm run dev        # Watcher auf http://localhost:8080 mit Live-Reload
```

### Lokal bauen

```bash
npm run build      # → dist/index.html
npm run pdf        # → dist/deck.pdf
npm run clean      # dist/ löschen
```

### Deployment

Push nach `main` → GitHub Action baut HTML + PDF → Deploy nach Pages.
URL steht in **Repo → Settings → Pages**. PDF liegt unter
`<pages-url>/deck.pdf`.

Voraussetzung: **Settings → Pages → Source = GitHub Actions**.

## Slide-Patterns (Marp-Konventionen)

Slides werden über `<!-- _class: ... -->`-Direktiven typisiert. Die
Boilerplate kennt vier Klassen:

| Klasse | Zweck |
| --- | --- |
| `title` | Eröffnungs-Slide mit Eyebrow + H1 + H2 |
| `divider` | Phasen-Trenner mit großer Aussage |
| `phase phase-N` | Inhalts-Slide mit Progressbar (`N` = 1–10) |
| `closing` | Abschluss mit Material zum Mitnehmen |

**Magenta-Doppelpunkt** als rhetorischer Pointer:

```html
## Begriff <span class="b5-colon">:</span> Erklärung
```

**Kontext-Badges** für Container-/VPS-Inhalte:

```html
<span class="badge badge-docker">Docker</span>
<span class="badge badge-vps">VPS</span>
<span class="badge badge-both">beide</span>
```

`slides/deck.md` enthält jedes Pattern beispielhaft — vor dem Schreiben
einmal überfliegen.

## Konventionen für Beiträge

- **Sprache:** Deutsch in den Slides, Code-Kommentare englisch.
- **Code-Blöcke:** Sprache immer angeben (` ```bash`, ` ```ts` …) —
  sonst greift kein Syntax-Highlighting und kein Copy-Button.
- **Assets:** Neue Bilder unter `slides/assets/` ablegen. Pfade in
  Markdown relativ (`assets/foo.png`).
- **Theme-Änderungen:** Nur in `slides/theme.css`. Keine Inline-Styles
  in `deck.md`, außer für einmalige Sonderfälle.
- **Engine-Änderungen:** `slides/marp-engine.js` ist für Render-Hooks
  zuständig (z. B. Copy-Button-Markup). Render-Logik bleibt dort —
  nicht in CSS oder Markdown verstecken.
- **Keine externen Abhängigkeiten** in den Slides (keine CDN-Embeds,
  keine externen Iframes) — Decks müssen offline funktionieren.

## Was Claude Code beachten soll

- **Bauen ist nicht nötig nach Edits** — Lint/Typecheck reichen, der
  Watcher rendert live. (Folgt der globalen User-Regel.)
- **Theme nicht „aufräumen“** ohne Auftrag — die CSS-Variablen und
  Klassennamen sind CI-Spec, kein Refactor-Spielfeld.
- **`npm run build` lokal ausführen**, wenn unklar ist, ob ein Edit
  rendert — die CI ist nicht zum Debuggen da.
- **Translations / i18n:** Nicht relevant — Decks sind monolingual pro
  Branch.
- **Pull Requests:** Kein „Generated with Claude“-Footer (globale
  User-Regel).

## Bekannte Stolpersteine

- **Puppeteer / PDF-Build:** Braucht Chromium. CI installiert das
  automatisch; lokal ggf. `npx puppeteer browsers install chrome`
  ausführen, falls `npm run pdf` scheitert.
- **Port 8080 belegt:** `npm run dev -- --server.port 8081` oder
  belegenden Prozess killen.
- **GitHub Pages 404 nach erstem Deploy:** Settings → Pages → Source
  prüfen (muss „GitHub Actions“ sein, nicht „Deploy from branch“).

## Lizenz

Theme und Assets sind byte5-Eigentum. Die Boilerplate-Struktur darf
intern frei verwendet werden, Theme + Logos **nicht** außerhalb von
byte5-Kontexten.
