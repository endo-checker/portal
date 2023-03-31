import React from 'react';

import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

const Outline = (): React.ReactElement => {
    return (
        <Container maxWidth="lg" sx={{ py: 4, mt: 10 }}>
            <Skeleton height="5rem" />
            <Skeleton variant="rectangular" height="20rem" />
            <Skeleton height="5rem" />
        </Container>
    );
};

export default Outline

export const ListSkeleton = (): React.ReactElement => {
    return (
        <Skeleton variant='text' width="100%" height={52} />
    )
}
