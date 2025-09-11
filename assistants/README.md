# Assistants: Multi-Setup

Creates a Router assistant and per-role assistants based on docs/multi_role_model.json and prompts/ROUTER.md.

## Prerequisites
- Node 18+
- `.env` with `OPENAI_API_KEY=<key>` at repo root
- Files present: `docs/multi_role_model.json`, `prompts/ROUTER.md`

## Run

```
npm run assistants:multi-setup
```

Outputs:
- Vector Store id
- Router Assistant id
- Per-role Assistant ids
- Writes `assistants/assistant_ids.json`

## Notes
- All assistants share one vector store with key docs and prompts.
- Router is meant to route/annotate; your app can read `[router]` block and switch to a role assistant by id.
