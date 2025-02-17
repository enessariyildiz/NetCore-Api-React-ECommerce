import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart, Search } from "@mui/icons-material";
import { Link } from "react-router";
import { useState } from "react";
import request from "./request";
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from "react-toastify";
import { Cart } from "../../model/ICart";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch } from "../../hooks/hooks";
import { setCart } from "../cart/cartSlice";



interface Props {
    product: IProduct
}

export default function Product({ product }: Props) {

    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch();

    function handleAddItem(productId: number) {
        setLoading(true);

        request.Cart.addItem(productId)
            .then((cart: Cart) => {
                dispatch(setCart(cart));
                toast.success("Added your shopping cart");
            })
            .catch((error: any) => console.log(error))
            .finally(() => setLoading(false));


    }

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
                    loading={loading}
                    onClick={() => handleAddItem(product.id)}>Add to shop</LoadingButton>

                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<Search />} color="info"> View</Button>
            </CardActions>
        </Card >

    );
}