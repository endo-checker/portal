import React from 'react';

import { Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import Logo from '@/components/Logo';

export const Header = (): React.ReactElement => {
    const navigate = useNavigate();

    return (
        <AppBar position='static' >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Link onClick={() => navigate("/")} underline="none" sx={{ display: 'flex', '& svg': { fontSize: '2rem', mr: 1 }, alignItems: 'center', color: 'info.main', cursor: 'pointer' }} >
                    <Logo />
                    <Typography color="secondary">Endo Platform</Typography>
                </Link>
                <Button startIcon={<Avatar sx={{ width: 24, height: 24 }} />} color="inherit" onClick={() => navigate("/account")}>Account Info</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
