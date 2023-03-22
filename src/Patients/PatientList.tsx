import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';

import { ListSkeleton } from '@/components/Outline';
import RiskChip from '@/components/RiskChip';
import SearchBar from '@/components/SearchBar';
import Time from '@/components/Time';
import { usePatientList } from '@/Patients/usePatientList';
import type { PatientEntry } from '@/types'

const Patients = (): React.ReactElement => {
    const { state, queryPatients } = usePatientList();
    const [query, setQuery] = useState({ searchText: "", page: 0 });
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
        <Stack spacing={1} divider={<Divider />}>
            <Stack sx={{ my: 2 }} direction="row" spacing={1}>
                <SearchBar value={query.searchText} onChange={handleSearch} />
                <Button sx={{ width: 150 }} variant="contained" >New patient</Button>
            </Stack>
            {state.loading && Array(limit).fill("").map((_, index) =>
                <ListSkeleton key={index} />
            )}
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
            <Box sx={{ mt: 2 }} display="flex" justifyContent="center">
                {state && `${Number(state.total)}/${state.patients?.length} of patients`}
            </Box>
        </Stack >
    )
}
export default Patients