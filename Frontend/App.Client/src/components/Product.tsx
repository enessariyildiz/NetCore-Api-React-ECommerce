import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../model/IProduct";
import { AddShoppingCart, Search } from "@mui/icons-material";



interface Props {
    product: IProduct
}

export default function Product({ product }: Props) {
    return (
        <Card>
            <CardMedia sx={{ height: 160, backgroundSize: "contain" }} image={`http://localhost:7244/images/${product.ImageUrl}`} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" color="text-secondary">
                    {product.name}
                </Typography>

                <Typography variant="body2" color="secondary">
                    {(product.price / 100).toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" size="small" startIcon={<AddShoppingCart />} color="secondary"> Add to card</Button>
                <Button variant="outlined" size="small" startIcon={<Search />} color="info"> View</Button>
            </CardActions>
        </Card>

    );
}