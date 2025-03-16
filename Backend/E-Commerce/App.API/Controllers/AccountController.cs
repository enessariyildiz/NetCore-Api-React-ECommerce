using App.API.Data;
using App.API.DTOs;
using App.API.Entity;
using App.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace App.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly AppDbContext _context;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService, AppDbContext context)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);

            if (user == null)
            {
                return BadRequest(new { message = "Username is wrong!" });
            }

            var result = await _userManager.CheckPasswordAsync(user, model.Password);

            if (result)
            {
                var userCart =  await GetOrCreate(model.UserName);
                var cookieCart = await GetOrCreate(Request.Cookies["customerId"]!);

                if (userCart != null)
                {
                    foreach (var item in userCart.CartItems)
                    {
                        cookieCart.AddItem(item.Product, item.Quantity);
                    }

                    _context.Carts.Remove(userCart);
                }

                cookieCart.CustomerId = model.UserName;
                await _context.SaveChangesAsync();


                return Ok(new UserDto {
                    Name = user.Name!,
                    Token = await _tokenService.GenerateToken(user) }); ;
            }

            return Unauthorized();
        }

        private async Task<Cart> GetOrCreate(string custID)
        {
            var cart = await _context.Carts.Include(i => i.CartItems)
                .ThenInclude(i => i.Product)
                .Where(i => i.CustomerId == custID)
                .FirstOrDefaultAsync();

            if (cart == null)
            {
                var customerId = User.Identity?.Name;

                if (string.IsNullOrEmpty(customerId))
                {
                    customerId = Guid.NewGuid().ToString();

                    var cookieOptions = new CookieOptions
                    {
                        Expires = DateTime.Now.AddMonths(1),
                        IsEssential = true,
                    };

                    Response.Cookies.Append("customerId", customerId, cookieOptions);

                }

                cart = new Cart { CustomerId = customerId };

                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            return cart;
        }

        [HttpPost("register")]
        public async Task<IActionResult> CreateUser(RegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new AppUser
            {
                Name = model.Name,
                UserName = model.UserName,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Customer");
                return StatusCode(201);
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet("getUser")]
        public async Task<ActionResult<UserDto>> GetUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity?.Name!);

            if (user == null)
            {
                return BadRequest(new ProblemDetails { Title = "Username or Password is wrong" });
            }

            return new UserDto
            {
                Name = user.Name!,
                Token = await _tokenService.GenerateToken(user)
            };

        }

    }
}
