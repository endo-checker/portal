import React, { useRef } from "react";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { usePatient } from "@/Patients/PatientProvider";

const PatientEntry = (): React.ReactElement => {
    const { id } = useParams();
    const { state, getPatient } = usePatient();
    const initRef = useRef(null as string | null);

    const fetchPatient = () => {
        if (initRef.current === id) {
            return;
        }
        initRef.current = id as string;
        getPatient(id as string)

        return id
    }

    useQuery([id, getPatient], fetchPatient, {
        refetchOnWindowFocus: false,
    })

    return (
        <div>
            {state.patient && state.patient.givenNames}
        </div>
    );
};
export default PatientEntry;