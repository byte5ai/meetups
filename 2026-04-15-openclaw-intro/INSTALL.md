# OpenClaw — Installations- und Demo-Leitfaden

> Lebendes Dokument zur Präsentation "Einführung in OpenClaw".
> Es gibt drei dokumentierte Installationspfade — wähle den, der zu
> deinem Anwendungsfall passt.

## 1. Was ist OpenClaw?

OpenClaw ist ein **lokal laufender, persönlicher AI-Assistent**. Der Kern
("Gateway") ist die Steuerebene; die eigentliche Bedienung passiert über
bestehende Messaging-Kanäle (WhatsApp, Telegram, Slack, iMessage,
Signal, Matrix, …). Skills steuern, was der Agent tun darf, und liegen
als `SKILL.md`-Verzeichnisse im Workspace.

- Repo: <https://github.com/openclaw/openclaw>
- Docs: <https://docs.openclaw.ai>
- Channel-Übersicht: <https://docs.openclaw.ai/channels>

## 2. Voraussetzungen

| Komponente   | Bare-Metal Ubuntu              | Docker (beide Varianten)     |
|--------------|--------------------------------|------------------------------|
| OS / Host    | Ubuntu 22.04 / 24.04 LTS       | Linux/macOS/Windows + WSL2   |
| Node.js      | **24 (empfohlen)** oder 22.14+ | im Image fixiert auf 24      |
| Sonstiges    | `git`, `build-essential`, `ffmpeg` | nur Docker + Compose v2  |
| Account      | nicht-root User (systemd --user) | beliebig                   |

LLM-Zugriff: ein API-Key bei einem unterstützten Provider (Anthropic,
OpenAI, OpenRouter, …) **oder** ein lokaler Ollama-Server.

## 3. Installations-Pfade — Übersicht

| Pfad                              | Image-Größe | Use Case                                           | Datei-Setup                                  |
|-----------------------------------|-------------|----------------------------------------------------|----------------------------------------------|
| **A. Bare-Metal Ubuntu**          | —           | Produktion auf eigenem VPS (Daemon, systemd)       | keine                                         |
| **B. Docker — VPS-Simulator**     | ~1 GB       | Lokale 1:1-Reproduktion eines VPS für Demo/Tests   | `Dockerfile`, `docker-compose.yml`           |
| **C. Docker — Lean Local Stack**  | ~250 MB     | Zum Lokal-Ausprobieren, schlanker Stack            | `Dockerfile.local`, `docker-compose.local.yml` |

A und B führen zu identischen Befehlen — B ist die "VM in der VM" für
risikoarmes Üben. C ist der Mini-Quickstart für Neugierige, ohne
Build-Toolchain im Image.

## 4. Pfad A — Bare-Metal Ubuntu (VPS / Produktion)

> Offizieller Weg laut OpenClaw-README. Der Onboarding-Wizard installiert
> den Gateway als **systemd-User-Service**, sodass er Reboots übersteht
> und nicht als root läuft.

### 4.1 System-Pakete

```bash
sudo apt update
sudo apt install -y curl ca-certificates git build-essential \
                    python3 ffmpeg

# Node 24 via NodeSource
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs

node --version    # v24.x
npm --version
```

### 4.2 OpenClaw global installieren

```bash
npm install -g openclaw@latest
openclaw --version
```

### 4.3 Onboarding + Daemon einrichten

```bash
openclaw onboard --install-daemon
```

Der Wizard fragt der Reihe nach ab:

1. Workspace-Pfad (Default: `~/.openclaw/workspace` — beibehalten)
2. LLM-Provider + Modell — Demo-Setup: `openai-codex/gpt-5.5` mit
   ChatGPT-OAuth-Flow. Alternativ: Anthropic, OpenAI direkt,
   OpenRouter, oder lokal via Ollama
3. API-Key bzw. OAuth-Autorisierung im Browser
4. Channels, die jetzt aktiviert werden sollen
5. Skills, die installiert werden

Konfiguration landet in `~/.openclaw/openclaw.json`:

```json
{
  "agent": {
    "model": "openai-codex/gpt-5.5"
  }
}
```

### 4.4 Service-Status

