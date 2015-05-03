using System.Collections.Generic;
using System.Linq;

namespace ReactBookStore.Web.Services
{
    public class Cart
    {
        public Cart()
        {
            Items = new List<CartItem>();
        }

        public List<CartItem> Items { get; set; }

        public decimal Total
        {
            get { return Items.Sum(x => x.Subtotal); }
        }

        public bool IsEmpty
        {
            get { return Items.Count == 0; }
        }
    }
}