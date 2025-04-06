import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <Grid2 container spacing={3}>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("cardname", { required: "Card Name Is Required!" })}
                    label="Enter Card Name"
                    fullWidth autoFocus sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.cardname}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("cardnumber", { required: "Card Number Is Required!" })}
                    label="Enter Number"
                    fullWidth
                    size="small"
                    error={!!errors.cardnumber}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 6 }}>
                <TextField
                    {...register("cardexpiremonth", { required: "Card Expiry Month Is Required!" })}
                    label="Enter Expiry Date"
                    fullWidth
                    size="small"
                    error={!!errors.cardexpiremonth}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 6 }}>
                <TextField
                    {...register("cardexpireyear", { required: "Card Expiry Year Is Required!" })}
                    label="Enter Expiry Date"
                    fullWidth
                    size="small"
                    error={!!errors.cardexpireyear}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("cardcvv", { required: "Card Cvv Is Required!" })}
                    label="Enter Card Cvv"
                    fullWidth
                    size="small"
                    error={!!errors.cardcvv}></TextField>
            </Grid2>


        </Grid2>
    );
}