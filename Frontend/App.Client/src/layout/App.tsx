import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import request from "../api/request";
import { useAppDispatch } from "../hooks/hooks";
import { getCart } from "../features/cart/cartSlice";
import { logout, setUser } from "../features/accounst/accountSlice";
import Header from "./Header";

function App() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = async () => {

    dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));

    request.Account.getUser()
      .then(user => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch(error => {
        console.log(error);
        dispatch(logout());
      });


    await dispatch(getCart());

  }

  useEffect(() => {
    initApp().then(() => setLoading(false));
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
