import { AppBar, Container, Toolbar, Typography } from "@mui/material";


export default function Header() {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Container>
                    <Typography variant="h6">Full Stack E-Commerce</Typography>
                </Container>
            </Toolbar>
        </AppBar>

    )
}