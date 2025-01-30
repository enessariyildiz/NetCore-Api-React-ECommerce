import { useEffect, useState } from "react";
import request from "../catalog/request";
import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Cart } from "../../model/ICart";
import { Delete, Height } from "@mui/icons-material";

export default function ShoppingCartPage() {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        request.Cart.get()
            .then((cart: Cart) => setCart(cart))
            .catch((error: any) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <CircularProgress />;

    if (!cart) return <h1>Shopping cart is empty!</h1>;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="shopping cart table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.cartItems.map((item) => (
                        <TableRow key={item.productId}>
                            <TableCell component="th" scope="row">
                                <img src={`https://localhost:7244/img/${item.imageUrl}`} style={{ height: 60 }} />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                            <TableCell align="right">
                                <IconButton color="error"><Delete /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}