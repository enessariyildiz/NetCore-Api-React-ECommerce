using System.ComponentModel.DataAnnotations;

namespace App.API.DTOs
{
    public class UserDto
    {
        public string Name { get; set; } = null!;
        public string Token { get; set; } = null!;
    }
}
