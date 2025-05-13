import React from 'react';
import logo from '../../assets/GuiliGuiliSchool.png'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
export const Header = () => {
    const { isLoggedIn, logout, isStudent, isTeacher } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <AppBar position="static">
        <Toolbar>
        <img src={logo} alt="Logo" style={{ width: '50px', marginRight: '10px' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Gestion des Notes
        </Typography>
        
        <Box>
        {isLoggedIn ? (
            <>
            {isStudent && (
                <Button color="inherit" onClick={() => navigate('/student/dashboard')}>
                Mes Notes
                </Button>
            )}
            
            {isTeacher && (
                <Button color="inherit" onClick={() => navigate('/teacher/dashboard')}>
                Gestion Notes
                </Button>
            )}
            
            <Button color="inherit" onClick={handleLogout}>
            Déconnexion
            </Button>
            </>) : (
                <Button color="inherit" onClick={() => navigate('/login')}>
                Connexion
                </Button>
            )}
            </Box>
            </Toolbar>
            </AppBar>
        );
    };