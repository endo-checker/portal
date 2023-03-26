import React from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

type TrailProps = {
    [key: string]: string;
}

export const Trail = (props: TrailProps): React.ReactElement => {
    const { current, origin, originNav } = props;
    const navigate = useNavigate();

    const seperator = "\u203a"

    return (
        <Breadcrumbs sx={{ display: { xs: 'none', sm: 'flex' } }} separator={seperator} >
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