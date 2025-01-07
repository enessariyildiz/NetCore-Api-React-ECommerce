import { useEffect, useState } from "react";
import { IProduct } from "../model/IProduct";
import Header from "./Header";
import ProductList from "./ProductList";
import { Container, CssBaseline } from "@mui/material";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("https://localhost:7244/api/products")
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [])


  function addProduct() {
    setProducts([...products, {
      id: Date.now(),
      name: "Product 4",
      price: 5000,
      isActive: true,
    }])
  }
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <ProductList products={products} addProduct={addProduct} />
      </Container>
    </>
  )
}

export default App
