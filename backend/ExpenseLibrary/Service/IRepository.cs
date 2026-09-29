using ExpenseLibrary.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseLibrary.Service
{
    public interface IRepository
    {
        public Task<bool> AddExpense(Expense expense);
        public Task<bool> UpdateExpense(Expense expense);
        public Task<bool> DeleteExpense(int id);
        public Task<List<Expense>> GetExpenses(int userId);
        public Task<Expense> GetExpenseById(int id);
    }
}
