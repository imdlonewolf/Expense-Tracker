using ExpenseLibrary.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using Web_Api.Model;

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

        

        public async Task<bool> DeleteExpense(int id,int userId)
        {
            Expense e= await GetExpenseById(id);

             if ((e!=null) &&( e.UserId == userId))
            {
                _context.Remove(e);
                return await _context.SaveChangesAsync() > 0;
            }
            return false;
        }

        public async Task<List<Category>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Expense> GetExpenseById(int id)
        {
            Expense e = await _context.Expenses.FindAsync(id);
            return e;
        }


        public async Task<List<ExpenseDto>> GetExpenses(int userId)
        {
            return await (
                from e in _context.Expenses
                join c in _context.Categories
                    on e.CategoryId equals c.CategoryId
                where e.UserId == userId
                select new ExpenseDto
                {
                    ExpenseId = e.ExpenseId,
                    Amount = e.Amount,
                    Description = e.Description,
                    CategoryId=e.CategoryId,
                    CategoryName = c.CategoryName
                }
            ).ToListAsync();
        }



        public async Task<bool> UpdateExpense(Expense expense)
        {
            Expense e = await GetExpenseById(expense.ExpenseId);
            if (e == null || e.UserId!=expense.UserId)
            {
                return false;
            }
            e.Last_Update=DateTime.Now;
            e.Description = expense.Description;
            e.Amount = expense.Amount;
            e.CategoryId = expense.CategoryId;
            return await _context.SaveChangesAsync() > 0;
        }

        
    }
}
