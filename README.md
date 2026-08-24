# Expense Tracker (version 01)

A simple expense tracking web app with a .NET backend (Web API + shared library) and a JavaScript frontend. It provides user authentication (JWT), CRUD for expenses and categories, and a small test project — intended for personal budgeting, demoing full‑stack patterns, and local development.

## Features
- User registration and JWT-based authentication
- Create, read, update, delete expenses
- Expense categories and simple relationships
- EF Core migrations for database schema
- Separate backend library (ExpenseLibrary) with services & repository pattern
- Basic unit test project for backend logic
- JavaScript frontend that consumes the API

## Stack
- **Language(s):** C# (backend), JavaScript/CSS/HTML (frontend)
- **Framework / runtime:** ASP.NET Core Web API (backend), Node.js frontend (simple SPA)
- **Notable libraries/patterns:**
  - Entity Framework Core (migrations & DbContext)
  - JWT authentication
  - Repository / service separation
  - Frontend: npm-based app (single-page app)

## Repository layout (top-level)
```
backend/
  ExpenseLibrary/         Models, services, JWT settings, EF migrations
    Model/                Expense.cs, Category.cs, User.cs
    Service/              AuthServices, JwtService, Repository, ServiceContext
    Migrations/           EF Core migration files (initial migration)
  Web_Api/                ASP.NET Core Web API project (Program.cs, appsettings.json)
  Expense_Tracker_Test/   Unit test project
  Expense_Tracker_API.sln Solution file
frontend/
  expense-tracker/        (frontend app files, if app files are nested here)
  package.json            npm metadata
  package-lock.json
README.md
.gitignore
```

How it fits together:
- ExpenseLibrary holds models (Expense, Category, User), persistence (ServiceContext/Repository), and auth helpers (JwtService/AuthServices). Web_Api is the API host that configures services, authentication, and exposes endpoints that the frontend calls. Migrations live with the library so the database schema comes from the shared model project. The frontend is a small npm app that calls the API.

## Quick start (shortest path to run locally)

Prerequisites
- .NET SDK (6.0+ recommended)
- Node.js (16+ recommended) and npm
- A relational database (SQL Server / SQLite / Postgres) and a connection string, or use LocalDB for development
- (Optional) dotnet-ef tool if you will apply migrations via CLI: `dotnet tool install --global dotnet-ef`

1) Clone
```bash
git clone https://github.com/imdlonewolf/Expense-Tracker.git
cd Expense-Tracker
```

2) Backend — restore, migrate, run
```bash
# restore and build
dotnet restore
dotnet build

# apply EF Core migrations (adjust project/startup-project paths if needed)
# Example:
dotnet ef database update --project backend/ExpenseLibrary --startup-project backend/Web_Api

# run the API
cd backend/Web_Api
dotnet run
```
The API will start on the local port reported in the console (e.g., https://localhost:5001 or http://localhost:5000).

3) Frontend — install and run
```bash
# from repository root
cd frontend
npm install

# if the app is inside frontend/expense-tracker:
# cd expense-tracker
npm start
```
Open the frontend in the browser (usually http://localhost:3000) and the UI should call the backend API endpoints.

4) Tests
```bash
dotnet test backend/Expense_Tracker_Test
```

## Configuration (appsettings / env)
The Web_Api reads configuration from appsettings.json/appsettings.Development.json. Provide at least:
- Connection string (example key: `ConnectionStrings:DefaultConnection`)
- JWT settings (secret, issuer, expiry). The project contains a JwtSettings class — set a strong secret.

Example appsettings fragment (add to backend/Web_Api/appsettings.Development.json):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ExpenseTrackerDb;Trusted_Connection=True;"
  },
  "JwtSettings": {
    "Secret": "a-very-strong-secret-here",
    "Issuer": "ExpenseTracker",
    "Audience": "ExpenseTrackerUsers",
    "ExpiryMinutes": 60
  }
}
```

Note: adapt the connection string to the DB you prefer. If you use SQLite or Postgres, update the DbContext options and connection string accordingly.

## API (overview)
The API exposes endpoints for authentication and expense management. Typical endpoints (naming may vary in code):
- POST /api/auth/register — register a new user
- POST /api/auth/login — obtain JWT token
- GET /api/expenses — list user expenses
- POST /api/expenses — create expense
- PUT /api/expenses/{id} — update expense
- DELETE /api/expenses/{id} — remove expense
- GET /api/categories — list categories

Authenticated requests should include:
```
Authorization: Bearer <JWT_TOKEN>
```

Example curl (login then use token):
```bash
# login
curl -X POST https://localhost:5001/api/auth/login -H "Content-Type: application/json" -d '{"email":"you@example.com","password":"Pass123!"}'

# create expense (replace <TOKEN>)
curl -X POST https://localhost:5001/api/expenses \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"amount": 12.50, "date":"2026-01-01","categoryId":1,"description":"Lunch"}'
```

## Database migrations
Migrations are present under backend/ExpenseLibrary/Migrations. To regenerate or apply:
- Use `dotnet ef migrations add <Name> --project backend/ExpenseLibrary --startup-project backend/Web_Api`
- Use `dotnet ef database update --project backend/ExpenseLibrary --startup-project backend/Web_Api`

## Development notes & conventions
- The repository uses a library + API project split so business logic can be reused or tested independently.
- Services and repository implement the main business operations; AuthServices and JwtService handle authentication and token generation.
- Tests are in backend/Expense_Tracker_Test — add unit tests for business logic in ExpenseLibrary.

## Contributing
- Open an issue for significant changes or new features.
- Prefer small, focused pull requests with a clear description and testing steps.
- Update or add migrations if you change the model and include migration files in the PR.

## Troubleshooting
- If EF commands report missing tools, install dotnet-ef: `dotnet tool install --global dotnet-ef`
- If the frontend cannot reach the API, verify CORS settings and the API URL used by the frontend (often in a config file).

## License & contact
- Add your chosen license file to the repo (LICENSE).
- For questions, open an issue or contact the repo owner.
