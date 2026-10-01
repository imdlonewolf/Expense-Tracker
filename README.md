# Expense Tracker

A full-stack expense tracking application built with ASP.NET Core Web API and a React + Vite frontend. The app supports user sign-up, login, and full CRUD workflows for expenses, with JWT-based authentication and EF Core-backed SQL Server persistence.

Live application:
- Frontend: https://expense-tracker-one-chi-42.vercel.app
- Backend API: https://expensepaglu-api.runasp.net/swagger/index.html

## Features

### Backend
- User registration and login
- JWT authentication and authorization
- Password hashing and verification using ASP.NET Core Identity
- Expense create, read, update, and delete flows
- User-specific expense retrieval
- EF Core migration-backed SQL Server / LocalDB storage
- Repository and service layer separation
- Swagger / Swashbuckle API documentation
- NUnit-based backend tests

### Frontend
- React single-page application powered by Vite
- Redux Toolkit state management
- Route-based navigation with React Router
- Login, list, detail, add, edit, and delete expense flows
- Responsive CSS styling for desktop and mobile screens

## Tech stack

### Backend
- C#
- ASP.NET Core Web API
- .NET 8
- Entity Framework Core
- SQL Server / LocalDB
- Swagger / Swashbuckle
- NUnit + Moq

### Frontend
- JavaScript / JSX
- React 19
- Vite
- Redux Toolkit
- React Router
- CSS modules and custom CSS

## Project structure

```text
.
├── backend/
│   ├── ExpenseLibrary/
│   │   ├── Model/
│   │   │   ├── Category.cs
│   │   │   ├── Expense.cs
│   │   │   └── User.cs
│   │   ├── Service/
│   │   │   ├── AuthServices.cs
│   │   │   ├── IRepository.cs
│   │   │   ├── IAuthServices.cs
│   │   │   ├── IJwtService.cs
│   │   │   ├── JwtService.cs
│   │   │   ├── Repository.cs
│   │   │   ├── ServiceContext.cs
│   │   │   └── JwtSettings.cs
│   │   ├── Migrations/
│   │   ├── ExpenseLibrary.csproj
│   │   └── ...
│   ├── Web_Api/
│   │   ├── Controllers/
│   │   │   ├── CategoryController.cs
│   │   │   ├── ExpenseController.cs
│   │   │   └── UserController.cs
│   │   ├── Program.cs
│   │   ├── appsettings.json
│   │   ├── appsettings.Development.json
│   │   └── Properties/
│   ├── Expense_Tracker_Test/
│   ├── Expense_Tracker_API.sln
│   └── ...
├── frontend/
│   ├── expense-tracker/
│   │   ├── src/
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── eslint.config.js
│   └── package.json
├── .gitignore
├── README.md
└── ...
```

## Architecture overview

- `ExpenseLibrary` contains the model layer, repository/service abstractions, and EF Core logic.
- `Web_Api` hosts the ASP.NET Core API, configures DI, JWT, CORS, and controller endpoints.
- The frontend communicates with the backend over HTTP and stores auth and expense state in Redux.
- The database schema is managed through EF Core migrations.

## Prerequisites

Install the following before running the project locally:

- .NET 8 SDK
- Node.js 18+ and npm
- SQL Server or LocalDB
- Optional: `dotnet-ef` CLI

Install EF Core tooling if needed:

```bash
dotnet tool install --global dotnet-ef
```

## Backend setup

From the repository root:

```bash
cd backend
dotnet restore Expense_Tracker_API.sln
dotnet build Expense_Tracker_API.sln
```

Edit `backend/Web_Api/appsettings.Development.json` and set your database and JWT settings:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=ExpenseTracker;Trusted_Connection=True;TrustServerCertificate=True;",
    "FrontendBaseUrl": "http://localhost:5173"
  },
  "Jwt": {
    "Key": "replace-with-a-strong-development-only-secret",
    "Issuer": "ExpenseTrackerAPI",
    "Audience": "ExpenseTrackerClient",
    "ExpireMinutes": 60
  }
}
```

Apply migrations:

```bash
cd backend
dotnet ef database update \
  --project ExpenseLibrary/ExpenseLibrary.csproj \
  --startup-project Web_Api/Web_Api.csproj
```

Run the API:

```bash
cd backend
dotnet run --project Web_Api/Web_Api.csproj
```

The API is available at:
- HTTPS: `https://localhost:7273`
- HTTP: `http://localhost:5258`
- Swagger: `https://localhost:7273/swagger`

