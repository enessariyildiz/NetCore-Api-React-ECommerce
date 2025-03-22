import { ChevronLeftRounded, ChevronRightRounded, Info } from "@mui/icons-material";
import { Box, Button, Grid2, Paper, Step, StepLabel, Stepper } from "@mui/material";
import AddressForm from "./AddressForm";
import Review from "./Review";
import PaymentForm from "./PaymentForm";
import { useState } from "react";

const step = ["Delivery Information", "Payment", "Order Summary"]

function getStepContent(step: number) {

    switch (step) {
        case 0:
            return <AddressForm />
        case 1:
            return <PaymentForm />
        case 2:
            return <Review />
        default:
            throw new Error("Unknow a step");
    }
}

export default function CheckoutPage() {

    const [activeStep, setActiveStep] = useState(0);

    function handleNext() {
        setActiveStep(activeStep + 1);
    }

    function handlePrevious() {
        setActiveStep(activeStep - 1);
    }

    return (
        <Paper>
            <Grid2 container sx={{ p: 4 }} spacing={4} >
                <Grid2 size={4}>
                    <Info />
                </Grid2>
                <Grid2 size={8}>
                    <Box>
                        <Stepper activeStep={activeStep} sx={{ height: 40 }}>
                            {step.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                    <Box>
                        {activeStep === step.length ? (
                            <h2>Order Complated</h2>
                        ) : (
                            <>
                                {getStepContent(activeStep)}
                                <Box>
                                    <Box sx={
                                        [
                                            {
                                                display: "flex"
                                            },
                                            activeStep !== 0
                                                ? { justifyContent: "space-between" }
                                                : { justifyContent: "flex-end" }
                                        ]

                                    }>
                                        {
                                            activeStep !== 0 &&
                                            <Button startIcon={<ChevronRightRounded />} variant="contained" onClick={handlePrevious}>Back</Button>

                                        }

                                        <Button startIcon={<ChevronLeftRounded />} variant="contained" onClick={handleNext}>Next</Button>

                                    </Box>
                                </Box>
                            </>
                        )}
                    </Box>
                </Grid2>
            </Grid2>
        </Paper >
    );
};