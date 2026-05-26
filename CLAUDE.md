# CLAUDE.md — Arbeit mit diesem Repo

Single source of truth für Agents (Claude Code, andere KI-Assistenten) und Menschen, die in diesem Repo arbeiten. Lies das hier **bevor** Du Dateien anlegst, verschiebst oder den Workflow änderst.

## Was ist das hier?

Ein **Monorepo für byte5-Meetups und Tech-Talks**. Jeder Vortrag liegt in einem eigenen, datums-präfixierten Subordner und enthält:

- Slides als Markdown (Marp), die per GitHub Actions zu HTML + PDF gerendert werden
- Optional: Demo-Code, Companion-Material (`INSTALL.md`, `demos/`, Docker-Setups …)

Alles wird auf https://byte5ai.github.io/meetups/ als statische Seite deployed. Die Root-URL ist eine byte5-gebrandete Landing-Page (`index.html`), die alle Meetups chronologisch listet.

**Es gibt keine Runtime-Anwendung** — kein Server, keine API. Nur statische Build-Artefakte.

## Repo-Layout

```
.
├── CLAUDE.md                              # diese Datei
├── README.md                              # öffentlicher Index (newest first)
├── index.html                             # byte5-gebrandete Landing für Pages root
├── assets/                                # Logo + Favicon für die Landing
│   ├── byte5-logo-cyan.svg
│   └── favicon.svg
├── .github/workflows/slides.yml           # baut & deployed alles
└── YYYY-MM-DD-<slug>/                     # ein Subordner pro Meetup
    ├── slides/
    │   ├── deck.md                        # Vortrags-Inhalt
    │   ├── theme.css                      # byte5-Theme (per Deck eigene Kopie)
    │   ├── marp-engine.js                 # Marp-Engine mit Copy-Button-Erweiterung
    │   └── assets/                        # Bilder, Logos, was die Slides referenzieren
    ├── package.json                       # optional: für `npm run dev` lokal
    ├── README.md                          # optional: deck-spezifische Notizen
    └── ...                                # optionales Companion-Material
```

### Naming-Convention

**Subordner heißen immer `YYYY-MM-DD-<slug>/`.**

- Datum = **Event-Datum** (nicht Commit-Datum, nicht Veröffentlichung)
- Slug = kebab-case, möglichst kurz, ohne Redundanz mit dem Datum
- Bei Serien: `-1`, `-2` Suffix (z. B. `openclaw-hackathon-1`)

Diese Convention ist **nicht verhandelbar**. Sie macht den Repo-Inhalt von `ls` selbst chronologisch sortiert (neuestes unten), passt zur README-Reihenfolge (neuestes oben, manuell), und gibt stabile URLs unter `byte5ai.github.io/meetups/<folder>/`.

## Build & Deploy

- **Trigger:** Push auf `main` mit Änderungen an `*/slides/**`, `index.html`, `assets/**` oder `.github/workflows/slides.yml`
- **Workflow:** `.github/workflows/slides.yml` baut für jeden Subordner Slides → `dist/<folder>/index.html` + `dist/<folder>/deck.pdf`, kopiert `assets/` mit, kopiert `index.html` nach `dist/index.html`
- **Pages:** `build_type: workflow` (kein Jekyll). Source = `dist/`-Artefakt.
- **Live nach:** ~60-90s (build + deploy)

Manueller Re-Build: `gh workflow run "Deploy meetup decks to GitHub Pages" --repo byte5ai/meetups`

## Ein neues Meetup hinzufügen — Rezept

Die folgende Reihenfolge ist die schmerzfreieste. Halte Dich daran.

### 1. Subordner anlegen

```bash
NEW="2026-06-15-mein-talk"   # YYYY-MM-DD-<slug>
mkdir -p "$NEW/slides/assets"
```

### 2. Slide-Boilerplate kopieren

Theme + Engine sind über alle Decks identisch. Kopiere von einem aktuellen Deck:

```bash
cp 2026-05-13-openclaw-hackathon-1/slides/theme.css "$NEW/slides/"
cp 2026-05-13-openclaw-hackathon-1/slides/marp-engine.js "$NEW/slides/"
cp -R 2026-05-13-openclaw-hackathon-1/slides/assets/* "$NEW/slides/assets/" 2>/dev/null || true
```

Optional, wenn `npm run dev` lokal genutzt werden soll:

```bash
cp 2026-05-13-openclaw-hackathon-1/package.json "$NEW/"
# package.json ggf. an die neuen Slide-Pfade anpassen, falls sich der Build vom Default unterscheidet
```

### 3. Slide-Datei schreiben

`<NEW>/slides/deck.md` mit Marp-Frontmatter:

```markdown
---
marp: true
theme: byte5
paginate: true
---

# Titel des Talks
Untertitel oder Speaker

---

## Slide 2
…
```

