import React, { Suspense } from 'react';


import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Patients from '@/Patients/PatientList';
import { theme } from '@/theme';
import Viewport from '@/Viewport';

const App = (): React.ReactElement => {
  const client = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <QueryClientProvider client={client} >
          <Viewport>
            <Suspense fallback={<p>...loading</p>}>
              <Routes>
                <Route path="/patients" element={<Patients />} />
              </Routes>
            </Suspense>
          </Viewport>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

