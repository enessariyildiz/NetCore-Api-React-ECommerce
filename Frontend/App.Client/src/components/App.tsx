import Header from "./Header";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useCartContext } from "../context/CartContext";
import { useEffect, useState } from "react";
import request from "../api/request";

function App() {

  const { setCart } = useCartContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request.Cart.get()
      .then(cart => setCart(cart))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default App
