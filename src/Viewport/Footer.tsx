import React from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const Footer = (): React.ReactElement => {
    return (
        <Box component="footer"
            sx={{ backgroundColor: 'secondary.main', display: "flex", justifyContent: "center", py: 5, px: 2, mt: 'auto' }}>
            <Copyright />
        </Box>
    );
}

export default Footer;

const Copyright = (): React.ReactElement => {
    return (
        <Typography variant="body2" >
            {'Copyright © '}
            <Link underline="none" href="https://zachs-website.netlify.app/" >
                Endo checker
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}