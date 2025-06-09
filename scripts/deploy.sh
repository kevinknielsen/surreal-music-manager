#!/bin/bash

# Deploy script for Fleek
echo "🚀 Starting deployment to Fleek..."

# Set environment variables for build
export SKIP_ENV_VALIDATION=true
export NODE_ENV=production

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Run database migration if needed
echo "🗄️ Running database migrations..."
pnpm run db:migrate

# Build the application
echo "🔨 Building the application..."
pnpm run build

echo "✅ Build complete! Ready for Fleek deployment."

# The .next directory will be used by Fleek for deployment 