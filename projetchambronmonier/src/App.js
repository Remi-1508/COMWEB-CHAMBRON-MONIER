import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { CssBaseline } from '@mui/material';
function App() {
    return (
        <BrowserRouter>
        <CssBaseline />
        <AuthProvider>
        <AppRoutes />
        </AuthProvider>
        </BrowserRouter>
    );
}
export default App;