using ExpenseLibrary.Model;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseLibrary.Service
{
    public class Repository : IRepository
    {
        private readonly ServiceContext _context;
        public Repository(ServiceContext context) {
            _context =context;
        }
        public bool AddExpense(Expense expense)
        {
            _context.Expenses.Add(expense);
            return _context.SaveChanges() > 0;
        }

        

        public bool DeleteExpense(int id)
        {
            Expense e=GetExpenseById(id);
            if (e == null)
            {
                return false;
            }
            _context.Remove(e);
            return _context.SaveChanges() > 0;
        }



        public Expense GetExpenseById(int id)
        {
            Expense e = _context.Expenses.Find(id);
            return e;
        }

        public List<Expense> GetExpenses(int userId)
        {
            return _context.Expenses.Where(x=>x.UserId==userId).ToList();
        }

       

        public bool UpdateExpense(Expense expense)
        {
            Expense e = GetExpenseById(expense.ExpenseId);
            if (e == null)
            {
                return false;
            }
            e.Last_Update=DateTime.Now;
            e.Description = expense.Description;
            e.Amount = expense.Amount;
            return _context.SaveChanges() > 0;
        }

        
    }
}
