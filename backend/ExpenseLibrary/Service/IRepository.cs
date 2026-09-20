using ExpenseLibrary.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web_Api.Model;

namespace ExpenseLibrary.Service
{
    public interface IRepository
    {
        public Task<bool> AddExpense(Expense expense);
        public Task<bool> UpdateExpense(Expense expense);
        public Task<bool> DeleteExpense(int id,int userId);
        public Task<List<ExpenseDto>> GetExpenses(int userId);
        public Task<Expense> GetExpenseById(int id);
        public Task<List<Category>> GetCategories();
    }
}
