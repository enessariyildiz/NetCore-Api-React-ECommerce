import { Avatar, Box, Container, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import request from "../../api/request";
import { LoadingButton } from "@mui/lab";

export default function LoginPage() {

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({
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
                        {...register("username", { required: "Username is required!" })}
                        label="Enter Username"
                        fullWidth required autoFocus sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.username}
                        helperText={errors.username?.message}></TextField>
                    <TextField
                        {...register("password", {
                            required: "Password is required!", minLength: {
                                value: 8,
                                message: "Minimum lenght must be 8 characters!"
                            }
                        })}
                        label="Enter Password"
                        fullWidth required autoFocus sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.password}
                        helperText={errors.password?.message}></TextField>
                    <LoadingButton
                        loading={isSubmitting}
                        disabled={!isValid}
                        type="submit"
                        variant="contained"
                        fullWidth sx={{ mt: 1 }}>Login</LoadingButton>
                </Box>
            </Paper>
        </Container >
    )
}