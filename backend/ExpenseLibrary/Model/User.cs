using System.ComponentModel.DataAnnotations;

namespace ExpenseLibrary.Model
{
    public class User
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
