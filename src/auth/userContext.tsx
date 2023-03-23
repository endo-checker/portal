import React, { useReducer, createContext, useContext, useCallback } from "react";

import cloneDeep from 'lodash.clonedeep';

import { fetchJSON } from '@/api';

type State = {
    user: User | null;
    loading: boolean;
}

type Action = {
    type: string;
    payload: any;
}

type User = {
    [key: string]: string
}

const init: State = {
    user: null,
    loading: false,
};

type Credentials = {
    username: string;
    password: string;
}

const api = 'http://localhost:8084/auth.v1.AuthService'
const authContext: React.Context<any> = createContext(init);

const reducer = (state: State, action: Action) => {

    switch (action.type) {
        case 'init':
            return {
                ...state,
                user: cloneDeep(state.user),
                loading: true,
                error: null,
            };
        case 'loaded':
            return {
                ...state,
                user: cloneDeep(action.payload),
                loading: false,
                error: null,
            };
        case 'signin':
            return {
                ...state,
                loading: false,
                error: null,
            }

        case 'error':
            return {
                ...state,
                user: cloneDeep(state.user),
                loading: false,
                error: action.payload,
            };

        case 'clear':
            return { ...init };
        default:
            throw new Error(`unsuported action type dispatched to AuthProvider reducer: ${action.type}`);
    }

}

export const useUser = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error('useUser must be used within an AuthProvider');
    }

    const { state, dispatch } = context;
    // const [userToken, setUserToken] = React.useState();

    const clearState = () => {
        dispatch({ type: 'clear' });
    };

    const token = localStorage.getItem('access_token');

    // returns a user object
    const getUser = async () => {
        dispatch({ type: 'init' });

        if (!token) {
            return;
        }
        const data = await fetchJSON({ url: `${api}/GetAccount`, body: { "access_token": token } });
        dispatch({ type: 'loaded', payload: data.userInfo });
    }

    const signIn = async (credentials: Credentials) => {
        dispatch({ type: 'init' });
        const data = await fetchJSON({ url: `${api}/SignIn`, body: { authUserSignIn: credentials } });
        if (data.accessToken) {
            // setUserToken(localStorage.setItem('access_token', data.accessToken));
            localStorage.setItem('access_token', data.accessToken);
            dispatch({ type: 'signin', payload: data });
            console.log('data', data)
            window.location.href = '/';
        }

        return data;
    };

    return { state, getUser, clearState, signIn };
}

type Props = {
    children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, init);

    return (
        <authContext.Provider value={{ state, dispatch }}>
            {children}
        </authContext.Provider>
    );

};
export default AuthProvider;
