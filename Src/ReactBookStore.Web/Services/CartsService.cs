using System;
using System.Linq;

namespace ReactBookStore.Web.Services
{
    public class CartsService
    {
        private CacheStore _cache;
        private BooksService _booksService;

        public CartsService()
        {
            _cache = new CacheStore();
            _booksService = new BooksService();
        }

        public Cart Get()
        {
            return _cache.Get("cart", () => new Cart());
        }

        private void Save(Cart cart)
        {
            _cache.Set("cart", cart, 60);
        }

        public void RemoveItem(int bookId)
        {
            var cart = Get();

            var item = cart.Items.SingleOrDefault(x => x.Book.Id == bookId);

            if (item != null) cart.Items.Remove(item);
        }

        public void AddItem(int bookId, int qty)
        {
            var book = _booksService.GetById(bookId);

            if (book != null)
            {
                var cart = Get();

                var item = cart.Items.SingleOrDefault(x => x.Book.Id == bookId);
                if (item != null)
                {
                    item.Quantity = item.Quantity + qty;
                }
                else
                {
                    cart.Items.Add(new CartItem
                    {
                        Quantity = qty,
                        Book = _booksService.GetById(bookId)
                    });
                }

                Save(cart);
            }
        }
    }
}