import React from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const DefaultView = (): React.ReactElement => {
    const navigate = useNavigate();

    return (
        <Paper sx={{ py: 4 }}>
            <Container maxWidth="lg" sx={{ textAlign: "center" }}>
                <Typography variant="h2" component="h1" sx={{ mb: 4 }}>
                    Welcome to Endo Logger
                </Typography>
                <Typography variant="h4" component="p" sx={{ mb: 4 }}>
                    Sign in to access your account.
                </Typography>
                <Stack justifyContent="center" direction="row" spacing={2} sx={{ mb: 4 }}>

                    <Button size="large" aria-label="sign-up-button" onClick={() => navigate("/sign-up")}>
                        Sign Up
                    </Button>
                    <Button size="large" aria-label="login-button" variant="contained" onClick={() => navigate("/login")}>
                        Login
                    </Button>
                </Stack>
            </Container>
        </Paper>
    );
};

export default DefaultView;