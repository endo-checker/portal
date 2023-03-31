import React from 'react';

// import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

const SignUpSuccess = (): React.ReactElement => {

    const { successId } = useParams();
    const navigate = useNavigate();


    const redirect = () => {
        if (!successId) {
            navigate('/')
        }
    }
    useQuery([successId], redirect)

    return (
        <>
            <Typography>Success!</Typography>
            <Typography>Thank you for signing up!</Typography>
            <Typography>Check your email for a confirmation link.</Typography>
        </>
    )
}

export default SignUpSuccess