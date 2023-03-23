import React, { Suspense } from 'react';


import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import Outline from '@/components/Outline';
import PatientProvider from '@/Patients/PatientProvider';
import Routes from '@/Routes';
import { theme } from '@/theme';
import Viewport from '@/Viewport';

const App = (): React.ReactElement => {
  const client = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <PatientProvider>
          <QueryClientProvider client={client} >
            <Viewport>
              <Suspense fallback={<Outline />}>
                <Routes />
              </Suspense>
            </Viewport>
          </QueryClientProvider>
        </PatientProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

