#!/usr/bin/env python3
"""
qa_check.py — QA-Gate für daily-briefing.

Liest ein Markdown-File, prüft Top-Level-Bullets gegen die Regeln aus
references/qa-gate.md, schreibt JSON an stdout.

Verwendung:
    python3 qa_check.py <markdown_file>

Exit-Codes:
    0 — alle Pflicht-Checks pass
    1 — mindestens ein Pflicht-Check fail
    2 — File-IO-/Argument-Fehler

Stdlib-only.
"""

from __future__ import annotations

import json
import re
import sys
import urllib.parse
from pathlib import Path

HYPE_WORDS = {
    "revolutionary", "revolutionär",
    "game-changing", "game-changer",
    "bahnbrechend",
    "disruptive", "disruptiv",
    "leverage", "synergy", "synergie",
    "unprecedented", "groundbreaking",
}

MIN_WORDS = 8
MAX_WORDS = 25
EXPECTED_BULLETS = 5


def extract_bullets(md: str) -> list[str]:
    """Top-Level-Bullets nur — keine eingerückten Unter-Bullets."""
    bullets: list[str] = []
    for line in md.splitlines():
        if line.startswith(("- ", "* ", "+ ")):
            bullets.append(line[2:].strip())
    return bullets


def count_words(s: str) -> int:
    return len(re.findall(r"\b\w+\b", s, flags=re.UNICODE))


def has_source(bullet: str) -> bool:
    return bool(re.search(r"\[[^\]]+\]\([^)]+\)\s*$", bullet))


def source_host(bullet: str) -> str | None:
    m = re.search(r"\(([^)]+)\)\s*$", bullet)
    if not m:
        return None
    try:
        return urllib.parse.urlparse(m.group(1)).netloc.lower() or None
    except Exception:
        return None


def hype_hits(bullet: str) -> list[str]:
    low = bullet.lower()
    return sorted(w for w in HYPE_WORDS if w in low)


def main() -> int:
    if len(sys.argv) != 2:
        print(
            json.dumps({"error": "usage: qa_check.py <markdown_file>"}),
            file=sys.stderr,
        )
        return 2

    path = Path(sys.argv[1])
    try:
        md = path.read_text(encoding="utf-8")
    except OSError as e:
        print(json.dumps({"error": f"Cannot read file: {e}"}), file=sys.stderr)
        return 2

    bullets = extract_bullets(md)
    checks: dict[str, str] = {}
    warnings: list[str] = []

    # 1. Bullet-Count
    if len(bullets) == EXPECTED_BULLETS:
        checks["bullet_count"] = "pass"
    else:
        checks["bullet_count"] = (
            f"fail (found {len(bullets)}, expected {EXPECTED_BULLETS})"
        )

    # 2. Source on each bullet
    missing_src = [i for i, b in enumerate(bullets, 1) if not has_source(b)]
    checks["sources_present"] = (
        "pass" if not missing_src else f"fail (bullets without source: {missing_src})"
    )

    # 3. Min words
    too_short = [i for i, b in enumerate(bullets, 1) if count_words(b) < MIN_WORDS]
    checks["min_length"] = (
        "pass" if not too_short else f"fail (bullets too short: {too_short})"
    )

    # 4. Max words
    too_long = [i for i, b in enumerate(bullets, 1) if count_words(b) > MAX_WORDS]
    checks["max_length"] = (
        "pass" if not too_long else f"fail (bullets too long: {too_long})"
    )

    # 5. Hype words
    hype_pairs = [(i, hype_hits(b)) for i, b in enumerate(bullets, 1) if hype_hits(b)]
    if hype_pairs:
        checks["no_hype_words"] = "fail"
        for i, words in hype_pairs:
            warnings.append(f"Bullet {i} contains hype words: {', '.join(words)}")
    else:
        checks["no_hype_words"] = "pass"

    # Warning-only: duplicate source hosts
    hosts = [h for h in (source_host(b) for b in bullets) if h]
    counts: dict[str, int] = {}
    for h in hosts:
        counts[h] = counts.get(h, 0) + 1
    duplicates = {h: c for h, c in counts.items() if c > 1}
    if duplicates:
        warnings.append(f"Duplicate source hosts: {duplicates}")

    passed = all(v == "pass" for v in checks.values())
    report = {
        "passed": passed,
        "bullet_count_found": len(bullets),
        "checks": checks,
        "warnings": warnings,
    }
    json.dump(report, sys.stdout, ensure_ascii=False, indent=2)
    sys.stdout.write("\n")
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
