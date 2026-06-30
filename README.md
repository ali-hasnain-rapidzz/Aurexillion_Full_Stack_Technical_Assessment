# Support Ticket Dashboard

A full-stack support ticket management application built for the Aurexillion technical assessment. Users can view, create, filter, and update customer support tickets with persistent MongoDB storage.

## Project Overview

This application provides a complete support ticket dashboard with:

- **Ticket List** — View all tickets in a responsive table (desktop) or card layout (mobile)
- **Ticket Details** — View full ticket information and update status
- **Create Ticket** — Submit new tickets with validated forms
- **Kanban Board** — Drag-and-drop status updates across Open, In Progress, and Resolved columns
- **Filtering & Search** — Filter by status and priority, search by title, and sort results

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite
- React Router
- TanStack React Query
- Axios
- React Hook Form + Zod
- Tailwind CSS
- @dnd-kit (Kanban board)

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- Zod validation

### Testing
- Vitest
- React Testing Library
- Supertest
- MongoDB Memory Server (backend tests)

## Folder Structure

```
project-root/
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── api/              # Axios client & API services
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Route-level page components
│   │   ├── schemas/          # Zod form schemas
│   │   ├── types/            # TypeScript interfaces
│   │   ├── utils/            # Utility functions
│   │   └── test/             # Frontend tests
│   └── package.json
├── backend/                  # Express API
│   ├── src/
│   │   ├── config/           # Environment & database config
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/       # Error handling, validation, async wrapper
│   │   ├── models/           # Mongoose schemas
│   │   ├── repositories/     # Data access layer
│   │   ├── routes/           # Express routes
│   │   ├── services/         # Business logic
│   │   ├── types/            # TypeScript types
│   │   ├── validators/       # Zod request schemas
│   │   ├── app.ts            # Express app factory
│   │   └── server.ts         # Server entry point
│   ├── scripts/              # Seed script
│   ├── tests/                # Backend API tests
│   └── package.json
├── README.md
├── .gitignore
└── .env.example
```

## Architecture

The backend follows a layered architecture:

```
Routes → Controllers → Services → Repositories → MongoDB
```

- **Routes** define HTTP endpoints and attach validation middleware
- **Controllers** handle request/response formatting
- **Services** contain business logic and error handling
- **Repositories** abstract database operations
- **Middleware** provides centralized error handling, async wrappers, and Zod validation

The frontend uses a feature-based structure with:

- **API layer** — Centralized Axios client with error interceptors
- **React Query** — Server state management with caching and invalidation
- **Custom hooks** — Encapsulate data fetching and mutations
- **Context** — Toast notifications for user feedback

## Installation

### Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

### Clone and Setup

```bash
git clone <repository-url>
cd Aurexillion
cp .env.example .env
```

## Backend Setup

```bash
cd backend
npm install
npm run seed    # Seed sample tickets
npm run dev     # Start dev server on port 5000
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev     # Start dev server on port 5173
```

The frontend proxies `/api` requests to `http://localhost:5000` during development.

## MongoDB Setup

1. Install and start MongoDB locally, or use Docker:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

2. The default connection string is:

```
mongodb://localhost:27017/support_ticket_dashboard
```

3. Copy `.env.example` to `.env` at the project root and adjust if needed.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/support_ticket_dashboard` |

## Seed Database

```bash
cd backend
npm run seed
```

This clears existing tickets and inserts 8 sample tickets for testing.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tickets` | List all tickets (supports `status`, `priority`, `search`, `sortBy`, `sortOrder` query params) |
| `GET` | `/api/tickets/:id` | Get a single ticket by ID |
| `POST` | `/api/tickets` | Create a new ticket (status defaults to `OPEN`) |
| `PATCH` | `/api/tickets/:id` | Update a ticket (partial updates supported) |
| `GET` | `/health` | Health check endpoint |

### Example Request

```bash
# Create a ticket
curl -X POST http://localhost:5000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test ticket",
    "description": "Description here",
    "customerName": "Jane Doe",
    "customerEmail": "jane@example.com",
    "priority": "HIGH"
  }'

# Update status
curl -X PATCH http://localhost:5000/api/tickets/<id> \
  -H "Content-Type: application/json" \
  -d '{"status": "IN_PROGRESS"}'
```

## Running Tests

### Backend Tests

```bash
cd backend
npm test
```

Tests cover:
- Rejecting invalid ticket creation (missing title)
- Successfully creating a valid ticket
- Successfully updating ticket status

### Frontend Tests

```bash
cd frontend
npm test
```

Tests cover:
- Ticket form validation (required fields and email format)
- Ticket list rendering with API data

## Design Decisions

1. **Layered backend architecture** — Separates concerns into routes, controllers, services, and repositories for maintainability and testability.

2. **Dual validation** — Mongoose schema validation at the database level plus Zod validation at the API boundary for defense in depth.

3. **React Query for server state** — Handles caching, background refetching, and optimistic updates without manual state management.

4. **Responsive dual layout** — Table view on desktop, card view on mobile for optimal UX across screen sizes.

5. **Vite proxy** — Simplifies local development by proxying API requests, avoiding CORS configuration during dev.

6. **In-memory MongoDB for tests** — Backend tests use `mongodb-memory-server` for isolated, fast test runs without requiring a running MongoDB instance.

## Trade-offs

1. **No authentication** — Out of scope for the assessment; all endpoints are public. Production would require JWT or session-based auth.

2. **Client-side filtering for Kanban** — The Kanban board loads all tickets; for large datasets, server-side pagination would be needed.

3. **No optimistic updates** — Status changes wait for server confirmation before UI updates, ensuring data consistency at the cost of slight latency.

4. **Single `.env` at root** — Backend reads from project root `.env` for simplicity; a production setup might use separate env files per service.

## Future Improvements

- User authentication and role-based access control
- Pagination for large ticket volumes
- Real-time updates via WebSockets
- Swagger/OpenAPI documentation
- Docker Compose for one-command local setup
- Email notifications on ticket status changes
- Ticket assignment to support agents
- Activity log / audit trail for status changes
- Accessibility audit and ARIA improvements
- E2E tests with Playwright
