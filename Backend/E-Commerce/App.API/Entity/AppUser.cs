using Microsoft.AspNetCore.Identity;

namespace App.API.Entity
{
    public class AppUser:IdentityUser
    {
        public string? Name { get; set; }
    }
}
