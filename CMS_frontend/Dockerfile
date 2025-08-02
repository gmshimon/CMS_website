# ─── STAGE 1: build your React app ─────────────────────────────────────────────

FROM node:18-alpine AS build
WORKDIR /app

# ✅ Install git to support git-based dependencies
RUN apk add --no-cache git

COPY package*.json ./
RUN npm install --force

COPY . .
RUN npm run build

# ─── STAGE 2: serve with `serve` and bind to $PORT ────────────────────────────

FROM node:18-alpine
WORKDIR /app

RUN npm install -g serve
COPY --from=build /app/build ./build

# Heroku will set $PORT → e.g. 45678
# `serve -s build -l $PORT` will bind on 0.0.0.0:$PORT for you
CMD ["serve", "-s", "build", "-l", "5000"]