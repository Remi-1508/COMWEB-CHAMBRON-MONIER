// Requête d'authentification
export class LoginRequest {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
// Réponse d'authentification
export class AuthResponse {
    constructor(user, token) {
        this.user = user;
        this.token = token;
    }
}