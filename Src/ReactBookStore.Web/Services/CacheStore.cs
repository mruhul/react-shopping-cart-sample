using System;
using System.Runtime.Caching;

namespace ReactBookStore.Web.Services
{
    public class CacheStore
    {
        public T Get<T>(string key, Func<T> fetch)
        {
            var record = MemoryCache.Default[key];

            if (record != null) return (T)record;

            record = fetch.Invoke();

            if (record != null)
            {
                MemoryCache.Default[key] = record;
            }

            return (T)record;
        }

        public void Set<T>(string key, T value, int minutes)
        {
            if(value == null) return;

            MemoryCache.Default.Set(key, value, new DateTimeOffset(DateTime.Now.AddMinutes(minutes)));
        }
    }
}