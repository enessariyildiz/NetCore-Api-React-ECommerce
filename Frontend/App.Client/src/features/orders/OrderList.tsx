import { useEffect, useState } from "react";
import { Order } from "../../model/IOrder";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import request from "../../api/request";
import { currencyTRY } from "../../utils/formatCurrency";
import { ArrowRightOutlined } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';


const orderStatus = ["Pending", "Approved", "PaymentFailed", "Complated"];

export default function OrderList() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(false);

    const [selectOrder, setSelecetOrder] = useState<Order | null>(null);
    const [open, setOpen] = useState(false);

    const subTotal = selectOrder?.orderItems.reduce((total, item) => total + (item.quantity * item.price), 0) ?? 0;
    const tax = subTotal * 0.2;
    const total = subTotal + tax;

    function handleDialogOpen(order: Order) {

        setOpen(true);
        setSelecetOrder(order);
    }

    function handleDialogClose() {
        setOpen(false);
        setSelecetOrder(null);
    }

    useEffect(() => {
        setLoading(true);

        request.Order.getOrders()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    })

    if (loading) return <CircularProgress />

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Id</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell component="th" scope="row">{order.id}</TableCell>
                                <TableCell component="th" scope="row">{orderStatus[order.orderStatus]}</TableCell>
                                <TableCell component="th" scope="row">{new Date(order.orderDate).toLocaleString()}</TableCell>
                                <TableCell component="th" scope="row">{currencyTRY.format(order.subTotal)}</TableCell>
                                <TableCell component="th" scope="row" sx={{ width: 100 }}>
                                    <Button onClick={() => handleDialogOpen(order)} size="small" variant="contained" endIcon={<ArrowRightOutlined />}>Details</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            <Dialog onClose={handleDialogClose} open={open} fullWidth maxWidth="lg"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle>
                    Order Number : # {selectOrder?.id}
                </DialogTitle>
                <IconButton onClick={handleDialogClose} sx={{ position: "absolute", right: 8, top: 8 }}>
                    <CloseIcon></CloseIcon>
                </IconButton>
                <DialogContent dividers>
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>Delivery Information</Typography>
                        <Typography gutterBottom>{selectOrder?.firstName} {selectOrder?.lastName}</Typography>
                        <Typography gutterBottom>{selectOrder?.phone}</Typography>
                        <Typography gutterBottom>{selectOrder?.addressLine} / {selectOrder?.city}</Typography>
                    </Paper>
                    <Table>
                        <TableHead id="alert-dialog-title">
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Number</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectOrder?.orderItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <img src={`https://localhost:7244/img/${item.productImage}`} style={{ height: 60 }} />
                                    </TableCell>
                                    <TableCell align="right">{item.productName}</TableCell>
                                    <TableCell align="right">{currencyTRY.format(item.price)}</TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">{currencyTRY.format(item.price * item.quantity)}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell align="right" colSpan={4}>Sub Total</TableCell>
                                <TableCell align="right" colSpan={4}>{currencyTRY.format(subTotal)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right" colSpan={4}>Tax</TableCell>
                                <TableCell align="right" colSpan={4}>{currencyTRY.format(tax)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right" colSpan={4}>Total</TableCell>
                                <TableCell align="right" colSpan={4}>{currencyTRY.format(total)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}