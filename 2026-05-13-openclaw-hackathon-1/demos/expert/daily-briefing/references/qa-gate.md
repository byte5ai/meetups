# QA-Gate für `daily-briefing`

Was prüft das Gate zwischen `rss-zu-wochenbrief` und `non-annoying-news`.

## Pflicht-Checks (blockierend)

| # | Check | Kriterium |
|---|---|---|
| 1 | `bullet_count` | Genau 5 Top-Level-Bullets (`- `, `* `, `+ `) |
| 2 | `sources_present` | Jede Bullet endet mit `[Quelle · Datum](url)` |
| 3 | `min_length` | Jede Bullet ≥ 8 Wörter |
| 4 | `max_length` | Jede Bullet ≤ 25 Wörter |
| 5 | `no_hype_words` | Keine Wörter aus der Hype-Liste (siehe `scripts/qa_check.py`) |

Schon ein einziger Fail in 1–5 → Gate blockt, `non-annoying-news` wird *nicht* aufgerufen.

## Warnungen (nicht blockierend)

- **Duplikate in Quellen-Hosts** — wenn 2+ Bullets denselben Hostnamen verlinken, gibt das Gate eine Warnung aus. Inhaltliche Diversität ist wünschenswert, aber kein hartes Kriterium.

## Output-Format

`qa_check.py` schreibt JSON an stdout:

```json
{
  "passed": true,
  "bullet_count_found": 5,
  "checks": {
    "bullet_count": "pass",
    "sources_present": "pass",
    "min_length": "pass",
    "max_length": "pass",
    "no_hype_words": "pass"
  },
  "warnings": []
}
```

- Exit-Code `0`, wenn `passed: true`.
- Exit-Code `1`, wenn mindestens ein Check fail.
- Exit-Code `2`, wenn das File nicht lesbar ist.

## Warum gerade diese Checks?

- **Bullet-Count** — entscheidet, ob das Artefakt überhaupt das richtige Format hat. Alles andere ist Subsystem-Detail.
- **Sources Present** — die Hauptmotivation von `non-annoying-news`: Quellen-Grounding. Ohne Quelle keine Aufnahme.
- **Min/Max Length** — Bullets, die zu kurz sind, sind Telegrammstil; zu lange sind unverstanden. Beides ist Editorial-Failure.
- **No Hype Words** — wenn die Bullets Buzz-Vokabular enthalten, hat der Upstream-Skill halluziniert oder den Style-Guide ignoriert.

## Was das Gate NICHT prüft

- **Wahrheitsgehalt** der Bullets — keine Faktencheck-Pipeline. Wenn der Upstream-Skill etwas Falsches schreibt, kommt es durchs Gate.
- **Stilistische Qualität** über die Hype-Wort-Liste hinaus — der Validator ist eine Hygiene-Stufe, kein Editor.
