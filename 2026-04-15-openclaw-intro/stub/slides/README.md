# slides/

Quellen für das Marp-Slide-Deck.

| Datei | Zweck |
| --- | --- |
| `deck.md` | Inhalts-Markdown — hier wird editiert |
| `theme.css` | byte5-Theme (Tokens, Layout, Code-Block-Styling, Print-Media) |
| `marp-engine.js` | Custom Marp-Engine — fügt jedem `<pre>` einen Copy-Button hinzu |
| `assets/` | Logos, Signets, Hintergründe |

## Lokal arbeiten

Aus dem Repo-Root:

```bash
npm install        # einmal
npm run dev        # Watcher auf http://localhost:8080
```

Änderungen an `deck.md` / `theme.css` werden live im Browser aktualisiert.

## Build

```bash
npm run build      # HTML nach dist/index.html
npm run pdf        # PDF nach dist/deck.pdf
```

CI baut beides automatisch beim Push nach `main` und deployt nach
GitHub Pages — siehe `.github/workflows/slides.yml`.
