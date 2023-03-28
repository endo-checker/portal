import React, { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

import { useUser } from '@/auth/userContext';
import Logo from "@/components/Logo";

type Values = {
    [key: string]: string;
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

    return (
   
        <Dialog maxWidth="md" open={true}  >
            <Stack sx={{ p: 2, width: 350 }} spacing={2} direction="column" alignItems="center">
                <Logo sx={{ height: 100, width: 'auto' }} />
                <Typography variant="h3">Sign Up</Typography>
                <TextField onKeyDown={(e) => onEnter(e)} size="small" label="Given Names" fullWidth type="text" name="givenName" onChange={(e) => setValues({ ...values, given_name: e.target.value })} />
                <TextField onKeyDown={(e) => onEnter(e)} size="small" label="Family Name" fullWidth type="text" name="familyName" onChange={(e) => setValues({ ...values, family_name: e.target.value })} />
                <TextField onKeyDown={(e) => onEnter(e)} size="small" label="Username" fullWidth type="text" name="nickname" onChange={(e) => setValues({ ...values, nickname: e.target.value })} />
                <TextField onKeyDown={(e) => onEnter(e)} size="small" label="Email" fullWidth type="text" name="email" onChange={(e) => setValues({ ...values, email: e.target.value })} />
                <TextField onKeyDown={(e) => onEnter(e)} size="small" label="Password" fullWidth type="password" name="password" onChange={(e) => setValues({ ...values, password: e.target.value })} />
                <LoadingButton fullWidth variant="contained" onClick={() => signUp(values)} >Sign Up</LoadingButton>
                <Divider sx={{ width: '100%' }} />
                <Stack direction="row" alignItems="center" spacing={1} >
                    <Typography align="center" color="grayText" >{"Already have an account? "}</Typography>
                    <Button onClick={() => navigate("/login")} color="primary" >Sign in</Button>
                </Stack>
            </Stack>
        </Dialog >
    )
}

export default SignUp;