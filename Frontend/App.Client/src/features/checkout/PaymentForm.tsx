import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <Grid2 container spacing={3}>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("card_name", { required: "Card Name Is Required!" })}
                    label="Enter Card Name"
                    fullWidth autoFocus sx={{ mb: 2 }}
                    size="small"
                    error={!!errors.card_name}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("card_number", { required: "Card Number Is Required!" })}
                    label="Enter Number"
                    fullWidth
                    size="small"
                    error={!!errors.card_number}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("card_expiry_date", { required: "Card Expiry Date Is Required!" })}
                    label="Enter Expiry Date"
                    fullWidth
                    size="small"
                    error={!!errors.card_expiry_date}></TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                    {...register("card_cvv", { required: "Card Cvv Is Required!" })}
                    label="Enter Card Cvv"
                    fullWidth
                    size="small"
                    error={!!errors.card_cvv}></TextField>
            </Grid2>


        </Grid2>
    );
}