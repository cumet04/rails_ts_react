FROM node:12.19.0

# This image (container) is for dev-server and build. Not production

RUN mkdir -p /app/frontend
RUN mkdir -p /app/backend/public/assets
WORKDIR /app/frontend

COPY ./package.json ./package-lock.json ./
RUN npm ci

COPY . .
