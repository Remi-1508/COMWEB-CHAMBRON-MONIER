import React from 'react';
import { Box, Paper } from '@mui/material';
import { LoginForm } from '../../components/auth/LoginForm';
import { Layout } from '../../components/layout/Layout';
export const LoginPage = () => {
    return (
        <Layout>
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh'
        }}
        >
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 450 }}>
        <LoginForm />
        </Paper>
        </Box>
        </Layout>
    );
};
