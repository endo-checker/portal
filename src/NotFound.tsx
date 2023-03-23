import React from 'react';

import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const NotFound = (): React.ReactElement => {
    const navigate = useNavigate();

    return (
        <Container maxWidth={'sm'}>
            <Stack sx={{ p: 2 }} alignItems="center" spacing={2} component={Paper}>
                <ErrorIcon color="error" sx={{ fontSize: 75 }} />
                <Typography variant="h1">404</Typography>
                <Typography >{`The page you are looking for does not exist or can't be found`}</Typography>
                <Button variant="contained" onClick={() => navigate("/")}>Return home</Button>
            </Stack>
        </Container>
    )
}
export default NotFound;