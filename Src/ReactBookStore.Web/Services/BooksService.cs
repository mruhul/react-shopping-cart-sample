using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace ReactBookStore.Web.Services
{
    public class BooksService
    {
        private readonly List<Book> _defaultBooks = new List<Book>
        {
            new Book{ Category = "Children", Id = 10000, PhotoUrl = "http://rcdn-1.fishpond.com.au/0051/009/757/113760241/original.jpeg", Title = "Sophia's First Visit To The Dentist", Price = 23.45m},
            new Book{ Category = "Children", Id = 10001, PhotoUrl = "http://rcdn-1.fishpond.com.au/0033/365/954/47719770/original.jpeg", Title = "Touch & Trace Letters Book", Price = 23.99m},
            new Book{ Category = "Children", Id = 10002, PhotoUrl = "http://rcdn-3.fishpond.com.au/0033/365/985/47724072/original.jpeg", Title = "Jake and the Never Land Pirates Look", Price = 19.80m},
            //new Book{ Category = "Children", Id = 10003, PhotoUrl = "http://rcdn-1.fishpond.com.au/0051/009/724/113760240/original.jpeg", Title = "Mason's First Day At Daycare", Price = 9.58m},
            

            new Book{ Category = "Food", Id = 20000, PhotoUrl = "http://rcdn-4.fishpond.com.au/0029/794/595/82348960/original.jpeg", Title = "The Fast Diet Recipe Book", Price = 24.53m},
            new Book{ Category = "Food", Id = 20001, PhotoUrl = "http://rcdn-1.fishpond.com.au/0043/849/328/83289809/original.jpeg", Title = "My Petite Kitchen Cookbook", Price = 28.16m}
        };

        public BooksService()
        {
               
        }

        public IEnumerable<string> GetCategories()
        {
            return _defaultBooks.Select(x => x.Category).Distinct();
        } 

        public IEnumerable<Book> GetByCategory(string category)
        {
            return _defaultBooks.Where(x => string.Equals(x.Category, category, StringComparison.OrdinalIgnoreCase));
        }

        public Book GetById(int bookId)
        {
            return _defaultBooks.SingleOrDefault(x => x.Id == bookId);

        }
    }
}