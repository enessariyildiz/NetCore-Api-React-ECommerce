using App.API.Entity;
using Microsoft.AspNetCore.Identity;

namespace App.API.Data
{
    public class SeedData
    {
        public static async void Initialize(IApplicationBuilder app)
        {
            var userManager = app.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<UserManager<AppUser>>();

            var roleManager = app.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<RoleManager<AppRole>>();

            if (!roleManager.Roles.Any())
            {
                var customer = new AppRole { Name = "Customer" };
                var admin  = new AppRole { Name = "admin" };

                await roleManager.CreateAsync(customer);
                await roleManager.CreateAsync(admin);
            }

            if (!userManager.Users.Any())
            {
                var admin = new AppUser { Name = "Jhon Does", UserName = "JhonDoes", Email = "jhondoes@gmail.com" };
                var customer = new AppUser { Name = "Jhon Doe", UserName = "JhonDoe", Email = "jhondoe@gmail.com" };

                await userManager.CreateAsync(admin, "Admin_1234");
                await userManager.AddToRoleAsync(admin, "Admin");

                await userManager.CreateAsync(customer, "Customer_1234");
                await userManager.AddToRoleAsync(customer, "Customer");
                
            }
        }
    }
}
