import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';

import { ListSkeleton } from '@/components/Outline';
import SearchBar from '@/components/SearchBar';
import Time from '@/components/Time';
import { usePatientList, PatientEntry } from '@/Patients/usePatientList';

const limit = 20;

const Patients = (): React.ReactElement => {
    const [query, setQuery] = useState({ searchText: "", page: 0 });
    const { state, queryPatients } = usePatientList();

    const handleSearch = (searchText: string) => {
        setQuery(q => ({ ...q, searchText: searchText, page: 0 }));
    };

    useQuery([state, query?.searchText], () => queryPatients({ searchText: query?.searchText, limit }))

    return (
        <Box>
            <SearchBar value={query.searchText} onChange={handleSearch} />
            {state.loading && Array(limit).fill("").map((_, index) =>
                <ListSkeleton key={index} />
            )}
            <Stack spacing={1}>
                {state && state.patients?.map((patient: PatientEntry, index: number) =>
                    <Paper px={2} component={Box} display="flex" justifyContent="space-between" alignItems="center" key={index}>
                        <Box display="flex" alignItems="center">
                            <Avatar sx={{ backgroundColor: patient.iconColor, mr: 2 }}>
                                {patient.givenNames[0] + patient.familyName[0]}
                            </Avatar>
                            <Typography  >
                                {patient.givenNames} {patient.familyName}
                            </Typography>
                        </Box>
                        <Time date={patient.createdAt} />
                    </Paper>
                )}
            </Stack>
            {state && state.total === 0 && <p>No patients found</p>}
            <Paper sx={{ mt: 2 }}>
                {state && `${state.total}/${state.patients?.length} of patients`}
            </Paper>
        </Box >
    )
}
export default Patients