import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage';
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { TeacherDashboard } from '../pages/teacher/TeacherDashboard';
import { ProtectedRoute } from './ProtectedRoute';
import { UserRoles } from '../models/User';
import { useAuth } from '../hooks/useAuth';

export const AppRoutes = () => {
    const { isLoggedIn, currentUser } = useAuth()
    // Fonction pour rediriger selon le rôle
    const getRedirectPath = () => {
        if (!isLoggedIn) return '/login';
        if (currentUser?.role === UserRoles.STUDENT) return '/student/dashboard';
        if (currentUser?.role === UserRoles.TEACHER) return '/teacher/dashboard';
        return '/login';
    };
    
    return (
        <Routes>
        {/* Route publique */}
        <Route 
        path="/login" 
        element={isLoggedIn ? <Navigate to={getRedirectPath()} /> : <LoginPage />} 
        />
        
        {/* Routes protégées pour les étudiants */}
        <Route 
        path="/student/dashboard" 
        element={
            <ProtectedRoute requiredRole={UserRoles.STUDENT}>
            <StudentDashboard />
            </ProtectedRoute>
        } 
        />
        
        {/* Routes protégées pour les enseignants */}
        <Route 
        path="/teacher/dashboard" 
        element={
            <ProtectedRoute requiredRole={UserRoles.TEACHER}>
            <TeacherDashboard />
            </ProtectedRoute>
        } 
        />
        {/* Redirection par défaut */}
        <Route 
        path="/" 
        element={<Navigate to={getRedirectPath()} />} 
        />
        
        {/* Route 404 */}
        <Route path="*" element={<Navigate to={getRedirectPath()} />} />
        </Routes>
    );
};