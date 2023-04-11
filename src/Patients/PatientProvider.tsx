/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useReducer } from 'react';

import cloneDeep from 'lodash.clonedeep';

import { fetchJSON } from '@/api';
import type { PatientEntry } from '@/types';

type State = {
    patient: PatientEntry | null;
    loading: boolean;
    error: string | null;
    notes?: string;
}

type Action = {
    type: string;
    payload: any;
}

type PatientContext<T> = {
    state: State;
    getPatient: (id: string) => Promise<T>;
    createPatient: (patient: PatientEntry) => Promise<T>;
    updatePatient: (patient: PatientEntry) => Promise<T>;
    deletePatient: (id: string) => Promise<T>;
    clearState: () => T;
}

const initialState: State = {
    patient: null,
    loading: false,
    error: null
};

const serviceEndpoint = 'http://localhost:8080/patient.v1.PatientService';
const patientContext: React.Context<any> = createContext(initialState);

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'init':
            return {
                ...state,
                patient: cloneDeep(state.patient),
                loading: true,
                error: null,
            };
        case 'clear':
            return { ...initialState };
        case 'created':
        case 'loaded':
            return {
                ...state,
                patient: cloneDeep(action.payload),
                loading: false,
                error: null,
            };
        case 'updated': {
            const newState = {
                ...state,
                loading: false,
                error: null,
            };
            newState.patient = { ...state.patient, ...action.payload.patient }
            return newState;
        }
        case 'deleted':
            return {
                ...state,
                notes: cloneDeep(action.payload),
                loading: false,
                error: null,
            };
        case 'error':
            return {
                ...state,
                patient: cloneDeep(state.patient),
                loading: false,
                error: action.payload,
            };
        default:
            throw new Error(`Unsuported action type dispatched to patientProvider reducer: ${action.type}`);
    }
};

export const usePatient = (): PatientContext<void> => {
    const context = useContext(patientContext);
    if (!context) {
        throw new Error('usePatient must be used within an patientProvider');
    }
    const { state, dispatch } = context;

    const clearState = (): void => {
        dispatch({ type: 'clear' });
    };

    const getPatient = async (patientId: string): Promise<void> => {
        dispatch({ type: 'init' });
        const data = await fetchJSON({ url: `${serviceEndpoint}/Get`, body: { patientId } });
        if (data.error) {
            console.error(data.error);
            dispatch({ type: 'error', payload: data.error });
            return;
        }
        dispatch({ type: 'loaded', payload: data.patient });
    };

    const createPatient = async (patient: PatientEntry): Promise<void> => {
        dispatch({ type: 'init' });
        const data = await fetchJSON({ url: `${serviceEndpoint}/Create`, body: { patient } });
        if (data.error) {
            console.error(data.error);
            dispatch({ type: 'error', payload: data.error });
            return;
        }
        dispatch({ type: 'created', payload: data.patient });
    };

    const updatePatient = async (patient: PatientEntry): Promise<void> => {
        dispatch({ type: 'init' });
        const data = await fetchJSON({ url: `${serviceEndpoint}/Update`, body: { patient, patientId: patient.id } });
        if (data.error) {
            console.error(data.error);
            dispatch({ type: 'error', payload: data.error });
            return;
        }
        dispatch({ type: 'updated', payload: { patient: data.patient } });
    };

    const deletePatient = async (patientId: string): Promise<void> => {
        dispatch({ type: 'init' });

        const data = await fetchJSON({ url: `${serviceEndpoint}/Delete`, body: { patientId } });
        if (data.error) {
            console.error(data.error);
            dispatch({ type: 'error', payload: data.error });
            return;
        }
        dispatch({ type: 'deleted', payload: { patientId } });
    };

    return { state, clearState, createPatient, getPatient, updatePatient, deletePatient };
}

type PatientProviderProps = {
    children: React.ReactNode;
}

const PatientProvider = ({ children }: PatientProviderProps): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <patientContext.Provider value={{ state, dispatch }}>
            {children}
        </patientContext.Provider>
    );
};

export default PatientProvider;