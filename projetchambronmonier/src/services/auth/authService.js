import { User, UserRoles } from '../../models/User';
// Utilisateurs de test
const TEST_USERS = [
    { id: 1, username: 'etudiant', password: 'etudiant123', role: UserRoles.STUDENT },
    { id: 2, username: 'prof', password: 'prof123', role: UserRoles.TEACHER }
];
class AuthService {
    async login(username, password) {
        // Simule une requête API
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = TEST_USERS.find(
                    u => u.username === username && u.password === password
                );
                
                if (user) {
                    // Génère un token factice
                    const token = btoa(`${username}:${new Date().getTime()}`);
                    
                    // Crée la réponse
                    const response = {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                        token
                    };
                    // Stocke dans le localStorage
                    localStorage.setItem('user', JSON.stringify(response));
                    
                    resolve(new User(user.id, user.username, user.role, token));
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 500); // Simule un délai réseau
        });
    }
    // Les autres méthodes restent inchangées
    logout() {
        localStorage.removeItem('user');
    }
    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        
        const userData = JSON.parse(userStr);
        return new User(
            userData.id,
            userData.username,
            userData.role,
            userData.token
        );
    }
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }
    hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.role === role;
    }
    isStudent() {
        return this.hasRole(UserRoles.STUDENT);
    }
    isTeacher() {
        return this.hasRole(UserRoles.TEACHER);
    }
}

export const authService = new AuthService();

/*
Code à mettre dans le fichier authService.js après avoir connecté l'api

import { apiClient } from '../api/axios'; 
import { User, UserRoles } from '../../models/User'; 
class AuthService { 
    // Méthode de connexion 
    async login(username, password) { 
        try { 
            const response = await apiClient.post('/auth/login', { username, password }); 
            if (response.data.token) { 
                // Stocke les données de l'utilisateur dans le localStorage 
                localStorage.setItem('user', JSON.stringify(response.data)); 
                // Crée un objet User à partir des données reçues 
                const user = new User( 
                    response.data.id, 
                    response.data.username, 
                    response.data.role, 
                    response.data.token 
                ); 
                return user; 
            } 
            return null; 
        } catch (error) { 
            console.error('Login error:', error); 
            throw error; 
        } 
    } 
    // Méthode de déconnexion 
    logout() { 
        localStorage.removeItem('user'); 
    } 
    // Récupère l'utilisateur courant depuis le localStorage 
    getCurrentUser() { 
        const userStr = localStorage.getItem('user'); 
        if (!userStr) return null; 
        const userData = JSON.parse(userStr); 
        return new User( 
            userData.id, 
            userData.username, 
            userData.role, 
            userData.token 
        ); 
    } 
    // Vérifie si l'utilisateur est connecté 
    isLoggedIn() { 
        return this.getCurrentUser() !== null; 
    } 
    // Vérifie si l'utilisateur a un rôle spécifique 
    hasRole(role) { 
        const user = this.getCurrentUser(); 
        return user && user.role === role; 
    } 
    // Vérifie si l'utilisateur est un étudiant 
    isStudent() { 
        return this.hasRole(UserRoles.STUDENT); 
    } 
    // Vérifie si l'utilisateur est un enseignant 
    isTeacher() { 
        return this.hasRole(UserRoles.TEACHER); 
    } 
} 
// Exporte une instance unique du service 
export const authService = new AuthService(); 
*/

