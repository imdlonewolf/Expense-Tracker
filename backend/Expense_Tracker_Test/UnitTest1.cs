using ExpenseLibrary.Model;
using ExpenseLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using Web_Api.Controllers;

namespace Expense_Tracker_Test
{
    public class Tests
    {
        private Mock<IRepository> _mockrepo;
        private ExpenseController _controller;
        [SetUp]
        public void Setup()
        {
            _mockrepo = new Mock<IRepository>();
            _controller=new ExpenseController(_mockrepo.Object);
        }

        [Test]
        public async Task Test1()
        {
            Expense ex = new Expense
            {
                ExpenseId = 8,
                Amount = 2345.00m, // Added 'm' because currency amounts should be decimal
                Description = "agag",
                Last_Update = DateTime.Parse("2026-08-19T00:50:29.9051671"), // Parsed as DateTime
                Expense_Date = DateTime.Parse("0001-01-01T00:00:00"),
                CategoryId = 1,
                Category = null, // Changed from None to null
                UserId = 2,
                User = null      // Changed from None to null
            };
            _mockrepo.Setup(r => r.AddExpense(ex)).ReturnsAsync(true); 
            var result =  _controller.AddExpense(ex);
            Assert.That(result,Is.TypeOf<CreatedAtRouteResult>());
        }
    }
}