#!/usr/bin/env bash
# Entrypoint fuer den OpenClaw-Container.
#
# Verhalten:
#   - Wenn ~/.openclaw/openclaw.json fehlt -> Onboarding-Hinweis ausgeben
#     und den Container am Leben halten (sleep infinity), damit man via
#     `docker compose exec openclaw bash` einsteigen und onboarden kann.
#   - Wenn Config existiert -> Gateway als PID 1 starten. Stirbt der
#     Gateway, terminiert auch der Container und docker compose
#     (restart: unless-stopped) startet sauber neu.
#
# Bind-Mode "lan" ist Pflicht im Container, damit Docker-Port-Mapping
# auf 18789 vom Host aus erreichbar ist. Auf einem Bare-Metal-VPS bleibt
# die Bind-Wahl beim Anwender (loopback + SSH-Tunnel ist dort sicherer).

set -euo pipefail

CONFIG="${OPENCLAW_CONFIG_PATH:-/root/.openclaw/openclaw.json}"

if [[ ! -f "$CONFIG" ]]; then
  cat <<'BANNER'
====================================================================
  OpenClaw ist noch nicht onboarded.

  Container betreten und Wizard starten:
    docker compose exec openclaw bash
    openclaw onboard

  Danach:
    docker compose restart openclaw

  (Container haelt sich solange via "sleep infinity" am Leben.)
====================================================================
BANNER
  exec sleep infinity
fi

echo "[entrypoint] starting OpenClaw Gateway (bind=auto, port=18789)"
# bind=auto: LAN-Interface + Loopback. "lan" allein laesst den Container-CLI
# (127.0.0.1) nicht durch und macht openclaw health/logs unbrauchbar.
exec openclaw gateway --bind auto
