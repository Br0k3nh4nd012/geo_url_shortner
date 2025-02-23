# Geo URL Shortener

This project consists of three main services:
- React Frontend
- Rails API Server
- PostgreSQL Database

## Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine
- Git (for cloning the repository)
- Port availability: 8080, 3010, and 6010

## Services Architecture

| Service    | Internal Port | Exposed Port |
|------------|---------------|--------------|
| Frontend   | 5173         | 8080         |
| API Server | 3000         | 3010         |
| PostgreSQL | 5432         | 6010         |

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd geo
```

2. Build and start the services:
```bash
docker compose up --build
```
3. Access the services:
- Frontend: `http://localhost:8080`
- API Server: `http://localhost:3010`

## Development

### Frontend Development
The React frontend code is mounted as a volume in `/url-shortner`. Any changes made to the frontend code will automatically reflect in the running application.

#### Libraries and Versions

The following libraries are used in this project:

- React: `^19.0.0`
- Vite: `^6.1.0`
- Axios: `^1.7.9`
- Tailwindcss: `^4.0.7`

### Backend Development
The Rails API server code is mounted in `/geo_url_shortner_server`.

#### Gems and Versions

The following libraries are used in this project:
- Rails: `~> 8.0.1`
- Ruby: `3.3.6`

### Database
PostgreSQL data is persisted using a named volume `postgres-data`.

## Stopping the Services

To stop all services:
```bash
docker compose down
```

To stop and remove volumes:
```bash
docker compose down -v
```
