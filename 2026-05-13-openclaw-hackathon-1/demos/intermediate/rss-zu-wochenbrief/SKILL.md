---
name: rss-zu-wochenbrief
description: Verwandle einen RSS- oder Atom-Feed in einen knackigen 5-Bullet-Wochenbrief im Markdown. Trigger, wenn der Nutzer eine RSS-URL nennt und einen Wochenbrief, Weekly Digest, Wochenrückblick oder Newsletter-Zusammenfassung daraus haben möchte.
---

# rss-zu-wochenbrief

Ein OpenClaw AgentSkill — nimmt eine RSS- oder Atom-Feed-URL, holt die jüngsten Items, und gibt einen kompakten 5-Bullet-Wochenbrief im Markdown zurück.

## Wann triggern

- Nutzer gibt eine Feed-URL und fragt nach „Wochenbrief", „Weekly", „Digest", „Rückblick" oder „Newsletter-Zusammenfassung".
- Nutzer möchte die letzten Beiträge eines Newsletters / Blogs kondensiert sehen.

## Workflow

1. Lade `references/editorial-style.md` — Stil-Regeln für die einzelnen Bullets.
2. Rufe `scripts/fetch_rss.py <URL>` auf. Das Script gibt JSON mit den letzten 10 Items zurück (`title`, `link`, `summary`, `published`).
3. Wähle die 5 wichtigsten Items aus. Kriterien:
   - Aktualität (jüngere Items vor älteren, aber nicht ausschließlich)
   - Diversität (kein doppeltes Thema, kein doppelter Autor)
   - Substanz (keine reinen News-Ticker, kein Marketing-Filler)
4. Schreibe pro Item eine Bullet nach den Regeln aus `references/editorial-style.md`.
5. Setze den Brief mit `assets/template.md` zusammen — fülle die Platzhalter `{{TITLE}}`, `{{DATE_RANGE}}`, `{{SOURCE_FEED}}` und `{{BULLET_1}}`…`{{BULLET_5}}`.
6. Gib das fertige Markdown direkt im Chat zurück. Wenn der Nutzer eine Datei verlangt, schreibe in den Pfad, den er nennt.

## Was NICHT tun

- **Keine Links erfinden** — nur Links aus dem Feed verwenden. Wenn ein Item keinen Link hat, lasse die Quellen-Klammer leer und markiere mit `[Quelle fehlt]`.
- **Keine Cliffhanger-Bullets** wie „Schauen Sie sich an…" oder „Lesen Sie hier…" — jede Bullet muss alleine stehen.
- **Bei weniger als 5 Items im Feed:** nimm alle und markiere im Brief klar `> Quellen-Pool war kleiner als 5 — weniger Bullets.`
- **Bei Script-Fehler:** zeige dem Nutzer die Fehlermeldung aus stderr, halluziniere keinen Brief.

## Beispiel-Aufruf

> „Mach mir einen Wochenbrief aus https://hnrss.org/frontpage"
