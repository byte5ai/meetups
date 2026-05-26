# TOOLS.md — Marcels Setup

Lokale Lookup-Tabelle für Skills. Skills bleiben generisch (shareable),
hier liegt das, was nur bei mir gilt — IDs, Nummern, Streckennamen,
Provider-Eigenheiten.

## Communication

### WhatsApp
- Marcel: `+49 151 23456789` — Platzhalter; echte Nummer nur lokal in der unversionierten Workspace-Kopie
- Antworten knapp halten (Mobile-Lesbarkeit)

## Sport / Fitness

### Strava
- App-Name: `byte5-demo-bot`
- Relevante Activity-Types: `Run`, `Ride`, `VirtualRide`
- **Bei lokalen Empfehlungen `VirtualRide` immer ignorieren** (Zwift)
- Profilbezeichnung: Marcels Outdoor-Aktivitäten zählen, virtuelle nicht

### Frankfurter Outdoor-Strecken
- **Mainufer-Loop** — 8 km, flach, asphaltiert. Perfekt für Tempo-Läufe.
- **Niddapark-Runde** — 10 km, leicht hügelig, Trail/Asphalt-Mix.
- **Taunushänge** — 25–60 km Rad, Anstiege Königstein/Falkenstein.

## Web Search

### Tavily
- Default `country: germany` für lokale Anfragen
- Event-Anfragen: bevorzugt `laufkalender.de`, `eventbrite.de`, `runner.de`
- News/Releases: `include_domains: ["github.com"]`

---

Skills sind shared. Mein Setup ist meins. Wenn ein Skill *„hol mir was
von Strava"* sagt, weiß er hier, dass `VirtualRide` rausfällt und
Marcels Lieblings-Distanzen 5–10 km Laufen / <150 km Rad sind.
