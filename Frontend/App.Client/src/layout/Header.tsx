import { KeyboardArrowDown, ShoppingBag } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar } from "@mui/material";
import { Link, NavLink } from "react-router";
import { logout } from "../features/accounts/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearCart } from "../features/cart/cartSlice";
import React, { useState } from "react";




const links = [
    { title: "Home", to: "/" },
    { title: "Catalog", to: "/catalog" },
    { title: "About", to: "/about" },
    { title: "Contact", to: "/contact" },
    { title: "Error", to: "/error" },
]

const authLinks = [
    { title: "Login", to: "/login" },
    { title: "Register", to: "/register" },
]

const navStyles = {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
        color: "text.primary"
    },
    "&.active": {
        color: "warning.main"
    }
}

export default function Header() {

    const { cart } = useAppSelector(state => state.cart);
    const { user } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const itemCount = cart?.cartItems.reduce((total, item) => total + item.quantity, 0);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleMenuClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event?.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null)
    }

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* <Typography variant="h6">Full Stack E-Commerce</Typography> */}

                        <Stack direction="row">
                            {links.map(link =>
                                <Button key={link.to} component={NavLink} to={link.to} sx={navStyles}>{link.title}</Button>
                            )}
                        </Stack>
                    </Box>
                    <Box>
                        <IconButton component={Link} to="/cart" size="large" edge="start" color="inherit">
                            <Badge badgeContent={itemCount} color="secondary">
                                <ShoppingBag />
                            </Badge>
                        </IconButton>

                        {
                            user ? (
                                <>

                                    <Button id="user-button" onClick={handleMenuClick} endIcon={<KeyboardArrowDown />} sx={navStyles}>{user.name}</Button>

                                    <Menu id="user-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                                        <MenuItem>Orders</MenuItem>
                                        <MenuItem onClick={() => {
                                            dispatch(logout())
                                            dispatch(clearCart())
                                        }}>Logout</MenuItem>
                                    </Menu>



                                </>
                            ) : (

                                <Stack direction="row">
                                    {authLinks.map(link =>
                                        <Button key={link.to} component={NavLink} to={link.to} sx={navStyles}>{link.title}</Button>
                                    )}
                                </Stack>

                            )
                        }


                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}