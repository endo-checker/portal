import React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { useQuery } from '@tanstack/react-query';

import { useUser } from '@/auth/userContext';

const AccountInfo = (): JSX.Element => {
    const { state } = useUser();

    return (
        <Stack spacing={2}>
            {state.user &&
                <Card>
                    <CardHeader
                        avatar={<Avatar src={state.user.picture} alt={`${state.user.nickname}'s avatar`} />}
                        title={`${state.user.givenName} ${state.user.familyName}`}
                    />
                    <CardContent>
                        <Stack divider={<Divider />}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                                <Typography>Email:</Typography>
                                <Typography>{state.user.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                                <Typography>Username:</Typography>
                                <Typography>{state.user.nickname}</Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            }
        </Stack>
    )
}
export default AccountInfo
