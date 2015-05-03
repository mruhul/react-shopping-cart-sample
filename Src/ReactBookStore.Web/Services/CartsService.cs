using System;
using System.Linq;
using System.Web;

namespace ReactBookStore.Web.Services
{
    public class CartsService
    {
        private readonly CacheStore _cache;
        private readonly BooksService _booksService;

        private string GetCacheKey()
        {
            return string.Format("CartsService.Cart.{0}", HttpContext.Current.Request.AnonymousID);
        }

        public CartsService()
        {
            _cache = new CacheStore();
            _booksService = new BooksService();
        }

        public Cart Get()
        {
            return _cache.Get(GetCacheKey(), () => new Cart());
        }

        private void Save(Cart cart)
        {
            _cache.Set(GetCacheKey(), cart, 60);
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