#!/bin/bash
# Quick start script for Bambu Manager

echo "Starting Bambu Manager..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker first."
    exit 1
fi

# Build and start services
echo "Building and starting services..."
docker compose up -d --build

# Wait for services to be healthy
echo "Waiting for services to be healthy..."
sleep 5

# Check service status
echo ""
echo "Service status:"
docker compose ps

echo ""
echo "Access the application:"
echo "  Frontend: http://localhost"
echo "  Backend API: http://localhost:3000"
echo "  Database: localhost:5432"
echo ""
echo "To view logs: docker compose logs -f"
echo "To stop: docker compose down"