## Frontend setup

The React app is located at `frontend/expense-tracker`.

```bash
cd frontend/expense-tracker
npm install
npm run dev
```

The app usually runs at:

```text
http://localhost:5173
```

Common scripts:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## API overview

The API uses controller/action routes without a conventional `/api` prefix.

### User routes

Controller: `UserController`

| Method | Route | Purpose | Auth |
|---|---|---|---|
| POST | `/User/Login` | Validates phone and password and returns a JWT token | No |
| POST | `/User/SignIn` | Creates a new user | No |
| PUT | `/User/AccountUpdate` | Updates the current user's record | Yes |

Example login request:

```bash
curl -X POST http://localhost:5258/User/Login \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "5551234567",
    "password": "your-password"
  }'
```

### Expense routes

Controller: `ExpenseController`

| Method | Route | Purpose | Auth |
|---|---|---|---|
| GET | `/Expense/GetAllExpenses` | Returns all expenses for the authenticated user | Yes |
| GET | `/Expense/GetExpense/{id}` | Returns a single expense by ID | Yes |
| POST | `/Expense/AddExpense` | Creates a new expense | Yes |
| PUT | `/Expense/UpdateExpense` | Updates an expense | Yes |
| DELETE | `/Expense/DeleteExpense/{id}` | Deletes an expense | Yes |

Example create expense request:

```bash
curl -X POST http://localhost:5258/Expense/AddExpense \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "amount": 12.50,
    "description": "Lunch",
    "categoryId": 2,
    "expense_Date": "2026-10-01"
  }'
```

### Category route

Controller: `CategoryController`

| Method | Route | Purpose |
|---|---|---|
| GET | `/Category` | Returns available categories |

## Data models

### User
- `UserId`
- `Name`
- `Phone`
- `Password` (stored as a hash)

### Category
- `CategoryId`
- `CategoryName`

### Expense
- `ExpenseId`
- `Amount`
- `Description`
- `Expense_Date`
- `Last_Update`
- `CategoryId`
- `UserId`

## Authentication and authorization

JWT authentication is enabled in the backend. The login flow validates the user and returns a JWT. The frontend stores that token and sends it in the `Authorization: Bearer <token>` header for protected endpoints.

Protected endpoints use `[Authorize]` and resolve the authenticated user ID from the token claims before performing operations.

## Database migrations

Migrations are stored in:

```text
backend/ExpenseLibrary/Migrations/
```

Create a migration:

```bash
cd backend
dotnet ef migrations add <MigrationName> \
  --project ExpenseLibrary/ExpenseLibrary.csproj \
  --startup-project Web_Api/Web_Api.csproj
```

Apply migrations:

```bash
cd backend
dotnet ef database update \
  --project ExpenseLibrary/ExpenseLibrary.csproj \
  --startup-project Web_Api/Web_Api.csproj
```

## CORS configuration

The backend CORS policy allows frontend requests from the configured origin in `Program.cs`.

Default production origin:
- `https://expense-tracker-one-chi-42.vercel.app`

Local development origin:
- `http://localhost:5173`

## Testing

Run the backend unit tests:

```bash
cd backend
dotnet test Expense_Tracker_Test/Expense_Tracker_Test.csproj
```

## Development notes

- The backend is structured as a library project plus an API host project.
- Business logic lives in `ExpenseLibrary`.
- HTTP endpoints are defined in `Web_Api/Controllers`.
- The frontend uses Redux state to manage auth and expense data.
- Do not commit generated build output, local DB files, or `node_modules`.

## Contributing

1. Create a feature branch before making changes.
2. Add or update tests for any backend behavior you change.
3. Update EF migrations when changing the data model.
4. Verify both backend and frontend builds before opening a PR.
5. Keep documentation aligned with actual project behavior.

## License

No license file is currently included in this repository.

## Troubleshooting

### EF Core commands fail because tooling is missing

```bash
dotnet tool install --global dotnet-ef
```

### Frontend cannot reach the API

- Confirm the backend is running
- Check the configured API base URL in the frontend Redux setup
- Confirm CORS allows the frontend origin

### Build fails because SQL Server is not available

- Use LocalDB for local development
- Or update the connection string to an available database instance

## Summary

Expense Tracker is a layered .NET + React application focused on secure, user-specific expense management with JWT authentication, database persistence, and a clean separation between API and frontend responsibilities.
