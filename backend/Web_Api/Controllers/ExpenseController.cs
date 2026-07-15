using ExpenseLibrary.Model;
using ExpenseLibrary.Service;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult GetAllExpenses(int id)
        {
            List<Expense>expenses=_repo.GetExpenses(id);
            return Ok(expenses);
        }
        [HttpGet("{id}", Name = "GetExpenseRoute")]
        public IActionResult GetExpense(int id)
        {
            Expense expense = _repo.GetExpenseById(id);
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
        public IActionResult AddExpense([FromBody]Expense e)
        {
            if (_repo.AddExpense(e))
            {
                return CreatedAtRoute("GetExpenseRoute", new { id = e.ExpenseId }, e);
            }
            else
            {
                return BadRequest(); 
            }
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteExpense(int id)
        {
            if (_repo.DeleteExpense(id))
            {
                return NoContent();
            }
            return NotFound();
        }
        [HttpPut]
        public IActionResult UpdateExpense([FromBody]Expense e)
        {
            Expense e1 = _repo.GetExpenseById(e.ExpenseId);
            if (e1 == null)
            {
                return NotFound();
            }
            if (_repo.UpdateExpense(e))
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
