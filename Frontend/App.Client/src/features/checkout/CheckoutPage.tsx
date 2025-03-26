import { ChevronLeftRounded, ChevronRightRounded, Info } from "@mui/icons-material";
import { Box, Button, Grid2, Paper, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import AddressForm from "./AddressForm";
import Review from "./Review";
import PaymentForm from "./PaymentForm";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { Form } from "react-router";
import request from "../../api/request";

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
    const methods = useForm();
    const [orderId, setOrderId] = useState(0);

    async function handleNext(data: FieldValues) {
        if (activeStep == 2) {
            setOrderId(await request.Order.createOrder(data));
        }
        else {
            setActiveStep(activeStep + 1);
        }
    }

    function handlePrevious() {
        setActiveStep(activeStep - 1);
    }

    return (
        <FormProvider {...methods}>
            <Paper>
                <Grid2 container spacing={4} >
                    <Grid2 size={4} sx={{
                        borderRight: "1px solid",
                        borderColor: "divider",
                        p: 3
                    }}>
                        <Info />
                    </Grid2>
                    <Grid2 size={8} sx={{ p: 3 }}>
                        <Box>
                            <Stepper activeStep={activeStep} sx={{ height: 40, mb: 4 }}>
                                {step.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        <Box>
                            {activeStep === step.length ? (
                                <Stack spacing={2}>
                                    <Typography variant="h3">Thank you. We have received your order.</Typography>
                                    <Typography variant="body1" sx={{ color: "text.danger" }}>
                                        Your order number <strong>#{orderId}</strong>. We will send you e-mail when your order is confirmed.</Typography>
                                    <Button sx={{
                                        alignSelf: "start",
                                        width: { xs: "100%", sm: "auto" }
                                    }}
                                        variant="contained">List my orders.</Button>
                                </Stack>
                            ) : (

                                <Form onSubmit={methods.handleSubmit(handleNext)}>
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
                                            <Button
                                                type="submit"
                                                startIcon={<ChevronLeftRounded />}
                                                variant="contained">Next</Button>
                                        </Box>
                                    </Box>
                                </Form>
                            )}
                        </Box>
                    </Grid2>
                </Grid2>
            </Paper >
        </FormProvider>
    );
};