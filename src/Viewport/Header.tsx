import React from 'react';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export const Header = (): React.ReactElement => {
    const navigate = useNavigate();

    return (
        <AppBar color="secondary" position='static' >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Link onClick={() => navigate("/")} underline="none" sx={{ display: 'flex', '& svg': { fontSize: '2rem', mr: 1 }, alignItems: 'center', color: 'info.main', cursor: 'pointer' }} >
                    <Typography color="primary">Endo Checker</Typography>
                </Link>
                <Button color="inherit" onClick={() => navigate("/patients")}>Patients</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
