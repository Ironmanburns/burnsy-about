# Harness — About → local kind

Git Experience pipelines for this host's kind cluster (`demo-cluster`).

| File | Identifier | Trigger | Stages |
|------|------------|---------|--------|
| `pipeline-deploy-local-kind.yaml` | `Deploy_About_Local_Kind` | Push → `main` | Build → Helm deploy (stable) |
| `pipeline-pr-preview.yaml` | `PR_Preview_About_Local_Kind` | PR open/sync | Build → ephemeral preview deploy |
| `pipeline-pr-teardown.yaml` | `PR_Teardown_About_Local_Kind` | PR close (incl. merge) | Delete preview namespace |

## Stable

- Service / infra: `about` / `kind_infra_about` (namespace `games`)
- URL: https://www.burnsy.me (NodePort `30085`)

## PR previews

- Namespace: `games-pr-about-<prNumber>`
- Helm release: `about-pr-<prNumber>`
- URL: `https://about-pr-<prNumber>.burnsy.me` (Ingress → kind ingress → Cloudflare wildcard)
- Torn down automatically when the PR is closed or merged to `main`
