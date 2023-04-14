import React, { lazy } from 'react';

import { useRoutes, RouteObject } from 'react-router-dom';

import { useUser } from '@/auth/userContext';
import Outline from '@/components/Outline';

const PatientEntry = lazy(() => import('@/Patients/Entry'));
const Patients = lazy(() => import('@/Patients/PatientList'));
const AccountInfo = lazy(() => import('@/AccountInfo'));
const NotFound = lazy(() => import('@/NotFound'));
const SignUp = lazy(() => import('@/auth/SignUp'));
const SignIn = lazy(() => import('@/auth/SignIn'));
const DefaultView = lazy(() => import('@/DefaultView'));
const SignUpSuccess = lazy(() => import('@/auth/SignUpSuccess'));



const loggedOutRoutes: Array<RouteObject> = [
    { path: '/', element: <DefaultView /> },
    { path: '/login', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '*', element: <NotFound /> },
    { path: '/success/:successId', element: <SignUpSuccess /> }
]
const routes: Array<RouteObject> = [
    { path: '/', element: <Patients /> },
    { path: '/patient/:id', element: <PatientEntry /> },
    { path: '*', element: <NotFound /> },
    { path: 'account', element: <AccountInfo /> }
]

const Routes: React.FC = () => {
    const { state } = useUser();

    const authRoutes = (): Array<RouteObject> => {
        if (state.loading) {
            Outline
        }
        else if (!state.user && !state.loading) {
            return loggedOutRoutes;
        }
        return routes;
    };
    return useRoutes(authRoutes());
}

export default Routes;