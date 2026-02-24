#!/bin/bash
# Local Deployment Script for Patient Outreach Platform
# This script builds and starts the application stack locally using Docker Compose,
# acting as a replacement for AWS deployment for local usage.

set -e

echo "🚀 Starting Local Deployment for Patient Outreach Platform..."

# 1. Check for prerequisites
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Error: Docker Compose is not installed."
    exit 1
fi

# 2. Build the Docker images
echo "📦 Building Docker images..."
docker compose build

# 3. Start Database and Redis first
echo "🗄️ Starting Database and Redis..."
docker compose up -d postgres redis

# Wait for postgres to be ready
echo "⏳ Waiting for PostgreSQL to initialize..."
until docker compose exec -T postgres pg_isready -U user; do
  echo "waiting..."
  sleep 2
done
echo "✅ Database is ready!"

# 4. Push Database Schema (Migrate)
echo "🔄 Migrating Database Schema..."
# We temporarily run the server container just to push the schema
docker compose run --rm server npx prisma db push

# 5. Start all services
echo "🌐 Starting full application stack..."
docker compose up -d

echo ""
echo "🎉 Deployment Complete! Your platform is running locally."
echo "--------------------------------------------------------"
echo "🖥️  Frontend Client : http://localhost:80"
echo "⚙️  Backend Server  : http://localhost:3000"
echo "📊 Grafana Dashboards: http://localhost:3001 (Default login: admin/admin)"
echo "📈 Prometheus        : http://localhost:9090"
echo "--------------------------------------------------------"
echo "To stop the servers, run: docker compose down"
echo "To view live logs, run: docker compose logs -f"
echo ""
