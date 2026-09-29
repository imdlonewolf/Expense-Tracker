using ExpenseLibrary.Model;
using ExpenseLibrary.Service;
using Microsoft.AspNetCore.Mvc;
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
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllExpenses(int id)
        {
            List<Expense>expenses=await _repo.GetExpenses(id);
            return Ok(expenses);
        }
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
        [HttpPost]
        public async Task<IActionResult> AddExpense([FromBody]Expense e)
        {
            if (await _repo.AddExpense(e))
            {
                return CreatedAtRoute("GetExpenseRoute", new { id = e.ExpenseId }, e);
            }
            else
            {
                return BadRequest(); 
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            if (await _repo.DeleteExpense(id))
            {
                return NoContent();
            }
            return NotFound();
        }
        [HttpPut]
        public async Task<IActionResult> UpdateExpense([FromBody]Expense e)
        {
            Expense e1 = await _repo.GetExpenseById(e.ExpenseId);
            if (e1 == null)
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
