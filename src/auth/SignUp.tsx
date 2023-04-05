import React, { useState } from 'react';

import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from "react-router-dom";

import { useUser } from '@/auth/userContext';
import Logo from "@/components/Logo";

type Vals = 'givenName' | 'familyName' | 'email' | 'nickname' | 'password';

type Values = {
    [key in Vals]: string;
}

const SignUp = (): React.ReactElement => {
    const { signUp } = useUser();
    const navigate = useNavigate();

    const [values, setValues] = useState<Values>({
        givenName: '',
        familyName: '',
        email: '',
        nickname: '',
        password: ''
    });

    const onEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && { ...values }) {
            signUp(values);
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid xs={12}>
                    <Stack spacing={2} alignItems="center" direction="column">
                        <Logo sx={{ height: 100, width: 'auto' }} />
                        <Typography variant="h3">Sign Up</Typography>
                    </Stack>
                </Grid>
                <Grid xs={6}>
                    <TextField onKeyDown={(e) => onEnter(e)} label="Given Names" fullWidth type="text" name="givenName" onChange={onChange} />
                </Grid>
                <Grid xs={6}>
                    <TextField onKeyDown={(e) => onEnter(e)} label="Family Name" fullWidth type="text" name="familyName" onChange={onChange} />
                </Grid>
                <Grid xs={12}>
                    <TextField onKeyDown={(e) => onEnter(e)} label="Username" fullWidth type="text" name="nickname" onChange={onChange} />
                </Grid>
                <Grid xs={12}>
                    <TextField onKeyDown={(e) => onEnter(e)} label="Email" fullWidth type="text" name="email" onChange={onChange} />
                </Grid>
                <Grid xs={12}>
                    <TextField onKeyDown={(e) => onEnter(e)} label="Password" fullWidth type="password" name="password" onChange={onChange} />
                </Grid>

                <Grid xs={12}>
                    <Button size="large" fullWidth variant="contained" onClick={() => signUp(values)} >Create Account</Button>
                </Grid>
                <Grid xs={12}>
                    <Divider sx={{ width: '100%' }} />
                </Grid>
                <Grid xs={12}>
                    <Stack alignItems="center" direction="row">
                        <Typography align="center" color="grayText" >{"Already have an account? "}</Typography>
                        <Button onClick={() => navigate("/login")} color="primary" >Sign in</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Paper >
    )
}

export default SignUp;
