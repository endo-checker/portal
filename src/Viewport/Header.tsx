import React, { useState } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useUser } from '@/auth/userContext';
import Logo from '@/components/Logo';

export const Header = (): React.ReactElement => {
    const navigate = useNavigate();
    const { state, getUser } = useUser();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const getUserInfo = async () => {
        await getUser()
        return state.user
    }
    useQuery([state.user], getUserInfo, {
        refetchOnWindowFocus: false,
    })



    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path: string) => {
        navigate(path);
        setAnchorEl(null);
    }

    const logout = async () => {
        localStorage.clear();
        window.location.href = '/';
    }

    // console.log(state)

    return (
        <AppBar position='static' >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Link onClick={() => navigate("/")} underline="none" sx={{ display: 'flex', '& svg': { fontSize: '2rem', mr: 1 }, alignItems: 'center', color: 'info.main', cursor: 'pointer' }} >
                    <Logo />
                    <Typography color="secondary">Endo Platform</Typography>
                </Link>
                {state.user ?
                    <>
                        <Button onClick={handleClick} color="inherit" endIcon={<Avatar sx={{ width: 24, height: 24 }} alt={state.user.name} src={state.user.picture} />} >
                            {state.user.name}
                        </Button>
                        <Menu id="menu" anchorEl={anchorEl} open={open} onClose={handleClose}  >
                            <MenuItem onClick={() => handleNavigate("/account")}>
                                <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                                <Typography >Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => logout()}>
                                <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                                <Typography>Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </>
                    :
                    <Box>
                        <Button onClick={() => handleNavigate("/sign-up")} color="inherit" >Sign Up</Button>
                        <Button onClick={() => handleNavigate('/login')} color="inherit" >Login</Button>
                    </Box>
                }
            </Toolbar>
        </AppBar >
    )
}

export default Header;
