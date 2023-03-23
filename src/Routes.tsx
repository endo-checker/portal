import React, { lazy } from 'react';

import { useRoutes } from 'react-router-dom';

import { useUser } from '@/auth/userContext';

const PatientEntry = lazy(() => import('@/Patients/Entry'));
const Patients = lazy(() => import('@/Patients/PatientList'));
const AccountInfo = lazy(() => import('@/AccountInfo'));
const NotFound = lazy(() => import('@/NotFound'));
const SignUp = lazy(() => import('@/auth/SignUp'));
const SignIn = lazy(() => import('@/auth/SignIn'));

const Routes = () => {
    const { state } = useUser();

    const loggedOutRoutes = [
        { path: 'login', element: <SignIn /> },
        { path: 'sign-up', element: <SignUp /> },
        { path: '*', element: <NotFound /> },
    ]
    const routes = [
        { path: '/', element: <Patients /> },
        { path: '/patient/:id', element: <PatientEntry /> },
        { path: '*', element: <NotFound /> },
        { path: 'account', element: <AccountInfo /> }
    ]
    const authRoutes = () => {
        if (!state.user) {
            return loggedOutRoutes
        }
        return routes;
    };
    return useRoutes(authRoutes());

}

export default Routes;