using App.API.Data;
using App.API.DTOs;
using App.API.Entity;
using App.API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

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
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders
                .Include(x => x.OrderItems)
                .OrderToDto()
                .Where(x => x.CustomerId == User.Identity!.Name)
                .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto?>> GetOrder(int id)
        {
            return await _context.Orders
                .Include(x => x.OrderItems)
                .OrderToDto()
                .Where(x => x.CustomerId == User.Identity!.Name)
                .FirstOrDefaultAsync();
        }

        [HttpPost("CreateOrder")]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
        {
            var cart = await _context.Carts
                .Include(x => x.CartItems)
                .ThenInclude(x => x.Product)
                .Where(x => x.CustomerId == User.Identity!.Name)
                .FirstOrDefaultAsync();

            if (cart == null) return BadRequest(new ProblemDetails { Title = "Problem getting car" });

            var items = new List<OrderItem>();

            foreach (var item in cart.CartItems)
            {
                var product = await _context.Products.FindAsync(item.ProductId);

                var orderItem = new OrderItem
                {
                    ProductId = product!.Id,
                    ProductName = product.Name!,
                    ProductImage = product.ImageUrl!,
                    Price = product.Price,
                    Quantity = item.Quantity

                };

                items.Add(orderItem);
                product.Stock -= item.Quantity;
            }

            var subTotal = items.Sum(x => x.Price * x.Quantity);
            var deliveryFee = 0;

            var order = new Order
            {
                OrderItems = items,
                CustomerId = User.Identity!.Name,
                FirstName = orderDto.FirstName,
                LastName = orderDto.LastName,
                Phone = orderDto.Phone,
                City = orderDto.City,
                AddressLine = orderDto.AddressLine,
                SubTotal = subTotal,
                DeliveryFree = deliveryFee
            };

            _context.Orders.Add(order);
            _context.Carts.Remove(cart);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
                return CreatedAtRoute(nameof(GetOrder), new { id = order.Id }, order.Id);
            return BadRequest(new ProblemDetails { Title = "Problem getting order"});
        }


    }
}
