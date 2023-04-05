import React, { lazy } from 'react';

import { useRoutes } from 'react-router-dom';

import { useUser } from '@/auth/userContext';

const PatientEntry = lazy(() => import('@/Patients/Entry'));
const Patients = lazy(() => import('@/Patients/PatientList'));
const AccountInfo = lazy(() => import('@/AccountInfo'));
const NotFound = lazy(() => import('@/NotFound'));
const SignUp = lazy(() => import('@/auth/SignUp'));
const SignIn = lazy(() => import('@/auth/SignIn'));
const DefaultView = lazy(() => import('@/DefaultView'));
const SignUpSuccess = lazy(() => import('@/auth/SignUpSuccess'));

type RouteTypes = Array<{
    path: string;
    element: JSX.Element
}>

const Routes: React.FC = (): JSX.Element | null => {
    const { state } = useUser();

    const loggedOutRoutes: RouteTypes = [
        { path: '/', element: <DefaultView /> },
        { path: '/login', element: <SignIn /> },
        { path: '/sign-up', element: <SignUp /> },
        { path: '*', element: <NotFound /> },
        { path: '/success/:successId', element: <SignUpSuccess /> }
    ]
    const routes: RouteTypes = [
        { path: '/', element: <Patients /> },
        { path: '/patient/:id', element: <PatientEntry /> },
        { path: '*', element: <NotFound /> },
        { path: 'account', element: <AccountInfo /> }
    ]
    const authRoutes = (): RouteTypes => {
        if (!state.user && !state.loading) {
            return loggedOutRoutes
        }
        return routes;
    };
    return useRoutes(authRoutes());

}

export default Routes;