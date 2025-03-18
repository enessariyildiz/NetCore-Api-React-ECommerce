using App.API.DTOs;
using App.API.Entity;

namespace App.API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> OrderToDto(this IQueryable<Order> query)
        {
            return query.Select(x => new OrderDto
            {
                Id = x.Id,
                CustomerId = x.CustomerId,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Phone = x.Phone,
                AddressLine = x.AddressLine,
                City = x.City,
                DeliveryFree = x.DeliveryFree,
                SubTotal = x.SubTotal,
                OrderDate = x.OrderDate,
                OrderStatus = x.OrderStatus,
                OrderItems = x.OrderItems.Select(item => new OrderItemDto
                {
                    Id = item.Id,
                    ProductName = item.ProductName,
                    ProductId = item.ProductId,
                    ProductImage = item.ProductImage,
                    Price = item.Price,
                    Quantity = item.Quantity,
                }).ToList()
            });
        }
    }
}
