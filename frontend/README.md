# Bambu Manager Frontend

Frontend service for Bambu Manager.

## Technology Stack

- Nuxt 4 (Vue 3)
- Node.js 22

## Features

- Vue 3 web interface
- Server-side rendering with Nuxt
- API integration with backend
- Production-ready Node.js server

## Local Development

```bash
npm install
npm run dev
```

The development server will start on http://localhost:3000 with hot reload enabled.

## Build for Production

```bash
npm run build
```

The production build will be output to the `.output/` directory.

## Docker Build

```bash
docker build -t bambu-manager-frontend .
docker run -p 3001:3000 -e API_BASE=http://backend:3000 bambu-manager-frontend
```

## Configuration

### Nuxt Configuration

The `nuxt.config.ts` file includes:
- Nuxt 4 configuration
- Server-side rendering setup
- Runtime configuration for API base URL
- Development server configuration

### Environment Variables

- `API_BASE`: Backend API URL (default: http://backend:3000)

## Notes

This directory can be converted to a git submodule when the `bambu-manager-frontend` repository is created.
