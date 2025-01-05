using App.API.Entity;
using Microsoft.EntityFrameworkCore;

namespace App.API.Data
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Product> Products  => Set<Product>();
    }
}
