using ExpenseLibrary.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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
        public async Task<bool> AddExpense(Expense expense)
        {
            expense.Expense_Date = expense.Last_Update = DateTime.UtcNow;
            await _context.Expenses.AddAsync(expense);
            return await _context.SaveChangesAsync() > 0;
        }

        

        public async Task<bool> DeleteExpense(int id)
        {
            Expense e= await GetExpenseById(id);
            if (e == null)
            {
                return  false;
            }
            _context.Remove(e);
            return await _context.SaveChangesAsync() > 0;
        }



        public async Task<Expense> GetExpenseById(int id)
        {
            Expense e = await _context.Expenses.FindAsync(id);
            return e;
        }

        public async Task<List<Expense>> GetExpenses(int userId)
        {
            return await _context.Expenses.Where(x=>x.UserId==userId).ToListAsync();
        }

       

        public async Task<bool> UpdateExpense(Expense expense)
        {
            Expense e = await GetExpenseById(expense.ExpenseId);
            if (e == null)
            {
                return false;
            }
            e.Last_Update=DateTime.Now;
            e.Description = expense.Description;
            e.Amount = expense.Amount;
            return await _context.SaveChangesAsync() > 0;
        }

        
    }
}
