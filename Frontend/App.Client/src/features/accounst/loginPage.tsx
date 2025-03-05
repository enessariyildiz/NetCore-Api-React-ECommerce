import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import request from "../../api/request";

export default function LoginPage() {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    async function submitForm(data: FieldValues) {
        await request.Account.login(data);
    }


    return (
        <Container maxWidth="xs">
            <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}></Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Login</Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 2 }}>
                    <TextField
                        {...register("username")}
                        label="Enter Username"
                        fullWidth required autoFocus sx={{ mb: 2 }}
                        size="small" ></TextField>

                    <TextField
                        {...register("password")}
                        label="Enter Password"
                        fullWidth required autoFocus sx={{ mb: 2 }}
                        size="small" ></TextField>
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>Login</Button>
                </Box>
            </Paper>
        </Container >
    )
}