import axios from 'axios';
// Crée une instance axios avec la configuration de base
const API_URL = 'http://localhost/api'; // Remplace par l'URL de ton API PHP
export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Intercepteur pour ajouter le token à chaque requête
export const setupAxiosInterceptors = (token) => {
    apiClient.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}