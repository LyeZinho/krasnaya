# Krasnaya - Low-Code Discord Engine

## Stack Requirements
- Node.js
- PostgreSQL
- Redis

## Run Locally (Unified Command)
To spin up the PostgreSQL and Redis databases via Docker Compose and automatically run the frontend and backend in parallel, use:

```bash
npm run dev
```

The services will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Postgres**: localhost:11900
- **Redis**: localhost:6379
