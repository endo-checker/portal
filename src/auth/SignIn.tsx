import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { useUser } from "@/auth/userContext";
import Logo from "@/components/Logo";

type Values = {
    [key: string]: string;
}

const SignIn = (): React.ReactElement => {
    const { signIn } = useUser();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState<Values>({
        username: "",
        password: ""
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const onEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && { ...credentials }) {
            signIn(credentials);
        }
    }

    return (
        <Dialog open={true} maxWidth="sm" >
            <Stack sx={{ p: 2, width: 350 }} spacing={2} direction="column" alignItems="center">
                <Logo sx={{ height: 100, width: 'auto' }} />
                <Typography variant="h3">Sign In</Typography>
                <Typography align="center" color="grayText" >Log in to the Endo platform to access your patients and their information.</Typography>
                <TextField onKeyDown={(e) => onEnter(e)} fullWidth label="Email" name="username" onChange={onChange} />
                <TextField onKeyDown={(e) => onEnter(e)} type="password" fullWidth name="password" label="Password" onChange={onChange} />
                <Button size="large" fullWidth onClick={() => signIn(credentials)} variant="contained">Sign In</Button>
                <Divider sx={{ width: '100%' }} />
                <Stack direction="row" alignItems="center" spacing={1} >
                    <Typography align="center" color="grayText" >{"Don't have an account? "}</Typography>
                    <Button onClick={() => navigate("/sign-up")} color="primary" >Sign Up</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}
export default SignIn