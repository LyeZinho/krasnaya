#!/bin/bash

echo "🚀 Starting Krasnaya Low-Code Discord Engine locally..."

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null
then
    echo "❌ docker-compose is not installed. Please install Docker Compose first."
    exit 1
fi

# 1. Start Postgres and Redis in detached mode
echo "📦 Starting Postgres and Redis..."
docker-compose up -d postgres redis

echo "⏳ Waiting for databases to be ready (5s)..."
sleep 5

# 2. Start Backend and Frontend concurrently
echo "🔥 Starting Backend and Frontend..."
npx concurrently \
  "cd backend && npm run start:dev" \
  "cd frontend && npm run dev" \
  --names "NestJS,SvelteKit" \
  --prefix-colors "blue,red"
