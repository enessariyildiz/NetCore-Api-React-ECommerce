import { useEffect, useState } from "react";
import { Order } from "../../model/IOrder";
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
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

            <Dialog onClose={handleDialogClose} open={open} fullWidth maxWidth="lg">
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
                </DialogContent>
            </Dialog>
        </>
    )
}