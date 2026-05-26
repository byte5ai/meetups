# byte5 Marp Slide Deck — Boilerplate

Self-contained Vorlage für Tech-Vorträge im byte5-Design.

- **Marp-basiert** — Slides als Markdown editieren
- **byte5-Theme** — Days One + Nunito Sans, Magenta-Pointer-Device,
  Phase-Progressbar, Kontext-Badges, dezente Code-Block-Highlighting
- **Copy-to-Clipboard** auf jedem Code-Block (Custom Marp Engine)
- **GitHub Pages CI** — Push nach `main` baut HTML + PDF und deployt
  automatisch

## Loslegen in drei Befehlen

```bash
git clone <dein-neues-repo>.git deck && cd deck
npm install
npm run dev          # Marp Watcher auf http://localhost:8080
```

## Scripts

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Watcher mit Live-Reload (Default-Port 8080) |
| `npm run build` | Statisches HTML nach `dist/index.html` |
| `npm run pdf` | PDF nach `dist/deck.pdf` |
| `npm run clean` | `dist/` löschen |

## Repo-Struktur

```
.
├── package.json                 # npm-Scripts + Marp-Dependencies
├── .gitignore                   # node_modules/, dist/
├── .github/workflows/slides.yml # GitHub Pages Auto-Deploy
└── slides/
    ├── deck.md                   # Vortrags-Inhalt — hier editieren
    ├── theme.css                 # byte5-Theme
    ├── marp-engine.js            # Custom Engine für Copy-Buttons
    └── assets/                   # Logo, Signet, Hintergründe
```

## Slide-Patterns (Cheat-Sheet)

Schau in `slides/deck.md` rein — die Vorlage zeigt jedes Pattern
einmal:

- **Title-Slide** — `<!-- _class: title -->` mit Eyebrow + H1 + H2
- **Phase-Divider** — `<!-- _class: divider -->` mit großer
  Phasen-Aussage
- **Phase-Content** — `<!-- _class: phase phase-N -->` mit
  Progressbar (`N` = 1–10)
- **Closing-Slide** — `<!-- _class: closing -->` mit Material zum
  Mitnehmen

Magenta-Doppelpunkt-Device als rhetorischer Pointer:

```html
## Begriff <span class="b5-colon">:</span> Erklärung
```

Kontext-Badges:

```html
<span class="badge badge-docker">Docker</span> Inhalt
<span class="badge badge-vps">VPS</span> Inhalt
<span class="badge badge-both">beide</span> Inhalt
```

## GitHub Pages aktivieren

1. Neues Repo auf GitHub anlegen, Boilerplate-Inhalt rein, Push nach
   `main`.
2. Repo → Settings → Pages → Source auf **GitHub Actions** stellen.
3. Beim nächsten Push nach `main` baut der Workflow automatisch und
   deployt das HTML-Deck. URL erscheint in **Settings → Pages**.

PDF wird parallel gebaut und unter `<pages-url>/deck.pdf` ausgeliefert.

## Lizenz / Verwendung

Boilerplate für byte5-interne Vorträge. Theme + Assets sind
byte5-Eigentum — bitte nicht außerhalb byte5-Kontexten verwenden.
