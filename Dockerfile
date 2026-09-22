# ── Build stage ──────────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# Build the static site
COPY . .
RUN npm run build

# ── Serve stage ──────────────────────────────────────────────────
FROM nginx:alpine

# SPA routing + caching + compression
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
