# Quick guide: Strata + Gyro-S + DFlash2

How to run **Qwen3.8-Flash-Next Gyro-S** on Strata with **DFlash2** drafting (Strata **0.2.10+** / engine **0.1.56+**).

Aimed at a Linux box with an NVIDIA GPU (~12 GB VRAM), **≥32 GB RAM**, and a fast NVMe drive.

## Hardware checklist

| Need | Why |
| --- | --- |
| NVIDIA GPU, compute **8.6+** (RTX 30 / A6000 class, 40, or 50 series) | DFlash2 Auto targets sm_86, 8.9, 12.0, and 12.1 |
| **~28 GB** RAM+VRAM combined free for Gyro-S | Weights alone need about 27.6 GB |
| **~60 GB** free NVMe | Gyro-S download is about 58.5 GB (n-gram / PLE table stays on disk) |
| Driver that can run the **CUDA 13** engine package | First `strata launch` fetches the matching engine |

**Gyro-S** is the option that fits a ~32 GB PC. **Gyro-M** wants about 35 GB combined — skip it unless you have more RAM.

## 1. Install Terminal (0.2.10 or newer)

```bash
curl -fsSL https://github.com/Niko1221/Strata/releases/latest/download/install.sh -o install.sh
sh install.sh
export PATH="$HOME/.local/bin:$PATH"
strata --version   # want 0.2.10+ / build 0.1.56+
```

If Terminal is already installed but older:

```bash
strata update
```

### NixOS note

Bundled CPython may need `steam-run` and system CA certs. A typical wrapper for `~/.local/bin/strata`:

```sh
#!/bin/sh
REAL="${STRATA_HOME:-$HOME/.local/share/strata}/terminal/current/bin/strata"
export SSL_CERT_FILE="${SSL_CERT_FILE:-/etc/ssl/certs/ca-certificates.crt}"
export REQUESTS_CA_BUNDLE="${REQUESTS_CA_BUNDLE:-$SSL_CERT_FILE}"
export CURL_CA_BUNDLE="${CURL_CA_BUNDLE:-$SSL_CERT_FILE}"
if command -v steam-run >/dev/null 2>&1; then
  exec steam-run "$REAL" "$@"
fi
exec "$REAL" "$@"
```

## 2. Launch Gyro with Auto drafting (DFlash2)

Dry-run first:

```bash
strata launch --plan --family gyro --model Gyro-S \
  --drafting auto --context 88k --kv q4_0 --vision cpu --no-tui
```

Real start (first time downloads the model and about **1.2 GB** for the DFlash2 pack):

```bash
strata launch --family gyro --model Gyro-S \
  --drafting auto --context 88k --kv q4_0 --vision cpu \
  --tune skip --access lan --port 8082 --yes --no-tui
```

On **0.2.10+**, `--drafting auto` selects **DFlash2** for Gyro (not the 5.2 GB MTP layer).

Log lines to look for:

```text
[strata] drafting: DFlash2 alone (--draft dflash2, ...)
ready: http://127.0.0.1:8082/v1
```

### Optional preset

```bash
strata launch --family gyro --model Gyro-S --drafting auto \
  --context 88k --kv q4_0 --vision cpu --tune skip \
  --access lan --port 8082 --save-preset gyro-s --yes --no-tui
```

Later:

```bash
strata launch --preset gyro-s --yes --no-tui
```

## 3. Smoke test

```bash
curl -sS http://127.0.0.1:8082/v1/models

curl -sS http://127.0.0.1:8082/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "qwen3.8-flash-next-gyro-gyro-s",
    "messages": [{"role": "user", "content": "Say hi in three words"}],
    "max_tokens": 64,
    "temperature": 0
  }'
```

Point Open WebUI or any OpenAI-compatible client at:

```text
http://<host>:8082/v1
```

## 4. Useful knobs and gotchas

| Topic | Detail |
| --- | --- |
| Force DFlash2 | `--drafting dflash2` |
| Force MTP | `--drafting mtp` |
| Parallel requests | `--parallel` / `--batch` of 2+ → Auto falls back to **MTP** (DFlash2 is one request at a time) |
| RAM | Gyro will use most of a 32 GB machine — avoid also running Kind or other heavy agents on the same box |
| Disk | Keep models on NVMe; the n-gram / PLE table is read every token |
| Rollback engine | `strata components rollback`, then launch with `--drafting mtp` if needed |

## One-liner summary

1. Install Terminal  
2. `strata update` to **0.2.10+**  
3. `strata launch --family gyro --model Gyro-S --drafting auto --context 88k --kv q4_0`  
4. Confirm the **DFlash2 alone** log line  
5. Call `:8082/v1`

## References

- [Gyro docs](https://github.com/Niko1221/Strata/blob/master/docs/GYRO.md)
- [Strata 0.2.10 release notes](https://www.stratat.com/en/releases/v0.2.10)
- [GitHub releases](https://github.com/Niko1221/Strata/releases)
