using ExpenseLibrary.Model;
using ExpenseLibrary.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using Web_Api.Model;

namespace Web_Api.Controllers
{
    [ApiController]
    [Route("/[controller]/[action]")]
    public class ExpenseController : ControllerBase
    {
        private readonly IRepository _repo;
        public ExpenseController(IRepository repo)
        {
            _repo = repo;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllExpenses()
        {
            //var authHeader = Request.Headers["Authorization"].ToString();
            //Console.WriteLine(authHeader);
            int id= Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            List<ExpenseDto>expenses=await _repo.GetExpenses(id);
            //Console.WriteLine(ClaimTypes.NameIdentifier);
            return Ok(expenses);
        }
        [Authorize]
        [HttpGet("{id}", Name = "GetExpenseRoute")]
        public async Task<IActionResult> GetExpense(int id)
        {
            int userid = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            Expense expense = await _repo.GetExpenseById(id);
            if (expense == null || userid!=expense.UserId)
            {
                return NotFound();
            }
            else
            {
                ExpenseDto ex = new ExpenseDto();
                ex.UserId = expense.UserId;
                ex.ExpenseId = expense.ExpenseId;
                ex.CategoryId = expense.CategoryId;
                ex.CategoryName = await _repo.GetCategoryById(expense.CategoryId);
                ex.Description = expense.Description;
                ex.Amount= expense.Amount;
                ex.Last_Update = expense.Last_Update;
                return Ok(ex);
            }
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddExpense([FromBody]ExpenseDto expense)
        {
            int id = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            expense.UserId = id;
            Expense ex = new Expense();
            ex.UserId = expense.UserId;
            ex.CategoryId = expense.CategoryId;
            ex.Description = expense.Description;
            ex.Last_Update = DateTime.UtcNow;
            ex.Amount = expense.Amount;
            ex.Expense_Date = expense.Expense_Date;
            if (await _repo.AddExpense(ex))
            {
                expense.ExpenseId = ex.ExpenseId;
                return CreatedAtRoute("GetExpenseRoute", new { id = ex.ExpenseId }, expense);
            }
            else
            {
                return BadRequest(); 
            }
        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            int userId = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            if (await _repo.DeleteExpense(id,userId))
            {
                return NoContent();
            }
            return NotFound();
        }
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateExpense([FromBody]ExpenseDto e)
        {
            int id = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            e.UserId = id;
            Expense e1 = await _repo.GetExpenseById(e.ExpenseId);
            if (e1 == null || e1.UserId!=id)
            {
                return NotFound();
            }
            e1.Amount = e.Amount;
            e1.CategoryId = e.CategoryId;
            e1.Description = e.Description;
            e1.Last_Update = DateTime.UtcNow;
            if (await _repo.UpdateExpense(e1))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
