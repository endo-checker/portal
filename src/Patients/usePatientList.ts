import { useState } from 'react';

import cloneDeep from 'lodash.clonedeep';

import { fetchJSON } from '@/api';
import type { PatientEntry } from '@/types';

const serviceEndpoint = 'http://localhost:8080/patient.v1.PatientService/Query';

type State = {
    patients: Array<PatientEntry>;
    error?: null;
    loading: boolean;
    total: number;
}

type Body = {
    searchText: string;
    limit?: number;
}

type UsePatientList = {
    state: State;
    queryPatients: (searchText: Body, limit?: number) => Promise<State | undefined>;
}

const setInit = (state: State): State => {
    return {
        ...state,
        patients: cloneDeep(state.patients),
        loading: true,
    };
};

const setError = (state: State, error: null): State => {
    return {
        ...state,
        patients: cloneDeep(state.patients),
        error,
        loading: false,
    };
};

export const usePatientList = (): UsePatientList => {
    const [state, setState] = useState<State>({
        patients: [],
        error: null,
        loading: false,
        total: 0,
    });

    const queryPatients = async (searchText: Body, limit = 20): Promise<State | undefined> => {
        setState(setInit(state));

        const data = await fetchJSON({ url: serviceEndpoint, body: { limit, ...searchText } });
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