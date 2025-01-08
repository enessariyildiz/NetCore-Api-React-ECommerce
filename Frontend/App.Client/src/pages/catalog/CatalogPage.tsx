import { useEffect, useState } from "react";
import { IProduct } from "../../model/IProduct";
import ProductList from "./ProductList";

export default function CatalogPage() {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        fetch("https://localhost:7244/api/products")
            .then(response => response.json())
            .then(data => setProducts(data));
    }, [])

    return (
        <ProductList products={products} />
    );

}