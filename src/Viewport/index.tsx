import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Footer from './Footer';
import Header from './Header';


type ViewportProps = {
    children: React.ReactNode;
}

const Viewport = ({ children }: ViewportProps): JSX.Element => {

    return (
        <>
            <Header />
            <Box sx={{
                mt: 8,
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
            >
                <Container maxWidth="lg">
                    {children}
                </Container>
                <Footer />
            </Box >
        </>
    );
}

export default Viewport;
