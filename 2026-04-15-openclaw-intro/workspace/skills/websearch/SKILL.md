---
name: websearch
description: Sucht aktuelle Informationen im Web via Tavily Search API. Use when Marcel asks about news, events, current weather, recent releases, anything that requires fresh data outside of training-knowledge.
metadata:
  openclaw:
    requires:
      bins: ["curl", "jq"]
    primaryEnv: TAVILY_API_KEY
---

# Web Search via Tavily

Live-Daten aus dem Web. Kein OAuth, nur ein API-Key. Antwort enthält bereits eine LLM-Zusammenfassung plus die Original-Quellen.

## Konfiguration

- **API-Key** (Env): `TAVILY_API_KEY` — aus tavily.com Dashboard, Format `tvly-...`
- **Endpoint**: `https://api.tavily.com/search`
- **Auth**: Bearer-Header (`Authorization: Bearer $TAVILY_API_KEY`)

## Aufruf

Bei jeder Frage, die aktuelle / live / lokale Informationen braucht:

```bash
curl -s -X POST https://api.tavily.com/search \
  -H "Authorization: Bearer $TAVILY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "<die Suchanfrage>",
    "search_depth": "basic",
    "include_answer": true,
    "max_results": 5,
    "country": "germany"
  }' \
  | jq '{answer, results: [.results[] | {title, url, content}]}'
```

## Parameter-Hinweise

- `search_depth`: `basic` für Standard (1 Credit), `advanced` für tiefere Recherche (2 Credits, mehr Snippets pro Quelle)
- `include_answer`: immer `true` — die kuratierte Zusammenfassung ist das Wertvollste
- `country`: bei lokalen Anfragen setzen (`germany`, `austria`, `switzerland`, …)
- `include_domains` / `exclude_domains`: optional, bei spezifischen Quellen
- `max_results`: 3-5 reicht meistens, mehr macht die Antwort unübersichtlich

## Antwort-Format

```json
{
  "query": "...",
  "answer": "<LLM-zusammengefasste Direkt-Antwort>",
  "results": [
    { "title": "...", "url": "https://...", "content": "Snippet-Text", "score": 0.81 }
  ]
}
```

→ `answer` direkt an User weitergeben (oder im Persona-Stil umformulieren). `results[]` als Quellen-Liste anhängen, wenn der User die Original-Links sehen will.

## Typische Anfragen

- "Was läuft diese Woche in Frankfurt?" → `country: germany`, query mit Region.
- "Aktuelles Wetter in Bali?" → `country: indonesia`.
- "Letztes OpenClaw-Release?" → `include_domains: ["github.com"]`.

## Fehlerfälle

- **HTTP 401** → API-Key fehlt oder ungültig. Marcel bitten, `TAVILY_API_KEY` in der Env zu prüfen.
- **HTTP 429** → Rate-Limit erreicht (1000/Monat free Tier). Bis nächsten Monat warten oder Plan upgraden.
- **HTTP 432** → Plan-Limit überschritten. Same.
