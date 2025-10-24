# Bambu Manager Frontend

Frontend service for Bambu Manager.

## Technology Stack

- React 18
- Vite
- Nginx (for production)

## Features

- React-based web interface
- API proxy to backend
- Production-ready Nginx configuration
- Multi-stage Docker build

## Local Development

```bash
npm install
npm run dev
```

The development server will start on http://localhost:5173 with hot reload enabled.

## Build for Production

```bash
npm run build
```

The production build will be output to the `dist/` directory.

## Docker Build

```bash
docker build -t bambu-manager-frontend .
docker run -p 80:80 bambu-manager-frontend
```

## Configuration

### Vite Configuration

The `vite.config.js` file includes:
- React plugin
- API proxy to backend service
- Development server configuration

### Nginx Configuration

The `nginx.conf` file configures:
- Static file serving
- API proxy to backend
- Health check endpoint proxy

## Notes

This directory can be converted to a git submodule when the `bambu-manager-frontend` repository is created.
