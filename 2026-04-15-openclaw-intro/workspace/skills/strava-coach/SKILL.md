---
name: strava-coach
description: Self-bootstrapping Strava integration for Marcel. Handles OAuth dance, automatic token refresh, and refresh-token rotation persistence. Use when Marcel asks about activities, training history, distance, pace, fitness trends, or anything from his Strava data.
metadata:
  openclaw:
    requires:
      bins: ["curl", "jq"]
---

# Strava Coach

Verbindet sich mit Marcels Strava-Account und liest Aktivitäts-Daten aus.
**Self-managing OAuth** — Marcel pairt einmal, danach kümmert sich der Skill um alles.

## Konfiguration

- **Statische Secrets** (in der Env, gesetzt vor Skill-Use):
  - `STRAVA_CLIENT_ID` — Client ID aus der Strava-API-App
  - `STRAVA_CLIENT_SECRET` — Client Secret aus derselben App
- **Tokens-Datei** (von der Skill verwaltet):
  - Pfad: `~/.openclaw/strava-tokens.json`
  - Schema: `{ "access_token": "…", "refresh_token": "…", "expires_at": <unix-seconds> }`

## Choreografie

Vor jedem Strava-API-Call diese drei Phasen durchgehen.

### Phase 1 — Bootstrap (wenn `~/.openclaw/strava-tokens.json` nicht existiert)

Marcel muss seinen Strava-Account einmalig autorisieren. Antworte ihm in **genau diesem Format** (Markdown-Link, klar formuliert):

> **Strava-Verbindung aufbauen** — bitte einmalig den folgenden Schritt machen:
>
> 1. Klicke hier: [Strava authorisieren](https://www.strava.com/oauth/authorize?client_id=$STRAVA_CLIENT_ID&response_type=code&redirect_uri=http://localhost&scope=activity:read_all)
> 2. Drücke **Authorize**. Dein Browser landet auf einer leeren Seite — das ist okay.
> 3. Kopiere den `code`-Parameter aus der URL und schick ihn mir hier zurück.

Sobald Marcel den `code` schickt, tausche ihn gegen Tokens und speichere die Antwort:

```bash
curl -s -X POST https://www.strava.com/oauth/token \
  -d client_id=$STRAVA_CLIENT_ID \
  -d client_secret=$STRAVA_CLIENT_SECRET \
  -d code=<CODE_VOM_USER> \
  -d grant_type=authorization_code \
  | jq '{access_token, refresh_token, expires_at}' \
  > ~/.openclaw/strava-tokens.json
```

Bestätige Marcel: *"Verbunden! Was möchtest du wissen?"*

### Phase 2 — Refresh (wenn `expires_at - now < 300`)

Access Token läuft in weniger als 5 Minuten ab. Frischen Token holen:

```bash
REFRESH=$(jq -r .refresh_token ~/.openclaw/strava-tokens.json)
curl -s -X POST https://www.strava.com/oauth/token \
  -d client_id=$STRAVA_CLIENT_ID \
  -d client_secret=$STRAVA_CLIENT_SECRET \
  -d refresh_token=$REFRESH \
  -d grant_type=refresh_token \
  | jq '{access_token, refresh_token, expires_at}' \
  > ~/.openclaw/strava-tokens.json
```

**Wichtig**: `refresh_token` kann rotieren. Immer die KOMPLETTE Antwort zurückschreiben, niemals nur den `access_token`.

### Phase 3 — Fetch

Eigentlicher API-Call mit dem aktuellen `access_token`:

```bash
TOKEN=$(jq -r .access_token ~/.openclaw/strava-tokens.json)
curl -s -H "Authorization: Bearer $TOKEN" \
  "https://www.strava.com/api/v3/athlete/activities?per_page=10" \
  | jq '[.[] | {name, type, distance_km: (.distance/1000), elapsed_min: (.elapsed_time/60), date: .start_date_local}]'
```

Antwort in eine menschenlesbare Zusammenfassung übersetzen — Datum, Distanz, Pace, Sportart. Bei Sport-Coach-Persona auch Bewertung dazugeben.

## Typische Anfragen

- "Wann hab ich zuletzt trainiert?" → Phase 1-3, dann letzte Aktivität nennen.
- "Wie viele KM diese Woche?" → Phase 1-3, dann Aktivitäten der letzten 7 Tage summieren.
- "Verbinde mich mit Strava" / "Strava connecten" → Phase 1 erzwingen (auch wenn Datei existiert, mit User-Bestätigung neu).

## Fehlerfälle

- HTTP 401 vom Strava-API trotz frischem Token → `refresh_token` ist invalid (revoked / zu lange ungenutzt). Bootstrap (Phase 1) neu starten.
- HTTP 429 (Rate Limit) → Marcel höflich mitteilen, in 15 Minuten nochmal probieren. Strava-API erlaubt 100 Calls / 15 min.
