# VPS-Simulator — vollstaendiges Ubuntu-24.04-Userland mit Build-Toolchain.
# Zweck: lokal exakt das Verhalten reproduzieren, das Teilnehmer auf einem
# echten VPS sehen (Bare-Metal Ubuntu). Installation von OpenClaw erfolgt
# wie auf einem echten VPS via:  npm install -g openclaw@latest
#
# Fuer schlankes Lokal-Spielzeug ohne Build-Toolchain siehe Dockerfile.local.
FROM ubuntu:24.04

ARG NODE_MAJOR=24
ARG TZ=Europe/Berlin

ENV DEBIAN_FRONTEND=noninteractive \
    LANG=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8 \
    TZ=${TZ} \
    PNPM_HOME=/root/.local/share/pnpm \
    PATH=/root/.local/share/pnpm:/root/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# 1) Apt-Pakete (eigene Layer — Fehler hier ist sofort lokalisierbar)
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
        ca-certificates curl gnupg git \
        build-essential python3 pkg-config \
        sudo tzdata locales \
        jq unzip less vim nano tmux htop iputils-ping dnsutils \
        ffmpeg \
 && rm -rf /var/lib/apt/lists/*

# 2) Locale + Timezone ohne dpkg-reconfigure (vermeidet Debconf-PATH-Probleme)
RUN sed -i 's/^# *en_US.UTF-8/en_US.UTF-8/' /etc/locale.gen \
 && locale-gen en_US.UTF-8 \
 && update-locale LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
 && ln -fs "/usr/share/zoneinfo/${TZ}" /etc/localtime \
 && echo "${TZ}" > /etc/timezone

RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_MAJOR}.x | bash - \
 && apt-get install -y --no-install-recommends nodejs \
 && rm -rf /var/lib/apt/lists/* \
 && corepack enable \
 && corepack prepare pnpm@latest --activate \
 && npm install -g bun

# OpenClaw global ins Image backen — sonst lebt es nur in der Writable Layer
# und ist nach `--force-recreate` futsch. Same Pattern wie Dockerfile.local.
RUN npm install -g openclaw@latest \
 && openclaw --version

WORKDIR /opt/openclaw

# Entrypoint startet den Gateway als PID 1 (bzw. haelt den Container am
# Leben, falls noch kein Onboarding gelaufen ist). So uebersteht der
# Gateway docker compose restart und ist nicht von einer TUI-Session
# abhaengig.
COPY docker/entrypoint.sh /usr/local/bin/openclaw-entrypoint
RUN chmod +x /usr/local/bin/openclaw-entrypoint
ENTRYPOINT ["/usr/local/bin/openclaw-entrypoint"]
