using ExpenseLibrary.Model;
using ExpenseLibrary.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web_Api.Controllers
{
    [ApiController]
    [Route("/[controller]/[action]")]
    public class CategoryController : Controller
    {
        private readonly IRepository _repo;
        public CategoryController(IRepository repo) { 
            _repo=repo;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            List<Category>categories=await _repo.GetCategories();
            return Ok(categories);
        }
    }
}
