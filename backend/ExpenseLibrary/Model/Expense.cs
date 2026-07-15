using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseLibrary.Model
{
    public class Expense
    {
        public int ExpenseId { get; set; }
        [Precision(18, 2)]
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime Last_Update { get; set; }
        public DateTime Expense_Date {  get; set; }
        public int CategoryId { get; set; }
        [ForeignKey(nameof(CategoryId))]
        public Category ? Category { get; set; }
        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User ? User { get; set; }
    }
}
