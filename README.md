# Expense Tracker

A full-stack expense tracking application built with an ASP.NET Core Web API backend and a React + Vite frontend. The app supports user sign-up, login, and CRUD operations for expenses. It is designed as a simple personal finance dashboard with a backend library, EF Core persistence, and a lightweight frontend for interacting with the API.

## Features

### Backend
- User registration and login
- Password hashing and verification using ASP.NET Core Identity
- Expense create, read, update, and delete flows
- User-specific expense retrieval
- EF Core migration-backed SQL Server storage
- Repository/service layer separation
- Swagger support for API exploration
- NUnit-based backend tests

### Frontend
- React single-page UI
- Vite app setup for local development
- Redux-based state management
- Expense list and detail pages
- Add, edit, and delete expense interactions
- Login flow using user phone/password validation
- Responsive styling for desktop and mobile screens

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
- CSS modules / custom CSS

## Repository structure

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
│   │   └── ...
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

## How the app fits together

- `ExpenseLibrary` contains the data model and business logic: `User`, `Expense`, and `Category` entities, repository/service abstractions, and EF Core access.
- `Web_Api` hosts the ASP.NET Core application, configures dependency injection, configures CORS, exposes controllers, and provides the API layer.
- The frontend communicates with the backend through HTTP requests to controller endpoints and stores selected data in Redux.
- The database is created through EF Core migrations and is currently configured for SQL Server.

## Prerequisites

Install the following before running the project locally:

- .NET 8 SDK
- Node.js and npm
- SQL Server or LocalDB
- Optional: `dotnet-ef` CLI

Install the EF Core CLI if needed:

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

Set your connection string in `backend/Web_Api/appsettings.Development.json`.

Example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=ExpenseTracker;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "replace-with-a-strong-development-only-secret",
    "Issuer": "ExpenseTrackerAPI",
    "Audience": "ExpenseTrackerClient",
    "ExpireMinutes": 60
  }
}
```

Apply the existing migration:

```bash
dotnet ef database update \
  --project ExpenseLibrary/ExpenseLibrary.csproj \
  --startup-project Web_Api/Web_Api.csproj
```

Run the API:

```bash
dotnet run --project Web_Api/Web_Api.csproj
```

The API serves Swagger at:

- `https://localhost:7273/swagger`
- `http://localhost:5258/swagger`

## Frontend setup

The React app is located at `frontend/expense-tracker`.

```bash
cd frontend/expense-tracker
npm install
npm run dev
```

The Vite app usually runs at:

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

The current backend routes use controller/action naming rather than a conventional `/api/...` prefix.

### User routes

Controller: `UserController`

| Method | Route | Purpose |
|---|---|---|
| POST | `/User/Login` | Validates `phone` and `password` |
| POST | `/User/SignIn` | Creates a new user |
| PUT | `/User/AccountUpdate` | Updates a user record |

Example login request:

```bash
curl -X POST http://localhost:5258/User/Login \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "5551234567",
    "password": "your-password"
  }'
```

Current behavior: `Login` returns the authenticated user ID (`UserId`) instead of a JWT token.

### Expense routes

Controller: `ExpenseController`

| Method | Route | Purpose |
|---|---|---|
| GET | `/Expense/GetAllExpenses/{userId}` | Return all expenses for a user |
| GET | `/Expense/GetExpense/{id}` | Get a single expense |
| POST | `/Expense/AddExpense` | Add a new expense |
| PUT | `/Expense/UpdateExpense` | Update an expense |
| DELETE | `/Expense/DeleteExpense/{id}` | Delete an expense |

Example create expense request:

```bash
curl -X POST http://localhost:5258/Expense/AddExpense \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 12.50,
    "description": "Lunch",
    "categoryId": 1,
    "userId": 2
  }'
```

### Category route

Controller: `CategoryController`

| Method | Route | Current behavior |
|---|---|---|
| GET | `/Category` | Returns `200 OK` without category data |

The category entity exists in the model and is linked to expenses via `CategoryId`, but category retrieval is still minimal in the current implementation.

## Data model

### User
- `UserId`
- `Name`
- `Phone`
- `Password`

Passwords are hashed before they are stored by `AuthServices.AddUser`.

### Category
- `CategoryId`
- `CategoryName`

### Expense
- `ExpenseId`
- `Amount`
- `Description`
- `Last_Update`
- `Expense_Date`
- `CategoryId`
- `UserId`

The EF migration creates the corresponding database tables and relationship keys for `Users`, `Categories`, and `Expenses`.

## Authentication status

The repository includes JWT-related code such as `JwtService`, `JwtSettings`, and JWT service interfaces, but the application is not currently fully wired up for JWT authentication.

The startup code in `backend/Web_Api/Program.cs` currently has JWT registration and middleware commented out, and `UserController` returns a `UserId` instead of a JWT.

This means:
- authentication is currently based on checking a user by phone/password
- the app uses the resulting user ID in the frontend Redux state
- bearer-token authorization is not yet enabled end-to-end

## Database migrations

Migrations are stored in:

```text
backend/ExpenseLibrary/Migrations/
```

Create a migration:

```bash
dotnet ef migrations add <MigrationName> \
  --project backend/ExpenseLibrary/ExpenseLibrary.csproj \
  --startup-project backend/Web_Api/Web_Api.csproj
```

Apply migrations:

```bash
dotnet ef database update \
  --project backend/ExpenseLibrary/ExpenseLibrary.csproj \
  --startup-project backend/Web_Api/Web_Api.csproj
```

## Runtime and CORS notes

The backend CORS configuration currently allows:

```text
https://expense-tracker-one-chi-42.vercel.app
```

Local development may require adding:

```text
http://localhost:5173
```

This is configured in `backend/Web_Api/Program.cs`.

## Testing

Run the backend tests with:

```bash
dotnet test backend/Expense_Tracker_Test/Expense_Tracker_Test.csproj
```

The project includes NUnit-based tests and project references for the backend logic.

## Development notes

- The backend is separated into a library project and API host project.
- Business logic is stored in `ExpenseLibrary`.
- HTTP endpoints are defined in `Web_Api/Controllers`.
- The frontend uses Redux store state for the current user and expenses.
- The default frontend API base URL is configured in `frontend/expense-tracker/src/components/redux/expenseSlicer.jsx`.
- Do not commit generated build output, local database files, or `node_modules`.

## Contributing

1. Create a focused branch for your feature or fix.
2. Update or add tests for backend behavior that you change.
3. Update EF migrations when changing the data model.
4. Verify both backend and frontend builds before opening a PR.
5. Keep the documentation in sync with actual API behavior.

## License

No license file is currently included in the repository.

## Troubleshooting

### EF Core commands fail because the tools are missing

```bash
dotnet tool install --global dotnet-ef
```

### Frontend cannot reach the API

- Check the base URL in the Redux slice
- Confirm backend CORS settings
- Ensure the API is running locally and the port matches the frontend config

### Build fails because of missing SQL Server instance

- Use LocalDB for development
- Or update the connection string to another supported database instance

---

This project is a useful example of a layered .NET + React application with CRUD functionality, EF Core persistence, and a basic Redux-powered frontend.
