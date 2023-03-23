import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";

import { useUser } from "@/auth/userContext";

const SignIn = (): React.ReactElement => {
    const { signIn } = useUser();
    const [error, setError] = useState<string>("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        grant_type: "password",
        audience: ""
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        })
        setError("");
    }

    return (
        <Dialog open={true} maxWidth="md">
            {error}
            <Grid sx={{ p: 2 }} spacing={2} container>
                <Grid xs={12}>
                    <TextField fullWidth label="Email" name="username" onChange={onChange} />
                </Grid>
                <Grid xs={12}>
                    <TextField type="password" fullWidth name="password" label="Password" onChange={onChange} />
                </Grid>
                <Grid xs={12}>
                    <Button onClick={() => signIn(credentials)} variant="contained">Sign In</Button>
                </Grid>
            </Grid>
        </Dialog>
    )

}
export default SignIn