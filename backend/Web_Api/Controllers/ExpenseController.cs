using ExpenseLibrary.Model;
using ExpenseLibrary.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

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
            List<Expense>expenses=await _repo.GetExpenses(id);
            //Console.WriteLine(ClaimTypes.NameIdentifier);
            return Ok(expenses);
        }
        [Authorize]
        [HttpGet("{id}", Name = "GetExpenseRoute")]
        public async Task<IActionResult> GetExpense(int id)
        {
            Expense expense = await _repo.GetExpenseById(id);
            if (expense == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(expense);
            }
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddExpense([FromBody]Expense e)
        {
            int id = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            e.UserId = id;
            if (await _repo.AddExpense(e))
            {
                return CreatedAtRoute("GetExpenseRoute", new { id = e.ExpenseId }, e);
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
        public async Task<IActionResult> UpdateExpense([FromBody]Expense e)
        {
            int id = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            e.UserId = id;
            Expense e1 = await _repo.GetExpenseById(e.ExpenseId);
            if (e1 == null || e1.UserId!=id)
            {
                return NotFound();
            }
            if (await _repo.UpdateExpense(e))
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
