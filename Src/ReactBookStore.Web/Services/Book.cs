namespace ReactBookStore.Web.Services
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string PhotoUrl { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
    }
}