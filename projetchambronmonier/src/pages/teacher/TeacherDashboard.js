import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Layout } from '../../components/layout/Layout';
import { useAuth } from '../../hooks/useAuth';
export const TeacherDashboard = () => {
    const { currentUser } = useAuth();
    return (
        <Layout>
        <Box sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
        Tableau de bord enseignant
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom>
        Bienvenue, {currentUser?.username} !
        </Typography>
        
        <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
        Gestion des notes
        </Typography>
        
        <Typography>
        C'est ici que vous pourrez gérer les notes de vos élèves. Cette partie sera
        développée ultérieurement.
        </Typography>
        </Paper>
        </Box>
        </Layout>
    );
};