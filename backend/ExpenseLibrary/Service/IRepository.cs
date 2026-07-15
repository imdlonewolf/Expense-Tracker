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
        public bool AddExpense(Expense expense);
        public bool UpdateExpense(Expense expense);
        public bool DeleteExpense(int id);
        public List<Expense> GetExpenses(int userId);
        public Expense GetExpenseById(int id);
    }
}
