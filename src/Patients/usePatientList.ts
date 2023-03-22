import { useState } from 'react';

import cloneDeep from 'lodash.clonedeep';

import { fetchJSON } from '@/api';

const serviceEndpoint = 'http://localhost:8080/patient.v1.PatientService/Query';

export type PatientEntry = {
    iconColor: string | undefined;
    id: string;
    givenNames: string;
    familyName: string;
    email: string;
    createdAt: number;
    dateOfBirth: number;
}

type State = {
    patients: Array<PatientEntry>;
    error?: null;
    loading: boolean;
    total: number;
}

const setInit = (state: State) => {
    return {
        ...state,
        patients: cloneDeep(state.patients),
        loading: true,
    };
};

const setError = (state: State, error: null) => {
    return {
        ...state,
        patients: cloneDeep(state.patients),
        error,
        loading: false,
    };
};

export const usePatientList = () => {
    const [state, setState] = useState<State>({
        patients: [],
        error: null,
        loading: false,
        total: 0,
    });

    const queryPatients = async (searchText: any, limit = 20) => {
        setState(setInit(state));

        const url = `${serviceEndpoint}`;

        const data = await fetchJSON({ url, body: { limit, ...searchText } });
        if (data.error) {
            console.error(data.error);
            setState(setError(state, data.error));
            return;
        }
        setState({
            patients: data.cursor || [],
            total: data.matches || 0,
            loading: false,
            error: null,
        });

        return data;
    }

    return { state, queryPatients };
};