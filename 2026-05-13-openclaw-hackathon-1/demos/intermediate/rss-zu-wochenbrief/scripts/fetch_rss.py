#!/usr/bin/env python3
"""
fetch_rss.py — Hole die letzten N Items aus einem RSS- oder Atom-Feed.

Verwendung:
    python3 fetch_rss.py <FEED_URL> [--limit 10]

Gibt JSON an stdout aus:
    [
      {"title": "...", "link": "...", "summary": "...", "published": "..."},
      ...
    ]

Stdlib-only — kein pip install nötig. Funktioniert mit RSS 2.0 und Atom.
"""

from __future__ import annotations

import argparse
import json
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET


USER_AGENT = "rss-zu-wochenbrief/1.0 (OpenClaw demo skill)"
ATOM_NS = {"atom": "http://www.w3.org/2005/Atom"}


def fetch_feed(url: str, timeout: int = 10) -> bytes:
    """Lädt rohes Feed-Bytes. Wirft urllib.error bei Netzwerk-Problemen."""
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()


def parse_rss20(root: ET.Element) -> list[dict]:
    items = root.findall(".//item")
    return [
        {
            "title": (it.findtext("title") or "").strip(),
            "link": (it.findtext("link") or "").strip(),
            "summary": (it.findtext("description") or "").strip(),
            "published": (it.findtext("pubDate") or "").strip(),
        }
        for it in items
    ]


def parse_atom(root: ET.Element) -> list[dict]:
    entries = root.findall("atom:entry", ATOM_NS)
    out: list[dict] = []
    for entry in entries:
        link_el = entry.find("atom:link", ATOM_NS)
        link = link_el.get("href", "") if link_el is not None else ""
        out.append(
            {
                "title": (entry.findtext("atom:title", default="", namespaces=ATOM_NS) or "").strip(),
                "link": link,
                "summary": (entry.findtext("atom:summary", default="", namespaces=ATOM_NS) or "").strip(),
                "published": (entry.findtext("atom:updated", default="", namespaces=ATOM_NS) or "").strip(),
            }
        )
    return out


def parse_feed(xml_bytes: bytes) -> list[dict]:
    """Erkennt RSS 2.0 vs Atom anhand des Roots / Inhalts."""
    root = ET.fromstring(xml_bytes)
    rss_items = parse_rss20(root)
    if rss_items:
        return rss_items
    return parse_atom(root)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Hole die letzten N Items aus einem RSS- oder Atom-Feed."
    )
    parser.add_argument("url", help="RSS- oder Atom-Feed URL")
    parser.add_argument(
        "--limit",
        type=int,
        default=10,
        help="Max Anzahl Items (default 10)",
    )
    args = parser.parse_args()

    try:
        xml_bytes = fetch_feed(args.url)
    except urllib.error.HTTPError as e:
        print(
            json.dumps({"error": f"HTTP {e.code} beim Feed-Abruf: {e.reason}"}),
            file=sys.stderr,
        )
        return 2
    except urllib.error.URLError as e:
        print(
            json.dumps({"error": f"Feed nicht erreichbar: {e.reason}"}),
            file=sys.stderr,
        )
        return 2

    try:
        items = parse_feed(xml_bytes)
    except ET.ParseError as e:
        print(
            json.dumps({"error": f"Feed ist kein gültiges XML: {e}"}),
            file=sys.stderr,
        )
        return 3

    json.dump(items[: args.limit], sys.stdout, ensure_ascii=False, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
