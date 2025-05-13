// Types d'utilisateurs supportés
export const UserRoles = {
    STUDENT: 'student',
    TEACHER: 'teacher',
};
// Structure d'un utilisateur
export class User {
    constructor(id, username, role, token = null) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.token = token;
    }
}