```bash
systemctl --user status openclaw
journalctl --user -u openclaw -f
```

Damit der User-Service auch ohne aktive SSH-Session weiterläuft,
einmalig `linger` aktivieren:

```bash
sudo loginctl enable-linger "$USER"
```

### 4.5 Updates

```bash
openclaw update --channel stable      # stable | beta | dev
# oder klassisch:
npm install -g openclaw@latest
systemctl --user restart openclaw
```

## 5. Pfad B — Docker als VPS-Simulator

> Verhält sich exakt wie Pfad A, läuft aber in einem isolierten
> Ubuntu-24.04-Container. Ideal für Demos, Reset-fähig zwischen
> Versuchen, ohne den Host zu beeinflussen.

### 5.1 Container starten

```bash
cp .env.example .env       # leerer Sentinel — Geheimnisse kommen via Onboarding
docker compose up -d --build
docker compose exec openclaw bash
```

Im Container die **identischen** Befehle wie auf Bare-Metal:

```bash
npm install -g openclaw@latest
openclaw onboard
# --install-daemon kann im Container nur mit systemd-aktiviertem
# Setup verwendet werden. Im Demo-Container starten wir den
# Gateway daher direkt im Vordergrund / via tmux.
```

### 5.2 Persistenz im Überblick

| Mount-Typ      | Host             | Container                     | Inhalt                                       |
|----------------|------------------|-------------------------------|----------------------------------------------|
| Named Volume   | `openclaw-home`  | `/root`                       | `~/.openclaw/openclaw.json`, History, Caches |
| Bind Mount     | `./openclaw`     | `/opt/openclaw`               | optional: geklontes OpenClaw-Repo            |
| Bind Mount     | `./workspace`    | `/root/.openclaw/workspace`   | Skills, `AGENTS.md`, `SOUL.md`               |

`./workspace` und `./openclaw` sind direkt aus dem Host-Editor
editierbar. Im Onboarding den Default-Workspace-Pfad
`~/.openclaw/workspace` beibehalten, damit das Mapping greift.

Backup des Named Volume:

```bash
docker run --rm -v openclaw-home:/data -v $PWD:/backup ubuntu \
  tar czf /backup/openclaw-home.tgz -C /data .
```

## 6. Pfad C — Docker Lean Local Stack

> Schlanker Mini-Stack für Teilnehmer, die OpenClaw lokal ausprobieren
> wollen, ohne Build-Toolchain im Image. OpenClaw ist global
> vorinstalliert — direkt loslegen.

### 6.1 Starten

```bash
cp .env.example .env       # leerer Sentinel
docker compose -f docker-compose.local.yml up -d --build
docker compose -f docker-compose.local.yml exec openclaw-local bash
```

Im Container nur noch das Onboarding starten:

```bash
openclaw onboard
```

### 6.2 Persistenz

| Mount-Typ      | Host             | Container                     | Inhalt                                |
|----------------|------------------|-------------------------------|---------------------------------------|
| Named Volume   | `openclaw-local-home` | `/root`                  | `~/.openclaw/`, Caches, Sessions      |
| Bind Mount     | `./workspace`    | `/root/.openclaw/workspace`   | Skills vom Host editierbar            |

Bewusst kein Source-Bind-Mount und kein Build-Stack — der Lean-Pfad ist
"npm-only", wie ein realer Endnutzer.

### 6.3 Aufräumen

```bash
docker compose -f docker-compose.local.yml down -v
```

## 7. WhatsApp-Integration

> Referenz: <https://docs.openclaw.ai/channels/whatsapp>

Gilt für alle drei Pfade — der Channel wird im Gateway registriert.

> **WebUI-Trennung** (sonst sucht man sich tot):
>
> - **`/communications`** — Auswahl-Liste aller verfügbaren Channels.
>   Hier wird WhatsApp **initial aktiviert** (Enabled-Toggle).
> - **`/channels`** — Liste der **aktiven** Channels. Hier wird im
>   Detail konfiguriert (Account, **DM Policy**, Allow From, Pairing,
>   Routing). Erscheint erst nach erfolgreicher Aktivierung.

### Schritt 1 — Channel aktivieren

