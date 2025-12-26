# Cofrinho API

Personal finance REST API for managing accounts and tracking transactions.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** PostgreSQL
- **Query Builder:** Knex
- **Auth:** JWT + bcrypt

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL 15+

### Installation

```bash
# Clone the repository
git clone https://github.com/ygor-amorim/cofrinho-API
cd cofrinho-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and JWT secret

# Run migrations
npx knex migrate:latest

# Start the server
node src/server.js
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/signin` | Login and get JWT token |

### Accounts (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/accounts` | List all user accounts |
| POST | `/accounts` | Create a new account |
| PUT | `/accounts/:id` | Update an account |
| DELETE | `/accounts/:id` | Delete an account |

### Transactions (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/transactions/account/:accId` | List transactions for an account |
| POST | `/transactions` | Create a new transaction |
| PUT | `/transactions/:accId/:id` | Update a transaction |
| DELETE | `/transactions/:accId/:id` | Delete a transaction |

## Database Schema

```
users
├── id (PK)
├── name
├── email (unique)
├── password (hashed)
└── timestamps

accounts
├── id (PK)
├── name
├── user_id (FK → users)
└── timestamps

transactions
├── id (PK)
├── description
├── type (I = Income, O = Outcome)
├── amount
├── date
├── status
├── acc_id (FK → accounts)
└── timestamps
```

## Project Structure

```
src/
├── config/        # Database configuration
├── middlewares/   # Auth and error handling
├── migrations/    # Database schema versions
├── routes/        # HTTP endpoint handlers
├── services/      # Business logic
├── app.js         # Express app setup
└── server.js      # Server entry point
```

## Acknowledgments

Inspired by a Node.js REST API course (rebuilt from scratch with security improvements)

## License

ISC
