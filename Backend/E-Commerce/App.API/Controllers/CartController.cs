using App.API.Data;
using App.API.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace App.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<Cart>> GetCart()
        {
            var cart = await _context.Carts.Include(i => i.CartItems).ThenInclude(i => i.Product).Where(i => i.CustomerId == Request.Cookies["customerId"]).FirstOrDefaultAsync();

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }
    }
}
