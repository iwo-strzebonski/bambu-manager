# Docker Setup Summary

This document summarizes the Docker infrastructure created for the Bambu Manager monorepo.

## What Was Created

### 1. Monorepo Structure
```
bambu-manager/
├── backend/              # Backend service directory
├── frontend/             # Frontend service directory
├── docker-compose.yml    # Orchestration file
├── .env.example          # Environment variables template
├── start.sh              # Quick start script
└── stop.sh               # Quick stop script
```

### 2. Backend Service (`backend/`)

**Files:**
- `Dockerfile` - Multi-layer Docker image for Node.js backend
- `package.json` - Node.js dependencies (Express, pg, cors, dotenv)
- `index.js` - Main application with Express server and PostgreSQL connection
- `.env.example` - Environment variables template
- `.dockerignore` - Files to exclude from Docker build
- `README.md` - Service-specific documentation

**Features:**
- Express.js REST API on port 3000
- PostgreSQL database connection
- Health check endpoint at `/health`
- CORS enabled for frontend communication
- LAN access capability (configurable via docker-compose.yml)

**Dependencies:**
- express ^4.18.2
- pg ^8.11.0
- cors ^2.8.5
- dotenv ^16.3.1

### 3. Frontend Service (`frontend/`)

**Files:**
- `Dockerfile` - Multi-stage build (Node.js build + Nginx serve)
- `package.json` - React and Vite dependencies
- `vite.config.js` - Vite configuration with API proxy
- `nginx.conf` - Production Nginx configuration
- `index.html` - Main HTML file
- `src/main.jsx` - React entry point
- `src/App.jsx` - Main React component with backend health check
- `.dockerignore` - Files to exclude from Docker build
- `README.md` - Service-specific documentation

**Features:**
- React 18 web application
- Vite for development and build
- Nginx for production serving
- API proxy to backend
- Responsive UI showing backend status

**Dependencies:**
- react ^18.2.0
- react-dom ^18.2.0
- vite ^4.3.9
- @vitejs/plugin-react ^4.0.0

### 4. Database Service

**Configuration:**
- Image: `postgres:15-alpine`
- Port: 5432
- Database: `bambu_manager`
- Persistent volume: `postgres_data`
- Health checks included

### 5. Docker Compose Configuration

**Services Defined:**
1. **db** - PostgreSQL 15 database
   - Health check: PostgreSQL readiness
   - Volume: postgres_data

2. **backend** - Node.js/Express API
   - Depends on: db (with health check)
   - Port: 3000
   - Network: bambu-network
   - Health check: API endpoint
   - LAN access: Configurable (see comments in docker-compose.yml)

3. **frontend** - React/Nginx web app
   - Depends on: backend
   - Port: 80
   - Network: bambu-network
   - Health check: Nginx endpoint

**Networks:**
- `bambu-network` - Bridge network for inter-service communication

**Volumes:**
- `postgres_data` - Persistent storage for PostgreSQL data

## How to Use

### Quick Start
```bash
./start.sh
```
or
```bash
docker compose up -d --build
```

### Access Services
- Frontend: http://localhost
- Backend API: http://localhost:3000
- Backend Health: http://localhost:3000/health
- Database: localhost:5432

### View Logs
```bash
docker compose logs -f
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

### Stop Services
```bash
./stop.sh
```
or
```bash
docker compose down
```

### Remove All Data
```bash
docker compose down -v
```

## Special Features

### LAN Access for Backend
The backend service can access the local network. To enable full host network mode:
1. Edit `docker-compose.yml`
2. Uncomment `network_mode: host` under the backend service
3. Comment out the `ports` mapping
4. Restart services

Note: Host network mode is only available on Linux.

### Health Checks
All services include health checks:
- **Database**: Checks PostgreSQL readiness
- **Backend**: Checks API endpoint at `/health`
- **Frontend**: Checks Nginx server availability

View health status:
```bash
docker compose ps
```

## Environment Configuration

### Root Level (.env.example)
```bash
POSTGRES_DB=bambu_manager
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
BACKEND_PORT=3000
FRONTEND_PORT=80
```

### Backend (.env.example)
```bash
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_NAME=bambu_manager
DB_USER=postgres
DB_PASSWORD=postgres
```

## Future: Git Submodules

When the separate repositories are created:
- `bambu-manager-backend` repository
- `bambu-manager-frontend` repository

The backend/ and frontend/ directories can be converted to git submodules:

```bash
git submodule add https://github.com/iwo-strzebonski/bambu-manager-backend.git backend
git submodule add https://github.com/iwo-strzebonski/bambu-manager-frontend.git frontend
git submodule update --init --recursive
```

## Requirements Met

✅ Created monorepo structure for bambu-manager-frontend and bambu-manager-backend
✅ Created docker-compose.yml for orchestrating three services
✅ Created Dockerfile for backend service with database access
✅ Created Dockerfile for frontend service with backend dependency
✅ Configured PostgreSQL database service
✅ Backend has access to LAN (configurable)
✅ Frontend requires backend (dependency in docker-compose.yml)
✅ Backend requires database (dependency with health check in docker-compose.yml)
✅ All services networked together
✅ Health checks for all services
✅ Persistent storage for database
✅ Documentation and helper scripts

## Technical Decisions

1. **Node.js Backend**: Chose Express.js for simplicity and wide adoption
2. **React Frontend**: Modern React with Vite for fast development
3. **Multi-stage Frontend Build**: Optimizes production image size
4. **PostgreSQL 15**: Latest stable version with Alpine for smaller image
5. **Health Checks**: Ensures services are ready before dependent services start
6. **Bridge Network**: Default networking for service isolation and communication
7. **Persistent Volumes**: Database data survives container restarts

## Testing

The configuration has been validated with:
- `docker compose config` - Syntax validation ✓
- Service dependency chain verified ✓
- Network configuration verified ✓
- Health check endpoints defined ✓

For full functional testing, run:
```bash
./start.sh
# Wait for services to be healthy
docker compose ps
# Test frontend: curl http://localhost
# Test backend: curl http://localhost:3000/health
# Test database: docker compose exec db psql -U postgres -d bambu_manager -c 'SELECT 1;'
```
