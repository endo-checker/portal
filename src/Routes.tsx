import React, { lazy } from 'react';

// import { useAuth0 } from '@auth0/auth0-react';
import { useRoutes } from 'react-router-dom';


const PatientEntry = lazy(() => import('@/Patients/Entry'));
const Patients = lazy(() => import('@/Patients/PatientList'));
const AccountInfo = lazy(() => import('@/AccountInfo'));
const NotFound = lazy(() => import('@/NotFound'));
const SignUp = lazy(() => import('@/auth/SignUp'));
const SignIn = lazy(() => import('@/auth/SignIn'));
// const Patient = lazy(() => import('@/Patients/Profile'));
// const Create = lazy(() => import('@/Patients/Profile/Create'));
// const NotFound = lazy(() => import('@/NotFound'));

const Routes = () => {

    // const { user } = useAuth0();
    // const role = user.params.Role;

    // const commonAuth = [
    //     { path: 'account', element: <AccountInfo /> },
    //     { path: '*', element: <NotFound /> },
    // ]
    // const patientPath = [
    //     { path: '/', element: <CreateLog /> },
    // ]

    // const adminPaths = [
    //     { path: 'patients/:id', element: <Patient /> },
    //     { path: 'patients/new', element: <Create /> },
    //     { path: '/', element: <Patients /> },
    // ]

    // const authRoutes = () => {
    //     if (role === 'patient') {
    //         return commonAuth.concat(patientPath);
    //     }
    //     return commonAuth.concat(adminPaths);
    // };
    // const routes = authRoutes();
    // return useRoutes(routes);
    const routes = [

        { path: '/', element: <Patients /> },
        { path: '/patient/:id', element: <PatientEntry /> },

        { path: '*', element: <NotFound /> },
        { path: 'account', element: <AccountInfo /> },
        { path: 'login', element: <SignIn /> },
        { path: 'sign-up', element: <SignUp /> }
    ]
    return useRoutes(routes);

}

export default Routes;