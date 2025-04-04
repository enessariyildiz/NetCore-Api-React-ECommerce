﻿using App.API.Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace App.API.Data
{
    public class AppDbContext(DbContextOptions options) : IdentityDbContext<AppUser, AppRole, string>(options)
    {
        public DbSet<Product> Products => Set<Product>();

        public DbSet<Cart> Carts => Set<Cart>();
        public DbSet<Order> Orders => Set<Order>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(
                new List<Product>
                {
                    new Product { Id = 1, Name="Starlink", Description="Starlink description", ImageUrl="starlink.png", IsActive=true , Price=35000, Stock=10},
                    new Product { Id = 2, Name="Starship", Description="Starship description", ImageUrl="starship.png", IsActive=true , Price=45000, Stock=20},
                    new Product { Id = 3, Name="Falcon", Description="Falcon description", ImageUrl="falcon.png", IsActive=true , Price=55000, Stock=30},
                    new Product { Id = 4, Name="Mars", Description="Mars description", ImageUrl="mars.png", IsActive=true , Price=65000, Stock=40},
                    new Product { Id = 5, Name="Venüs", Description="Venüs description", ImageUrl="venüs.png", IsActive=true , Price=75000, Stock=50}
                });
        }
    }
}
