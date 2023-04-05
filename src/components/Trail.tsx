import React from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

type Keys = "originNav" | "origin" | "current";
type TrailProps = {
    [key in Keys]: string;
}

// Creates a trail of breadcrumbs for the current page
export const Trail = (props: TrailProps): JSX.Element => {
    const { current, origin, originNav } = props;
    const navigate = useNavigate();

    const separator = "\u203a"

    return (
        <Breadcrumbs sx={{ display: { xs: 'none', sm: 'flex' } }} separator={separator} >
            <Link
                sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
                underline="hover"
                color="grayText"
                onClick={() => navigate(`/${originNav === undefined ? "" : originNav}`)}
            >
                {origin}
            </Link>
            <Typography color="primary">{current}</Typography>
        </Breadcrumbs >
    );
}
export default Trail;