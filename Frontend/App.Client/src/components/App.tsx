import { useEffect, useState } from "react";
import { IProduct } from "../model/IProduct";
import Header from "./Header";
import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("https://localhost:7244/api/products")
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [])

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default App
