using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ReactBookStore.Web.Services;

namespace ReactBookStore.Web.Api
{
    [RoutePrefix("api/v1")]
    public class BooksController : ApiController
    {
        private BooksService _service;

        public BooksController()
        {
            _service = new BooksService();    
        }

        [Route("categories")]
        [HttpGet]
        public IHttpActionResult Categories()
        {
            return Ok(_service.GetCategories());
        }

        [Route("books/{category}")]
        public IHttpActionResult Get(string category = "")
        {
            if (string.IsNullOrEmpty(category)) category = "Children";

            return Ok(_service.GetByCategory(category));
        }
    }
}
