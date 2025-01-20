namespace App.API.Entity
{
    public class Cart
    {
        public int CartId { get; set; }
        public string CustomerId { get; set; } = null!;

        public List<CartItem> CartItems { get; set; } = new();
    }

    public class CartItem
    {
        public int CartItemId { get; set; }
        public int ProrductId { get; set; }
        public Product Product { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; } = null!;
        public int Quantity { get; set; }
    }
}
