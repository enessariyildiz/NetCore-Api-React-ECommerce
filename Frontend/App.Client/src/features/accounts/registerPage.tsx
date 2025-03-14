import { Avatar, Box, Container, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../store/store";
import request from "../../api/request";
import { toast } from "react-toastify";

export default function RegisterPage() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors, isSubmitting, isValid } } = useForm({
        defaultValues: {
            username: "",
            name: "",
            Email: "",
            password: ""
        },
        mode: "onTouched"
    });

    async function submitForm(data: FieldValues) {
        request.Account.register(data)
            .then(() => {
                toast.success("user created.");
                navigate("/login")
            }).catch(result => {
                const { data: errors } = result;

                errors.forEach((error: any) => {
                    if (error.code == "DupşicateUserName") {
                        setError("username", { message: error.description });
                    }
                    else if (error.code == "DuplicateEmail") {
                        setError("Email", { message: error.description });
                    }
                });
            })

        navigate("/catalog");
    }


    return (
        <Container maxWidth="xs">
            <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}></Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Register</Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 2 }}>
                    <TextField
                        {...register("username", { required: "Username is required!" })}
                        label="Enter Username"
                        fullWidth
                        autoFocus
                        sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.username}
                        helperText={errors.username?.message}></TextField>

                    <TextField
                        {...register("name", { required: "Name is required!" })}
                        label="Enter Name"
                        fullWidth
                        sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.name}
                        helperText={errors.name?.message}></TextField>

                    <TextField
                        {...register("Email", {
                            required: "Email is required!",
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "Email is not valid"
                            }
                        })}
                        label="Enter Email"
                        fullWidth
                        sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.Email}
                        helperText={errors.Email?.message}></TextField>


                    <TextField
                        {...register("password", {
                            required: "Password is required!", minLength: {
                                value: 8,
                                message: "Minimum lenght must be 8 characters!"
                            }
                        })}
                        label="Enter Password"
                        fullWidth
                        autoFocus
                        sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.password}
                        helperText={errors.password?.message}></TextField>

                    <LoadingButton
                        loading={isSubmitting}
                        disabled={!isValid}
                        type="submit"
                        variant="contained"
                        fullWidth sx={{ mt: 1 }}>Register</LoadingButton>
                </Box>
            </Paper>
        </Container >
    )
}