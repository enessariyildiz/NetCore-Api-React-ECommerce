import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart, Search } from "@mui/icons-material";
import { Link } from "react-router";
import LoadingButton from '@mui/lab/LoadingButton';
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart } from "../cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

interface Props {
    product: IProduct
}

export default function Product({ product }: Props) {

    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.cart);

    return (
        <Card>
            <CardMedia sx={{ height: 160, backgroundSize: "contain" }} image={`https://localhost:7244/img/${product.ImageUrl}`} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" color="text-secondary">
                    {product.name}
                </Typography>

                <Typography variant="body2" color="secondary">
                    {currencyTRY.format(product.price)}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                    variant="outlined"
                    loadingPosition="start"
                    size="small"
                    startIcon={<AddShoppingCart />}
                    loading={status === "pendingAddItem" + product.id}
                    onClick={() => dispatch(addItemToCart({ productId: product.id }))}>Add to shop</LoadingButton>

                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<Search />} color="info"> View</Button>
            </CardActions>
        </Card >

    );
}