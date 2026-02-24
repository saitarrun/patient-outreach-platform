# Patient Outreach and Appointment Reminder Platform

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![CI/CD](https://github.com/saitarrun/patient-outreach-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/saitarrun/patient-outreach-platform/actions/workflows/ci.yml)

A comprehensive platform for managing patient outreach and automated appointment reminders. This full-stack application utilizes a modern tech stack to ensure reliability, scalability, and ease of use.

## Features

- **Patient Management**: Manage patient records and contact information.
- **Appointment Reminders**: Automated reminders via various channels.
- **Analytics & Monitoring**: Real-time monitoring with Prometheus and Grafana.
- **Scalable Infrastructure**: Containerized with Docker and orchestrated with Docker Compose.

## Tech Stack

### Frontend
- **React**: UI library for building interactive interfaces.
- **Vite**: Next Generation Frontend Tooling.
- **Tailwind CSS**: Utility-first CSS framework.
- **TypeScript**: Static type definitions.

### Backend
- **Node.js & Express**: Fast, unopinionated, minimalist web framework.
- **TypeScript**: Static type definitions.
- **Prisma**: Next-generation ORM for Node.js and TypeScript.
- **BullMQ**: Message queue based on Redis.
- **Winston**: Logger for just about everything.

### Database & Infrastructure
- **PostgreSQL**: Advanced open source relational database.
- **Redis**: In-memory data structure store, used as a database, cache, and message broker.
- **Docker & Docker Compose**: Containerization and orchestration.
- **Terraform**: Infrastructure as Code (IaC).
- **Prometheus & Grafana**: Monitoring and observability.

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd patient-outreach-platform
```

### 2. Install Dependencies

Install dependencies for both client and server:

```bash
npm install
```

### 3. Environment Setup

Ensure you have the necessary environment variables set up. Check `.env.example` if available, or refer to `docker-compose.yml` for required variables.

### 4. Running the Application (Local Deployment)

We provide a specialized script to launch a complete, production-like environment locally on your own machine. This is the recommended alternative to deploying to an external cloud provider like AWS.

```bash
# Run the automated local deployment script
./deploy_local.sh
```

**What this does:**
- Builds the client and server Docker containers.
- Starts PostgreSQL and Redis infrastructure.
- Automatically handles Prisma database schema migrations.
- Starts the entire application stack including Prometheus and Grafana.

**Access the services at:**
- **Client**: http://localhost:80
- **Server**: http://localhost:3000
- **Grafana**: http://localhost:3001
- **Prometheus**: http://localhost:9090

To stop your local deployment, run:
```bash
docker-compose down
```

### 5. Development Mode

To run the client and server individually in development mode:

**Server:**
```bash
npm run dev:server
```

**Client:**
```bash
npm run dev:client
```

## Project Structure

- `client/`: React frontend application.
- `server/`: Express backend application.
- `shared/`: Shared code between client and server.
- `terraform/`: Infrastructure validation and setup.
- `docker-compose.yml`: Docker services configuration.

## License

[ISC](LICENSE)
