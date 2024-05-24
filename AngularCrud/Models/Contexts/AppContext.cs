using Microsoft.EntityFrameworkCore;

namespace AngularCrud.Models.Contexts
{
    public class AppContext : DbContext
    {
        public AppContext() { }
        public AppContext(DbContextOptions<AppContext> options) : base(options) { }

    }
}
