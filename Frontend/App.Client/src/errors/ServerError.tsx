import { Card, Container, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {

    const { state } = useLocation();

    return (
        <Container component={Card} sx={{ p: 3 }}>
            {state?.error ?
                (
                    <>
                        <Typography variant="h3" gutterBottom>{state.error.title} - {state.status}</Typography>
                    </>
                ) :
                (
                    <Typography variant="h5">Server Errors</Typography>
                )
            }
        </Container>
    );

}