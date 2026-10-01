**v3 to-dos (priority order):
**
1.Logout + token persistence — decide in-memory-only vs. localStorage-with-expiry; logout must reset token, userId, hasLoadedExpenses, items.

2.Pagination on GetAllExpenses (skip/take).

3.Validation: [StringLength] on Description, [Range] on Amount, null-guard GetCategoryById.

4.Gate Swagger behind IsDevelopment() again — currently public in prod.

5.Fix the test suite — Test1 is commented out; rewrite against ExpenseDto, add 2–3 tests covering the ownership checks (good interview talking point).

6.Confirm prod JWT key differs from the one sitting in appsettings.Development.json; rotate if not.

7.Move baseUrl to Vite env vars (.env.local / .env.production) instead of comment-toggling a hardcoded string.

8.Cleanup: dead detailsexpense export in the slice; unguarded categories.find() in addExpense reducer.

9.A real aggregation/reporting feature — monthly or category-wise spending totals using EF Core GroupBy/Sum, rendered as a chart (recharts/Chart.js) on the dashboard. This also quietly fixes the resume overclaim from earlier — "aggregation" becomes true instead of aspirational.
