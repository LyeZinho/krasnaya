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

# 2. Kill any existing processes on dev ports
echo "🧹 Cleaning up existing processes..."
fuser -k 3000/tcp 2>/dev/null || true
fuser -k 5173/tcp 2>/dev/null || true
fuser -k 5174/tcp 2>/dev/null || true

# 3. Run all services
echo "🔥 Starting all services..."
pnpm install && pnpm --filter @krasnaya/api run db:push:force && npx concurrently \
  'pnpm --filter @krasnaya/api run dev' \
  'pnpm --filter @krasnaya/dashboard run dev' \
  'pnpm --filter @krasnaya/bot-discord run dev' \
  --names "API,Dashboard,Bot" \
  --prefix-colors "blue,green,yellow"
