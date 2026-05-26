# Slides — "Einführung in OpenClaw"

Marp-basierte Präsentation im byte5-Design.

## Live-Vorschau (während der Bearbeitung)

**Variante A — VSCode-Extension** (empfohlen für Iteration):

1. Extension installieren: *"Marp for VS Code"* (`marp-team.marp-vscode`)
2. `deck.md` öffnen → "Open Preview to the Side"
3. Edits zeigen sich live; Custom-Theme wird automatisch geladen

**Variante B — Marp CLI mit Auto-Reload-Server:**

```bash
PORT=5555 npx @marp-team/marp-cli@latest --server slides
# öffnet http://localhost:5555
```

> Marp lauscht standardmäßig auf Port 8080 — das kollidiert oft mit
> anderen Dev-Servern. Wir nutzen daher konsistent **5555** für dieses
> Projekt. Andere freie Ports gehen analog via `PORT=<n>`.

## Export

Für die eigentliche Präsentation in einen statischen Output bauen:

```bash
# HTML (empfohlen für Live-Demo — funktioniert in jedem Browser)
npx @marp-team/marp-cli@latest slides/deck.md \
  --html --allow-local-files \
  --output slides/dist/deck.html

# PDF (für die Offline-Übergabe)
npx @marp-team/marp-cli@latest slides/deck.md \
  --pdf --allow-local-files \
  --output slides/dist/deck.pdf

# PPTX (für die CI-/Compliance-Übergabe an byte5-PowerPoint-Templates)
npx @marp-team/marp-cli@latest slides/deck.md \
  --pptx --allow-local-files \
  --output slides/dist/deck.pptx
```

`--allow-local-files` ist nötig, damit das byte5-Signet aus
`assets/byte5-signet-cyan.png` und das Wordmark aus
`assets/byte5-logo-white.png` ins Output eingebettet werden.

> Hinweis <span class="b5-colon">:</span> Beim PPTX-Export werden Slides als Bitmap-Bilder
> eingebettet — das sieht in PowerPoint pixelgenau aus, aber Texte sind
> dann nicht mehr direkt editierbar. Wer das PPTX nachträglich anpassen
> will, sollte am `deck.md` editieren und neu exportieren.

## Dateien

| Datei                     | Zweck                                         |
|---------------------------|-----------------------------------------------|
| `deck.md`                 | Slide-Inhalte (Marp-Markdown)                 |
| `theme.css`               | Marp-Theme nach byte5 Design System            |
| `assets/byte5-*.png`      | Logos, lokal eingebettet                       |
| `dist/`                   | Build-Outputs (gitignored)                     |

## Build während der Demo

Vor dem Talk einmal das HTML bauen und im Browser öffnen
(F11 für Vollbild, Pfeiltasten zum Navigieren). Kein Live-Server, keine
Live-Render-Latenz auf dem Beamer.

```bash
npx @marp-team/marp-cli@latest slides/deck.md \
  --html --allow-local-files \
  --output slides/dist/deck.html \
  && open slides/dist/deck.html
```

## Branding-Hinweise

Das Theme nutzt:

- **Days One** + **Nunito Sans** via Google Fonts (kein lokales Hosting nötig)
- byte5-Farb-Tokens (`#009FE3`, `#004B73`, `#EA5172`) aus dem Design System
- Den **magenta-Doppelpunkt** als wiederkehrendes Stilelement
  (`<span class="b5-colon">:</span>` im Markdown)
- Das Cyan-Signet oben rechts auf jeder Inhalts-Slide
- Die Title- und Divider-Slides invertiert in Blau dunkel mit dem
  Wordmark
