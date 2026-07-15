using ExpenseLibrary.Service;
using Microsoft.AspNetCore.Mvc;

namespace Web_Api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class CategoryController : Controller
    {
        private readonly IRepository _repo;
        public CategoryController(IRepository repo) { 
            _repo=repo;
        }
        [HttpGet]
        public IActionResult Index()
        {
            return Ok();
        }
    }
}
