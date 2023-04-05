import React, { Suspense } from 'react';


import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import AuthProvider from '@/auth/userContext';
import Outline from '@/components/Outline';
import PatientProvider from '@/Patients/PatientProvider';
import Routes from '@/Routes';
import { theme } from '@/theme';
import Viewport from '@/Viewport';

const App = (): JSX.Element => {

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <QueryClientProvider client={new QueryClient()} >
            <AuthProvider>
              <PatientProvider>
                <Viewport  >
                  <Suspense fallback={<Outline />}>
                    <Routes />
                  </Suspense>
                </Viewport>
              </PatientProvider>
            </AuthProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App; 