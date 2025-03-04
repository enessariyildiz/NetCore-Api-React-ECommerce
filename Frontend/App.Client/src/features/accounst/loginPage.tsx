import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import request from "../../api/request";

export default function LoginPage() {

    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    function handleSubmit(x: any) {
        x.preventDefault();
        console.log(values);

        request.Account.login(values);

    }

    function handleInputChange(x: any) {
        const { name, value } = x.target;
        setValues({ ...values, [name]: value })
    }
    return (
        <Container maxWidth="xs">
            <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}></Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Login</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                    <TextField
                        name="username"
                        value={values.username}
                        onChange={handleInputChange}
                        label="Enter Username"
                        fullWidth required autoFocus sx={{ mb: 2 }}
                        size="small" ></TextField>

                    <TextField
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        label="Enter Password"
                        fullWidth required autoFocus sx={{ mb: 2 }}
                        size="small" ></TextField>
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>Login</Button>
                </Box>
            </Paper>
        </Container >
    )
}