#### Variante A — via WebUI (empfohlen)

1. Sidebar → **Communications**, im Suchfeld `whatsapp` tippen.
2. *Channels → WhatsApp*: **Enabled**-Toggle umlegen.
3. **Save** drücken.
4. Auf **Channels** wechseln → WhatsApp sollte mit Status *Configured*
   gelistet sein. QR-Code für die Pairing erscheint dort (ggf. Reload).

> **⚠️ Falle**: NICHT zusätzlich unter *Accounts → Add Entry* einen
> leeren Custom-Slot anlegen. Beim Pairing erzeugt OpenClaw automatisch
> den `default`-Account. Ein parallel angelegter Custom-Account
> versucht dieselbe Nummer zu nutzen → Logout-Loop, Bot tot.
> Wenn passiert:
> `openclaw config unset channels.whatsapp.accounts.<custom-name>`
> + Gateway-Restart.

#### Variante B — via CLI (Fallback)

1. **Channel registrieren** — der Wizard zeigt einen QR-Code direkt
   im Terminal:

   ```bash
   openclaw channels add whatsapp
   ```

2. **Auf dem Handy**: WhatsApp öffnen → *Einstellungen → Verknüpfte
   Geräte → Gerät hinzufügen* → QR-Code scannen. WhatsApp meldet
   "Verknüpft", OpenClaw loggt `Listening for personal WhatsApp
   inbound messages`.

3. **Test (Self-Chat)**: in WhatsApp den eigenen "Mitteilung an mich
   selbst"-Chat öffnen, eine DM schreiben → der Bot antwortet sofort.
   Self-Messages werden als `(self)` markiert und sind auto-trusted,
   kein Pairing nötig.

### Schritt 2 — DM-Policy auf eigene Nummer beschränken

Für Personal-Use ist der Default `dmPolicy: "pairing"` unschön: jede
fremde Nummer, die anschreibt, löst eine Bot-Antwort mit Pairing-Code
aus. Lösung: auf `allowlist` umstellen mit der eigenen Nummer als
einziger erlaubten Sender.

**Vier Modi für `channels.whatsapp.dmPolicy`:**

| Modus | Verhalten |
| --- | --- |
| `pairing` | Default — unbekannte Sender bekommen Pairing-Code (per `openclaw pairing approve whatsapp <code>` freigeben) |
| `allowlist` | nur Nummern in `allowFrom` werden beantwortet *(Empfehlung für Personal-Use)* |
| `open` | jeder darf — `allowFrom: ["*"]` (nicht empfohlen) |
| `disabled` | alle DMs blockiert |

#### Variante A — via WebUI (empfohlen)

1. Sidebar → **Channels** → *WhatsApp* öffnen.
2. Sektion *Access* → **DM Policy** auf `allowlist` setzen.
3. Eigene Nummer in **Allow From** eintragen (E.164-Format,
   z. B. `+4915123456789`).
4. **Save** drücken — Bot ignoriert ab sofort alle anderen Sender stumm.

#### Variante B — via CLI

```bash
openclaw config set channels.whatsapp.dmPolicy allowlist
openclaw config set channels.whatsapp.allowFrom '["+4915123456789"]'
openclaw config set channels.whatsapp.selfChatMode true
docker compose restart openclaw   # oder: openclaw gateway restart
```

#### Variante C — direkt in `~/.openclaw/openclaw.json`

```json
{
  "channels": {
    "whatsapp": {
      "dmPolicy": "allowlist",
      "allowFrom": ["+4915123456789"],
      "selfChatMode": true
    }
  }
}
```

