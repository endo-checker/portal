import React from 'react';

// import { useAuth0 } from '@auth0/auth0-react';
// import { useRoutes } from 'react-router-dom';

// const CreateLog = lazy(() => import('./Logger/Createlog'));
// const Patients = lazy(() => import('@/Patients'));
// const AccountInfo = lazy(() => import('@/AccountInfo'));
// const Patient = lazy(() => import('@/Patients/Profile'));
// const Create = lazy(() => import('@/Patients/Profile/Create'));
// const NotFound = lazy(() => import('@/NotFound'));

const Routes = (): React.ReactElement => {
    return (
        <></>
    )
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
}

export default Routes;