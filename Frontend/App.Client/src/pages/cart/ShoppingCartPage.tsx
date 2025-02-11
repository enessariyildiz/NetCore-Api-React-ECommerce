import { Alert, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import request from "../catalog/request";
import { toast } from "react-toastify";

export default function ShoppingCartPage() {
    const { cart, setCart } = useCartContext();
    const [status, setStatus] = useState({ loading: false, id: "" });


    function handleAddItem(productId: number, id: string) {
        setStatus({ loading: true, id: id });

        request.Cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, id: "" }));
    }

    function handleDeleteItem(productId: number, id: string, quantity = 1) {
        setStatus({ loading: true, id: id });

        request.Cart.deleteItem(productId)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, id: "" }));
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
                    {cart?.cartItems.map((item) => (
                        <TableRow key={item.productId}>
                            <TableCell component="th" scope="row">
                                <img src={`https://localhost:7244/img/${item.imageUrl}`} style={{ height: 60 }} />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                            <TableCell align="right">
                                <LoadingButton loading={status.loading && status.id === "add" + item.productId}
                                    onClick={() => handleAddItem(item.productId, "add" + item.productId)}>
                                    <AddCircleOutline />
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton loading={status.loading && status.id === "del" + item.productId}
                                    onClick={() => handleDeleteItem(item.productId, "del" + item.productId)}>
                                    <RemoveCircleOutline />
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                            <TableCell align="right">
                                <IconButton color="error" loading={status.loading && status.id === "del_all" + item.productId}
                                    onClick={() => {
                                        handleDeleteItem(item.productId, "del_all" + item.productId, item.quantity)
                                        toast.error("Items removed.")
                                    }}>
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