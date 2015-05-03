using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ReactBookStore.Web.Startup))]
namespace ReactBookStore.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
