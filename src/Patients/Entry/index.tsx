import React, { useRef } from "react";

import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Outline from "@/components/Outline";
import RiskChip from '@/components/RiskChip';
import Trail from "@/components/Trail";
import { usePatient } from "@/Patients/PatientProvider";

const PatientEntry = (): JSX.Element => {
    const { id } = useParams();
    const { state, getPatient } = usePatient();
    const initRef = useRef(null as string | null);
    const patientId = (id as string);

    const fetchPatient = () => {
        if (initRef.current === id) {
            return;
        }
        initRef.current = patientId;
        getPatient(patientId)
        return patientId
    }

    useQuery([id, getPatient], fetchPatient, {
        refetchOnWindowFocus: false,
    })

    return (
        <Stack spacing={2}>
            {state.loading && !state.patient && <Outline />}
            {state.patient &&
                <>
                    <Trail originNav="" origin="Patient List" current={`${state.patient.givenNames} ${state.patient.familyName}`} />
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ backgroundColor: state.patient.iconColor }}>
                                    {state.patient.givenNames[0] + state.patient.familyName[0]}
                                </Avatar>
                            }
                            title={`${state.patient.givenNames} ${state.patient.familyName}`}
                            subheader={""}
                            action={<RiskChip risk={state.patient.risk} />}
                        />
                    </Card>
                </>
            }
        </Stack>
    );
};
export default PatientEntry;