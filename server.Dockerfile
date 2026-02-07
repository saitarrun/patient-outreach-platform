FROM node:22-slim

WORKDIR /app

# Copy root package files
COPY package.json ./

# Copy workspace package files
COPY shared/package.json ./shared/
COPY server/package.json ./server/
COPY client/package.json ./client/

# Install dependencies
RUN apt-get update -y && apt-get install -y openssl
RUN npm install

# Copy source code
COPY shared ./shared/
COPY server ./server/

# Generate Prisma Client
RUN cd server && npx prisma generate

# Build shared package first
RUN npm run build --workspace=shared

# Build server package
RUN npm run build --workspace=server

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "run", "start", "--workspace=server"]