`theme: byte5` referenziert das Theme aus `theme.css` (die Theme-Datei deklariert `@theme byte5`). Wenn ein Sub-Deck nötig ist (wie bei `2026-05-05-claude-code/spec-kit-demo.md`), leg eine zweite `<name>.md`-Datei daneben.

### 4. Workflow-Build-Block ergänzen

In `.github/workflows/slides.yml` einen Build-Step nach dem Muster der bestehenden Blöcke einfügen (siehe `2026-04-15-openclaw-intro` als kürzeste Vorlage). Drei `npx marp …`-Aufrufe pro Deck:

- HTML → `dist/<NEW>/index.html`
- PDF → `dist/<NEW>/deck.pdf`
- `cp -R <NEW>/slides/assets dist/<NEW>/assets`

Bei Sub-Deck zusätzlich:

- HTML → `dist/<NEW>/<name>.html`
- PDF → `dist/<NEW>/<name>.pdf`

### 5. README-Eintrag (newest first)

In `README.md` ganz oben unter `## Meetups (newest first)` einen Block nach diesem Muster:

```markdown
### YYYY-MM-DD — <Titel>
**<Event-Typ> · <Speaker> · <N> slides**

<2-3 Sätze Beschreibung — was kommt im Talk vor?>

- Slides: <https://byte5ai.github.io/meetups/YYYY-MM-DD-<slug>/>
- PDF: <https://byte5ai.github.io/meetups/YYYY-MM-DD-<slug>/deck.pdf>
- [Optional: weitere Links zu INSTALL.md, demos/, Sub-Deck, …]
```

### 6. Landing-Page-Card ergänzen

In `index.html` einen neuen `<article class="card">`-Block einfügen — **vor** den bestehenden, weil "newest first". Vorlage (alle drei Cards sehen so aus, eine kopieren reicht):

```html
<article class="card">
  <div class="meta">
    <span class="type">Tech Talk</span>
    <time datetime="YYYY-MM-DD">YYYY-MM-DD</time>
  </div>
  <h2>Titel</h2>
  <div class="by">Speaker · N slides</div>
  <p class="desc">Kurze Beschreibung, max. ~3 Zeilen.</p>
  <div class="actions">
    <a class="primary" href="./YYYY-MM-DD-<slug>/">Open deck</a>
    <a class="secondary" href="./YYYY-MM-DD-<slug>/deck.pdf">PDF</a>
    <a class="secondary" href="https://github.com/byte5ai/meetups/tree/main/YYYY-MM-DD-<slug>">Source</a>
  </div>
</article>
```

### 7. Push und verifizieren

```bash
git add -A
git commit -m "feat(<slug>): Add deck — <Titel>"
git push
```

Warten bis der Workflow grün ist (`gh run watch --repo byte5ai/meetups`), dann curl-Check:

```bash
curl -sI https://byte5ai.github.io/meetups/YYYY-MM-DD-<slug>/ | head -1
curl -sI https://byte5ai.github.io/meetups/YYYY-MM-DD-<slug>/deck.pdf | head -1
curl -sL https://byte5ai.github.io/meetups/ | grep -c "YYYY-MM-DD-<slug>"
```

## Lokale Entwicklung

Pro Subordner mit eigener `package.json`:

```bash
cd YYYY-MM-DD-<slug>
npm install
npm run dev      # Live-Preview auf http://localhost:8080
npm run build    # Lokaler HTML-Build (dist/index.html)
npm run pdf      # Lokaler PDF-Build
```

Marp-Live-Preview ist deutlich schneller als der CI-Roundtrip. Nutze sie für Iteration. **Push erst, wenn die Slides stimmen** — jeder Push triggert einen Pages-Deploy.

## Gotchas

- **`byte5-logo.svg` (Datei mit `fill="currentColor"`) NICHT cross-origin via `<img>` laden** — rendert unsichtbar, weil der CSS-Kontext nicht propagiert. Nutze `assets/byte5-logo-cyan.svg` (vorkoloriert, self-contained).
- **PDFs unterscheiden sich Run-zu-Run um ±50 Bytes** (Marp embeddet einen Build-Timestamp). Nicht versuchen, byte-Parität zu erzwingen — der Inhalt ist identisch.
- **Workflow path-filter pflegen.** Bei neuem Subordner-Muster (z. B. wenn jemand `foo-2026/` statt `2026-foo/` einbringt) trigger der workflow nicht mehr automatisch. Das Pattern `*/slides/**` matched alle Top-Level-Folder mit `slides/`, ist also relativ tolerant — aber prüfe.
- **Pages-Source nicht auf Jekyll umstellen.** Wir nutzen `build_type: workflow`. Wer das ändert, killt den Custom-Build.
