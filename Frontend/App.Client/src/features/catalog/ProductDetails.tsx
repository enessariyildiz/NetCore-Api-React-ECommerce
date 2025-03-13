import { CircularProgress, Divider, Grid2, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import NotFound from "../../errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart } from "../cart/cartSlice";
import { fetchProductById, selectProductById } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function ProductDetailsPage() {

    const { cart, status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => selectProductById(state, Number(id)))
    const { status: loading } = useAppSelector(state => state.catalog);

    const item = cart?.cartItems.find(x => x.productId == product?.id);

    useEffect(() => {
        if (!product && id) dispatch(fetchProductById(parseInt(id)))

    }, [id]);

    if (loading === "pendingFetchProductById") return <CircularProgress />

    if (!product) return <NotFound />

    return (
        <Grid2 container spacing={6}>
            <Grid2 size={{ xl: 3, lg: 4, md: 5, sm: 6, xs: 12 }}>
                <img src={`https://localhost:7244/img/${product.ImageUrl}`} style={{ width: "100%" }} />
            </Grid2>
            <Grid2 size={{ xl: 3, lg: 4, md: 5, sm: 6, xs: 12 }}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color="secondary">{currencyTRY.format(product.price)}</Typography>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{product.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Stock</TableCell>
                            <TableCell>{product.stock}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Stack direction="row" spacing={2} sx={{ mt: 3 }} alignItems="center">
                    <LoadingButton variant="outlined"
                        loadingPosition="start"
                        startIcon={<AddShoppingCart />}
                        loading={status === "pendingAddItem" + product.id}
                        onClick={() => dispatch(addItemToCart({ productId: product.id }))}>
                        Add to cart
                    </LoadingButton>
                    {
                        item?.quantity! > 0 && (
                            <Typography variant="body2">{item?.quantity} items added your cart!</Typography>
                        )
                    }
                </Stack>


            </Grid2>


        </Grid2>


    );
}