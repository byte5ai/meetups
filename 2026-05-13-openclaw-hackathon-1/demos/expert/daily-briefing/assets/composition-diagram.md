# `daily-briefing` Composer — Pipeline

## Mermaid-Diagramm

```mermaid
flowchart TD
    URL([RSS-URL Input]) --> A["rss-zu-wochenbrief<br/>(Demo 1)"]
    A -->|5-Bullet Markdown| Q{"QA-Gate<br/>scripts/qa_check.py"}
    Q -->|pass| B["non-annoying-news<br/>(Demo-Skill)"]
    Q -->|fail| F([Diagnose<br/>+ Abbruch])
    B --> Issue([Issue: HTML + PDF])

    classDef external fill:#FFEBF5,stroke:#E6007E,stroke-width:2px
    classDef gate fill:#E0F7FB,stroke:#00B8D9,stroke-width:2px
    classDef fail fill:#FEF2F2,stroke:#DC2626,stroke-width:1px,stroke-dasharray:4 4
    class A,B external
    class Q gate
    class F fail
```

## Datenfluss

| Stage | Input | Output | Verantwortlich |
|---|---|---|---|
| 1 | RSS- / Atom-URL | 5-Bullet Markdown | Demo 1: `rss-zu-wochenbrief` |
| 2 | Markdown-Datei | JSON-Report + Exit-Code | `scripts/qa_check.py` (dieser Skill) |
| 3 | Markdown (pass) | Issue: HTML + PDF | `non-annoying-news` |

## QA-Failure-Verhalten

Bei `passed: false`:

1. JSON-Report ungekürzt im Chat anzeigen.
2. **Keinen** `non-annoying-news`-Aufruf machen.
3. Den Nutzer fragen: Rerun mit anderer URL? Manueller Fix? QA-Regeln in `references/qa-gate.md` anpassen?

## Schichten der AgentSkills-Spec in diesem Composer

- `SKILL.md` — Manifest + 5-Schritte-Workflow (das Composing).
- `references/qa-gate.md` — Lazy-loaded Spec der Quality-Checks.
- `scripts/qa_check.py` — ausführbarer Validator (stdlib-only).
- `assets/composition-diagram.md` — dieses Diagramm.

Genau die vier Schichten der [AgentSkills-Spec](https://agentskills.io) — Composer haben keine Sonderform.
