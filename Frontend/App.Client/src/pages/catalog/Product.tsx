import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart, Search } from "@mui/icons-material";
import { Link } from "react-router";
import { useState } from "react";
import request from "./request";


interface Props {
    product: IProduct
}

export default function Product({ product }: Props) {

    const [loading, setLoading] = useState(false)

    function handleAddItem(productId: number) {
        setLoading(true);

        request.Cart.addItem(productId)
            .then((cart: any) => console.log(cart))
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
                    {(product.price / 100).toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="outlined" size="small" startIcon={<AddShoppingCart />} color="secondary"
                    onClick={() => handleAddItem(product.id)}> Add to card</Button>

                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<Search />} color="info"> View</Button>
            </CardActions>
        </Card >

    );
}