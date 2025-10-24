# Bambu Manager

A monorepo for managing Bambu 3D printers, consisting of a frontend, backend, and database.

## Architecture

This project is organized as a monorepo with the following services:

- **Frontend**: React-based web interface (port 80)
- **Backend**: Node.js/Express API server with database access (port 3000)
- **Database**: PostgreSQL database (port 5432)

## Directory Structure

```
bambu-manager/
├── backend/              # Backend service (bambu-manager-backend)
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   └── .env.example
├── frontend/             # Frontend service (bambu-manager-frontend)
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   ├── nginx.conf
│   └── src/
├── docker-compose.yml    # Docker orchestration
└── README.md
```

## Prerequisites

- Docker (v20.10 or higher)
- Docker Compose (v2.0 or higher)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/iwo-strzebonski/bambu-manager.git
   cd bambu-manager
   ```

2. Start all services using Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:3000
   - Database: localhost:5432

## Services

### Backend

The backend service is a Node.js/Express application that:
- Connects to the PostgreSQL database
- Has access to the LAN (network mode can be configured)
- Exposes a REST API on port 3000
- Includes health check endpoint at `/health`

**Environment Variables** (see `backend/.env.example`):
- `PORT`: Server port (default: 3000)
- `DB_HOST`: Database host (default: db)
- `DB_PORT`: Database port (default: 5432)
- `DB_NAME`: Database name (default: bambu_manager)
- `DB_USER`: Database user (default: postgres)
- `DB_PASSWORD`: Database password (default: postgres)

### Frontend

The frontend service is a React application that:
- Communicates with the backend API
- Serves a web interface on port 80
- Uses Vite for development and build
- Uses Nginx for production serving

### Database

PostgreSQL database that:
- Stores application data
- Runs on port 5432
- Persists data in a Docker volume

## Development

### Backend Development

```bash
cd backend
npm install
npm run dev
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Building Docker Images

Build individual services:
```bash
docker-compose build backend
docker-compose build frontend
```

Build all services:
```bash
docker-compose build
```

## Docker Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### Rebuild and restart
```bash
docker-compose up -d --build
```

### Remove all containers and volumes
```bash
docker-compose down -v
```

## LAN Access

The backend service has access to the LAN. To enable host network mode for full LAN access:

1. Uncomment the `network_mode: host` line in `docker-compose.yml` under the backend service
2. Comment out the `ports` mapping for the backend service
3. Note: Host network mode is only available on Linux

## Health Checks

All services include health checks:
- **Database**: Checks PostgreSQL readiness
- **Backend**: Checks API endpoint availability
- **Frontend**: Checks Nginx server availability

Check service health:
```bash
docker-compose ps
```

## Troubleshooting

### Database connection issues
```bash
docker-compose logs db
docker-compose logs backend
```

### Frontend not loading
```bash
docker-compose logs frontend
```

### Reset everything
```bash
docker-compose down -v
docker-compose up -d --build
```

## Future: Git Submodules

When the `bambu-manager-frontend` and `bambu-manager-backend` repositories are created, this monorepo can be converted to use Git submodules:

```bash
# Add backend submodule
git submodule add https://github.com/iwo-strzebonski/bambu-manager-backend.git backend

# Add frontend submodule
git submodule add https://github.com/iwo-strzebonski/bambu-manager-frontend.git frontend

# Initialize and update submodules
git submodule update --init --recursive
```

## License

See individual service repositories for license information.