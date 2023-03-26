import React, { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { useUser } from '@/auth/userContext';
import Logo from "@/components/Logo";

const SignUp = (): React.ReactElement => {
    const [error, setError] = useState<string>('');
    const [values, setValues] = useState({
        given_name: '',
        family_name: '',
        email: '',
        nickname: '',
        password: ''
    });

    const navigate = useNavigate();

    const { signUp } = useUser();

    const handleSubmit = async () => {
        try {
            await signUp(values);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog maxWidth="md" open={true}  >
            <Stack sx={{ p: 2, width: 350 }} spacing={2} direction="column" alignItems="center">
                <Logo sx={{ height: 100, width: 'auto' }} />
                {error && <Alert variant='filled' severity="error">{error}</Alert>}
                <Typography variant="h3">Sign Up</Typography>
                <TextField size="small" label="Given Names" fullWidth type="text" name="givenName" onChange={(e) => setValues({ ...values, given_name: e.target.value })} />
                <TextField size="small" label="Family Name" fullWidth type="text" name="familyName" onChange={(e) => setValues({ ...values, family_name: e.target.value })} />
                <TextField size="small" label="Username" fullWidth type="text" name="nickname" onChange={(e) => setValues({ ...values, nickname: e.target.value })} />
                <TextField size="small" label="Email" fullWidth type="text" name="email" onChange={(e) => setValues({ ...values, email: e.target.value })} />
                <TextField size="small" label="Password" fullWidth type="password" name="password" onChange={(e) => setValues({ ...values, password: e.target.value })} />
                <LoadingButton fullWidth variant="contained" onClick={handleSubmit} >Sign Up</LoadingButton>
            </Stack>
        </Dialog >
    )

}

export default SignUp;
