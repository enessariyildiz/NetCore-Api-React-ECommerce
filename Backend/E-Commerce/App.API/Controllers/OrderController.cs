using App.API.Data;
using App.API.DTOs;
using App.API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace App.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetOrders")]
        public async Task<ActionResult<List<OrderDto>>> GetOrder()
        {
            return await _context.Orders
                .Include(x => x.OrderItems)
                .OrderToDto()
                .Where(x => x.CustomerId == User.Identity!.Name)
                .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrders")]
        public async Task<ActionResult<OrderDto?>> GetOrder(int id)
        {
            return await _context.Orders
                .Include(x => x.OrderItems)
                .OrderToDto()
                .Where(x => x.CustomerId == User.Identity!.Name)
                .FirstOrDefaultAsync();
        }


    }
}
