import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth/authService';
import { setupAxiosInterceptors } from '../services/api/axios';
// Création du contexte
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Initialise l'état de l'utilisateur au chargement du composant
    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setupAxiosInterceptors(user.token);
        }
        setLoading(false);
    }, []);
    // Méthode de connexion
    const login = useCallback(async (username, password) => {
        try {
            const user = await authService.login(username, password);
            setCurrentUser(user);
            setupAxiosInterceptors(user.token);
            return user;
        } catch (error) {
            throw error;
        }
    }, []);
    // Méthode de déconnexion
    const logout = useCallback(() => {
        authService.logout();
        setCurrentUser(null);
        setupAxiosInterceptors(null);
    }, []);
    // Valeur du contexte
    const value = {
        currentUser,
        isLoggedIn: !!currentUser,
        isStudent: currentUser?.role === 'student',
        isTeacher: currentUser?.role === 'teacher',
        login,
        logout,
        loading
    };
    return (
        <AuthContext.Provider value={value}>
        {!loading && children}
        </AuthContext.Provider>
    );
};

