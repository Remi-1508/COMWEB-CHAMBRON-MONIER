import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Layout } from '../../components/layout/Layout';
import { useAuth } from '../../hooks/useAuth';
export const StudentDashboard = () => {
    const { currentUser } = useAuth();
    return (
        <Layout>
        <Box sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
        Tableau de bord étudiant
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom>
        Bienvenue, {currentUser?.username} !
        </Typography>
        
        <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
        Mes notes
        </Typography>
        
        <Typography>
        C'est ici que seront affichées vos notes. Cette partie sera développée
        ultérieurement.
        </Typography>
        </Paper>
        </Box>
        </Layout>
    );
};