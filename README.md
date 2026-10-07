# Burnsy — about me

Personal site for Jason Burns (`www.burnsy.me`).

Vite + React SPA, same build/deploy path as the arcade apps: Docker → local Zot → Helm on kind → Cloudflare tunnel.

## Development

```bash
npm install
npm run dev
```

## Deploy (local kind)

```bash
docker build -t localhost:5001/about:latest .
docker push localhost:5001/about:latest
helm upgrade --install about charts/about -n games --create-namespace \
  --set image.repository=localhost:5001/about \
  --set image.tag=latest
```

Public URL: https://www.burnsy.me