> **Verifikation**: nach Reload schreibt eine fremde Nummer → Bot bleibt
> stumm (kein Pairing-Code mehr). Self-DM funktioniert weiter, da die
> linked self number per Default in der Allowlist steht (siehe
> [Doku](https://docs.openclaw.ai/channels/whatsapp#access-control-and-activation)).

## 8. Sicherheits-Notizen

- Standardmäßig läuft die `main`-Session **mit Hostzugriff**. Für
  Produktion: `agents.defaults.sandbox.mode: "non-main"` setzen, damit
  fremde Channels in Docker-/SSH-Sandboxen laufen.
- Allowlist auf eigene Telefonnummern, User- oder Server-IDs (je nach
  Channel) einschränken — sonst kann jeder, der den Bot findet, Befehle
  senden.
- Tokens **nie** ins Git-Repo committen; `~/.openclaw/openclaw.json`
  liegt außerhalb des Repos (im Docker-Setup im Named Volume
  `openclaw-home`), `.env` ist in `.gitignore`.
- Auf dem VPS: OpenClaw als **nicht-root User** laufen lassen
  (`systemd --user`), nicht als `root`.
- Reverse-Proxy / Tailscale für Remote-Zugriff einsetzen, kein direkter
  Public-Listener auf dem Gateway-Port.

## 9. Troubleshooting

Die häufigsten Stolpersteine aus Setup und Demo-Praxis:

### Gateway / WebUI

- **WebUI nicht erreichbar aus dem Container** — `gateway.bind` steht
  vermutlich auf `lan` (deckt Loopback nicht ab). Auf `auto`
  umstellen, dann sind Loopback und Bridge-Interface beide aktiv:
  ```bash
  openclaw config set gateway.bind auto
  ```
- **Default Gateway-Port** ist `18789`. Im Docker-Compose-Setup wird
  er auf `127.0.0.1:18789` gemappt — nie als Public-Listener.
- **Auth-Token für die WebUI-URL bauen** (Token wird aus
  Sicherheitsgründen nicht von `dashboard` gedruckt):
  ```bash
  echo "http://localhost:18789/?token=$(jq -r .gateway.auth.token ~/.openclaw/openclaw.json)"
  ```

### WhatsApp

- **Bot antwortet nach Container-Restart nicht mehr** — der QR muss
  *nicht* neu gescannt werden. Der `default`-Account ist im Named
  Volume persistent. Falls doch Re-Pairing nötig (z. B. nach
  WhatsApp-Logout am Handy): einmal `openclaw channels add whatsapp`
  und neuen QR scannen.
- **Logout-Loop nach versehentlichem "Add Entry"** — siehe Falle in
  Sektion 7. Custom-Account aus der Config entfernen + Restart.
- **Fremde Nummern bekommen Pairing-Codes** — Default-Verhalten.
  Schritt 2 in Sektion 7 (DM-Policy auf `allowlist`) macht den Bot
  stumm gegenüber Unbekannten.
- **Lange Stille zwischen Frage und Antwort** — `reactionLevel: ack`
  in der Channel-Config aktiviert ein Pre-Reply-Emoji (👀 / 🤔)
  als sofortiges Feedback. Block-Streaming
  (`agents.defaults.blockStreamingDefault: on` +
  `channels.whatsapp.blockStreaming: true`) liefert die Antwort in
  mehreren Bubbles statt als einem Text-Block.

### Docker

- **`docker compose down -v`** löscht Named Volumes — also auch
  `openclaw-home`. Komplett-Reset für Demos, aber Re-Onboarding nötig.
  Reset ohne Volume-Verlust: `docker compose restart openclaw`.
- **Config-Änderungen** in `~/.openclaw/openclaw.json` greifen erst
  nach Gateway-Reload: `docker compose restart openclaw` (Compose-Setup)
  oder `systemctl --user restart openclaw` (Bare-Metal).

### Systemd (Bare-Metal)

- **User-Service stoppt nach SSH-Logout** — `linger` einmalig
  aktivieren: `sudo loginctl enable-linger "$USER"`.
- **`--install-daemon` im Docker-Container** funktioniert nicht
  zuverlässig (kein systemd im Image). Im Container den Gateway direkt
  im Vordergrund starten oder über tmux/`docker compose`-Entrypoint.

## 10. Weiterführende Links

- Getting Started: <https://docs.openclaw.ai/start/getting-started>
- Onboarding-Wizard: <https://docs.openclaw.ai/start/wizard>
- Konfiguration: <https://docs.openclaw.ai/gateway/configuration>
- Sicherheits-/Sandbox-Modell: <https://docs.openclaw.ai/gateway/security>
- Skills-Registry (ClawHub): <https://clawhub.ai>
