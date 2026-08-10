# Expense Tracker

![.NET](https://img.shields.io/badge/.NET-8-blue)
![React](https://img.shields.io/badge/Frontend-React-blueviolet)

An intuitive, lightweight, and efficient personal finance management application to help you monitor daily expenses, organize spending categories, and maintain control over your finances.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment](#environment)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Transaction management: add, edit, and delete income and expense entries.
- Category-based organization with category-wise aggregation and summaries.
- JWT-based secure authentication for users and sessions.
- Financial overviews and breakdowns (daily, weekly, monthly).
- Lightweight, fast API with a responsive React frontend.

## Tech Stack

- Backend: .NET 8, ASP.NET Core Web API, Entity Framework Core
- Frontend: React
- Database: (e.g., SQLite / SQL Server) — configurable via backend connection string
- Version Control: Git

## Screenshots

> Add screenshots or animated GIFs here to make the README more engaging. Example:

- Dashboard view showing spending breakdowns
- Transaction list and add/edit modal
- Authentication screens (login / register)

(Place images in `frontend/public/assets` or `.github/images` and reference them here.)

---

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing.

### Prerequisites

- .NET 8 SDK
- Node.js (v16+) and npm or yarn
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/imdlonewolf/Expense-Tracker.git
cd Expense-Tracker
```

2. Backend setup

```bash
cd backend
dotnet restore
# Configure your connection string and secrets (see Environment section below)
dotnet run
```

3. Frontend setup

```bash
cd frontend
npm install
npm start
```

### Environment

- Backend: set the connection string and JWT settings via `appsettings.Development.json` or environment variables. Example settings to add:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ExpenseTrackerDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  "Jwt": {
    "Key": "your-very-strong-secret-key",
    "Issuer": "ExpenseTracker",
    "Audience": "ExpenseTrackerUsers",
    "ExpiresInMinutes": 60
  }
}
```

- Frontend: set the backend API base URL in environment variables or `.env` (e.g., `REACT_APP_API_BASE_URL=http://localhost:5000`)

### Running the App

- Start the backend API (from `backend/`):

```bash
dotnet run
```

- Start the frontend (from `frontend/`):

```bash
npm start
```

Open http://localhost:3000 (or the port shown in the terminal) to view the React app.

---

## Usage

- Register a new account or log in using the secure JWT authentication.
- Use the dashboard to add income and expense transactions.
- Create and manage categories to group your transactions.
- View charts or summaries to understand spending patterns and trends.

---

## Project Structure

```
Expense-Tracker/
├── backend/              # .NET 8 ASP.NET Core Web API & EF Core
├── frontend/             # React application source code and components
├── .github/              # CI, workflows, images
└── README.md             # Project documentation
```

---

## Contributing

Contributions, bug reports, and feature requests are very welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to your branch: `git push origin feature/my-feature`
5. Open a Pull Request describing your changes

Please follow existing code style and add tests where appropriate. Ensure sensitive keys and secrets are NOT pushed to the repository.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

If you'd like, I can also:
- Add example screenshots and the sample `.env` files
- Improve sections with code snippets for API endpoints and example requests
- Add a GitHub Actions workflow for CI

