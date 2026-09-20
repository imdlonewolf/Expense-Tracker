namespace Web_Api.Model
{
    public class ExpenseDto
    {
        public int ExpenseId { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public string CategoryName { get; set; }
    }
}
