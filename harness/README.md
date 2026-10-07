# Harness — About → local kind

Pipelines live in project `github_copilot_testing` (inline). YAML here is the source of truth for review.

| File | Identifier | Trigger | Stages |
|------|------------|---------|--------|
| `pipeline-deploy-local-kind.yaml` | `Deploy_About_Local_Kind` | Push → `main` | Build → Helm deploy (stable) |
| `pipeline-pr-preview.yaml` | `PR_Preview_About_Local_Kind` | PR open/sync | Build → ephemeral preview deploy |
| `pipeline-pr-teardown.yaml` | `PR_Teardown_About` | PR close (incl. merge) | Delete preview namespace |

## Stable

- Service / infra: `about` / `kind_infra_about` (namespace `games`)
- URL: https://www.burnsy.me (NodePort `30085`)

## PR previews

- Namespace: `games-pr-about-<prNumber>`
- Helm release: `about-pr-<prNumber>`
- URL: `https://about-pr-<prNumber>.burnsy.me`
- Torn down when the PR is closed or merged
