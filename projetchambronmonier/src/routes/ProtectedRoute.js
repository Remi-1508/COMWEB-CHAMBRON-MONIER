import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
export const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { isLoggedIn, currentUser, loading } = useAuth();
    const location = useLocation();
    // Affiche un indicateur de chargement si nécessaire
    if (loading) {
        return <div>Chargement...</div>;
    }
    // Vérifie si l'utilisateur est connecté
    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    // Vérifie si l'utilisateur a le rôle requis (si spécifié)
    if (requiredRole && currentUser.role !== requiredRole) {
        // Redirige vers la page appropriée en fonction du rôle
        if (currentUser.role === 'student') {
            return <Navigate to="/student/dashboard" replace />;
        } else if (currentUser.role === 'teacher') {
            return <Navigate to="/teacher/dashboard" replace />;
        } else {
            return <Navigate to="/login" replace />;
        }
    }
    return children;
};