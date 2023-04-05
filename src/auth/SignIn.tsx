import React, { useState } from "react";

import { LoadingButton } from "@mui/lab";
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

const SignIn = (): JSX.Element => {
    const { signIn } = useUser();
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [credentials, setCredentials] = useState<Values>({
        username: "",
        password: ""
    });

    const undefinedVals: Array<string> = Object.values(credentials).filter(val => val === '')
    const disable = (): boolean => undefinedVals.length > 0;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const onEnter = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === 'Enter') {
            if (!credentials.username || !credentials.password) {
                setError("Please enter your username and password");
            }
            else (
                signIn(credentials)
            )
        }
    }

    const awaitSignIn = async (): Promise<void> => {
        setSubmitting(true);
        try {
            await signIn(credentials);

        } catch (e) {
            setSubmitting(false)
            console.log(e);
        }
    }

    return (
        <Dialog open={true} maxWidth="sm" >
            <Stack sx={{ p: 2, width: 350 }} spacing={2} direction="column" alignItems="center">
                <Logo sx={{ height: 100, width: 'auto' }} />
                <Typography variant="h3">Sign In</Typography>
                {error && <Typography color="error" >{error}</Typography>}
                <Typography align="center" color="grayText" >Log in to the Endo platform to access your patients and their information.</Typography>
                <TextField onKeyDown={(e) => onEnter(e)} fullWidth label="Email" name="username" onChange={onChange} />
                <TextField onKeyDown={(e) => onEnter(e)} type="password" fullWidth name="password" label="Password" onChange={onChange} />
                <LoadingButton disabled={submitting ? submitting : disable()} size="large" fullWidth onClick={() => awaitSignIn()} variant="contained">Sign In</LoadingButton>
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