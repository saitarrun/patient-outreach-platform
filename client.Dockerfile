# Build Stage
FROM node:22-slim AS builder

WORKDIR /app

# Copy root package files
COPY package.json ./

# Copy workspace package files
COPY shared/package.json ./shared/
COPY server/package.json ./server/
COPY client/package.json ./client/

# Install dependencies
RUN npm install

# Copy source code
COPY shared ./shared/
COPY client ./client/

# Build shared package
RUN npm run build --workspace=shared

# Build client package
RUN npm run build --workspace=client

# Run Stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/client/dist /usr/share/nginx/html

# Copy nginx config (we will create this)
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
