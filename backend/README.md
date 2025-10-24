# Bambu Manager Backend

Backend service for Bambu Manager.

## Technology Stack

- Node.js 18
- Express.js
- PostgreSQL (via pg library)
- CORS enabled

## Features

- REST API endpoints
- Database connection with PostgreSQL
- Health check endpoint
- Environment-based configuration
- LAN access capability

## Environment Variables

See `.env.example` for required environment variables:

- `PORT`: Server port (default: 3000)
- `DB_HOST`: PostgreSQL host
- `DB_PORT`: PostgreSQL port
- `DB_NAME`: Database name
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password

## Local Development

```bash
npm install
npm run dev
```

## Docker Build

```bash
docker build -t bambu-manager-backend .
docker run -p 3000:3000 --env-file .env bambu-manager-backend
```

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api` - API information

## Notes

This directory can be converted to a git submodule when the `bambu-manager-backend` repository is created.
