using System;
using System.Collections.Generic;
using System.Linq;

namespace ReactBookStore.Web.Services
{
    public class Cart
    {
        public Cart()
            : this(Guid.NewGuid())
        {
        }

        public Cart(Guid id)
        {
            Id = id;
            Items = new List<CartItem>();
        }

        public Guid Id { get; set; }

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