import { Alert, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AddCircleOutline, Delete, Height, RemoveCircleOutline } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import request from "../catalog/request";

export default function ShoppingCartPage() {
    const { cart, setCart } = useCartContext;
    const [loading, setLoading] = useState(false);


    function handleAddItem(productId: number) {
        setLoading(true);

        request.Cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    function handleDeleteItem(productId: number, quantity = 1) {
        setLoading(true);

        request.Cart.deleteItem(productId)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));

    }

    if (cart?.cartItems.lenght === 0) return <Alert severity="warning">Shopping cart is empty!</Alert>;


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
                            <TableCell align="right">
                                <LoadingButton loading={loading} onClick={() => handleAddItem(item.productId)}>
                                    <AddCircleOutline />
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton loading={loading} onClick={() => handleDeleteItem(item.productId)}>
                                    <RemoveCircleOutline />
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                            <TableCell align="right">
                                <IconButton color="error" loading={loading} onClick={() => handleDeleteItem(item.productId, item.quantity)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}