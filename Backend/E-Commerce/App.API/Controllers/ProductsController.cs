using App.API.Data;
using App.API.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace App.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var product = await _context.Products.ToListAsync();

            return Ok(product);
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetProducts(int? id)
        {
            if (id == null) 
            {
                return NotFound();
            }

            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);

        }

    }
}
