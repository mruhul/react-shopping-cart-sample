using System;
using System.Threading;
using System.Web.Http;
using ReactBookStore.Web.Services;

namespace ReactBookStore.Web.Api
{
    [RoutePrefix("api/v1/cart")]
    public class CartsController : ApiController
    {
        private readonly CartsService _cartsService;
        public CartsController()
        {
            _cartsService = new CartsService();
        }

        [Route]
        public IHttpActionResult Get()
        {
            return Ok(_cartsService.Get());
        }

        [Route("books/{bookId}")]
        public IHttpActionResult Post([FromUri]int bookId, [FromUri]int qty = 1)
        {
            _cartsService.AddItem(bookId, qty);

            return Created(new Uri(Url.Content("~/books/1")), 0);
        }

        [Route("books/{bookId}")]
        public IHttpActionResult Delete([FromUri]int bookId)
        {
            _cartsService.RemoveItem(bookId);

            return Ok("");
        }
    }
}