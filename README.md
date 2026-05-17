# clawborrator-mission-1

Throwaway target for clawborrator missions toolkit smoke testing.

- Workers may freely modify any file in this repo.
- Workers must commit to per-feature branches: `feat/<feature-id>`.
- Stack: TypeScript + Node + Express.
- Do not store anything here you want to keep. The repo may be force-pushed or wiped at any time.

## Development

### Install dependencies

```bash
npm install
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot-reload (tsx watch) on port 3000 (or `$PORT`) |
| `npm test` | Run the test suite with vitest |
| `npm run build` | Compile TypeScript to JavaScript in `dist/` |

### Running the dev server

```bash
npm run dev
# Server listening on port 3000
```

Then visit `http://localhost:3000/` — returns `{"status":"ok"}`.

### Building for production

```bash
npm run build
node dist/server.js
```
