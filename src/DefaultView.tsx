import React from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const DefaultView = (): React.ReactElement => {
    const navigate = useNavigate();

    return (

        <Container maxWidth="lg">
            <h1>{`You aren't signed in`}</h1>
            <Button onClick={() => navigate("/login")}>Login</Button>
        </Container>

    );
};

export default DefaultView;