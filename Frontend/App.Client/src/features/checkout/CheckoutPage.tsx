import { Info } from "@mui/icons-material";
import { Grid2, Paper } from "@mui/material";
import AddressForm from "./AddressForm";
import Review from "./Review";
import PaymentForm from "./PaymentForm";

export default function CheckoutPage() {
    return (
        <Paper>
            <Grid2 container sx={{ p: 4 }} spacing={2} >
                <Grid2 size={4}>
                    <Info />
                </Grid2>
                <Grid2 size={8}>
                    <AddressForm />
                    <PaymentForm />
                    <Review />

                </Grid2>
            </Grid2>
        </Paper>
    );
};