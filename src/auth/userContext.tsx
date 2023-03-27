import React, { useReducer, createContext, useContext } from "react";

import { useQuery } from '@tanstack/react-query';
import cloneDeep from 'lodash.clonedeep';

import { fetchJSON } from '@/api';
import type { User } from '@/types';

type State = {
    user: User | null;
    loading: boolean;
    error: string | null;
}

type Action = {
    type: string;
    payload: any;
}

const init: State = {
    user: null,
    loading: false,
    error: null,
};

type Credentials = {
    [key: string]: string;
}

const api = 'http://localhost:8084/auth.v1.AuthService'
const authContext: React.Context<any> = createContext(init);

const reducer = (state: State, action: Action): State => {
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
        case 'signup':
            return {
                ...state,
                user: cloneDeep(action.payload),
                loading: false,
                error: null,
            }
        case 'signout':
            return {
                ...state,
                user: null,
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

    const clearState = () => {
        dispatch({ type: 'clear' });
    };

    // returns a user object
    useQuery([state.user], async () => {
        dispatch({ type: 'init' });
        const data = await fetchJSON({ url: `${api}/GetAccount`, body: {} });
        dispatch({ type: 'loaded', payload: data.userInfo })
        return data.userInfo;
    }, {
        enabled: state.user === null,
        refetchOnWindowFocus: false,
        onSuccess: (data: User) => {
            console.log(data)
            return data
        },
    });

    const signUp = async (credentials: Credentials) => {
        dispatch({ type: 'init' });
        const data = await fetchJSON({ url: `${api}/CreateAccount`, body: { registerAuthUser: credentials } });
        console.log(data)
        if (data.registerAuthUser.email) {
            dispatch({ type: 'signup', payload: data });
            window.location.href = "/";
        }
    }

    const signIn = async (credentials: Credentials) => {
        dispatch({ type: 'init' });
        const data = await fetchJSON({ url: `${api}/SignIn`, body: { authUserSignIn: credentials } });
        if (data.accessToken) {
            dispatch({ type: 'signin', payload: data });
            window.location.href = "/";
        }
    };

    const signOut = async () => {
        dispatch({ type: 'init' });
        const data = await fetchJSON({ url: `${api}/SignOut`, body: {} });
        if (data.message) {
            dispatch({ type: 'signout', payload: data });
            window.location.href = "/";
        }
    };

    return { state, clearState, signUp, signIn, signOut };
};

type AuthProviderProps = {
    children: React.ReactNode;
}

const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, init);

    return (
        <authContext.Provider value={{ state, dispatch }}>
            {children}
        </authContext.Provider>
    );

};
export default AuthProvider;
