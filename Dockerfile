# ──────────────────────────────────────────────
# Stage 1 — Build React/Vite application
# ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# package files alohida copy — layer cache uchun
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

COPY . .
RUN npm run build

# ──────────────────────────────────────────────
# Stage 2 — Serve with nginx on port 3000
# ──────────────────────────────────────────────
FROM nginx:1.27-alpine

# custom nginx config (port 3000 + SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# build artifacts
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
