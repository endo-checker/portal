import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';

import { ListSkeleton } from '@/components/Outline';
import RiskChip from '@/components/RiskChip';
import SearchBar from '@/components/SearchBar';
import Time from '@/components/Time';
import { usePatientList, PatientEntry } from '@/Patients/usePatientList';

const Patients = (): React.ReactElement => {
    const [query, setQuery] = useState({ searchText: "", page: 0 });
    const { state, queryPatients } = usePatientList();

    const limit = 20;

    const handleSearch = (searchText: string) => {
        setQuery(q => ({ ...q, searchText: searchText, page: 0 }));
    };

    const getPatients = () => {
        queryPatients({ searchText: query?.searchText, limit })
        return state
    }

    useQuery([query], getPatients, {
        refetchOnWindowFocus: false,
    })

    return (
        <Box>
            <SearchBar sx={{ my: 2 }} value={query.searchText} onChange={handleSearch} />
            {state.loading && Array(limit).fill("").map((_, index) =>
                <ListSkeleton key={index} />
            )}
            <Stack component={Paper} spacing={1}>
                {state && state.patients?.map((patient: PatientEntry, index: number) =>
                    <Box px={2} display="flex" justifyContent="space-between" alignItems="center" key={index}>
                        <Box display="flex" alignItems="center">
                            <Avatar sx={{ backgroundColor: patient.iconColor, mr: 2 }}>
                                {patient.givenNames[0] + patient.familyName[0]}
                            </Avatar>
                            <Typography  >
                                {patient.givenNames} {patient.familyName}
                            </Typography>
                        </Box>
                        <Time date={patient.createdAt} />
                        <RiskChip risk={patient.risk} />
                    </Box>
                )}
                {state && state.total === 0 && <p>No patients found</p>}
                <Box sx={{ mt: 2 }}>
                    {state && `${Number(state.total)}/${state.patients?.length} of patients`}
                </Box>
            </Stack>
        </Box >
    )
}
export default Patients