import { useEffect, useState } from "react";
import request from "../catalog/request";

export default function ShoppingCartPage() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        request.Cart.get()
            .then((cart: any) => console.log(cart)
                .catch((error: any) => console.log(error))
                .finally(() => setLoading(false));
    }, []);

    return <h1>Shopping Cart</h1>
}
