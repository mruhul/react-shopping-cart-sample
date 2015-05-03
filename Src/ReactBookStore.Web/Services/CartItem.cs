using System;

namespace ReactBookStore.Web.Services
{
    public class CartItem
    {
        public CartItem()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public Book Book { get; set; }
        public int Quantity { get; set; }

        public decimal Subtotal
        {
            get { return Book.Price*Quantity; }
        }
    }
}