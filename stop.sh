#!/bin/bash
# Stop all Bambu Manager services

echo "Stopping Bambu Manager services..."
docker compose down

echo ""
echo "All services stopped."
echo "To remove all data: docker compose down -v"
