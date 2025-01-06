import { IProduct } from "../model/IProduct";
import Product from "./Product";

interface Props {
    products: IProduct[];
    addProduct: () => void;
}

export default function ProductList({ products, addProduct }: Props) {
    console.log("render...")
    return (
        <div>
            <h2>Product List</h2>
            {products.map((p: IProduct) => (
                <Product key={p.id} product={p} />
            ))}

            <button onClick={addProduct}>Add a product.</button>
        </div>
    );
}