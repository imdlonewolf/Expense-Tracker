using ExpenseLibrary.Model;
using ExpenseLibrary.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Web_Api.Controllers
{
    [ApiController]
    [Route("/[controller]/[action]")]
    public class UserController : Controller
    {
        private readonly IAuthServices _repo;
        private readonly IJwtService _jwt;
        public UserController(IAuthServices repo /*,IJwtService jwt*/)
        {
            _repo = repo;
            //_jwt = jwt;
        }
        [HttpGet]
        public IActionResult Login([FromBody]User user)
        {
            User u = _repo.Login(user.Phone, user.Password);
            if(u!=null)
            {
                //var token=_jwt.GenerateToken(u);
                return Ok("Welcome to Expense Tracker");
            }
            return BadRequest();
        }
        [HttpPost]
        public IActionResult SignIn([FromBody] User u)
        {
            if (_repo.AddUser(u))
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPut]
        public IActionResult AccountUpdate([FromBody] User u)
        {
            if (_repo.UpdateUser(u))
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
