import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password) => {
    const res = await fetch(`https://remonier.zzz.bordeaux-inp.fr/login.php?email=${encodeURIComponent(email)}&mot_de_passe=${encodeURIComponent(password)}`);
    const data = await res.json();

    if (data.statut === 'ok') {
      let user = null;

      if (data.role === 'student' && data.eleve) {
        user = {
          id: data.eleve.id,
          nom: data.eleve.nom,
          prenom: data.eleve.prenom,
          email: data.eleve.email,
          role: 'student',
          notes: data.notes || [],
        };
      } else if (data.role === 'teacher' && data.prof) {
        user = {
          id: data.prof.id,
          nom: data.prof.nom,
          prenom: data.prof.prenom,
          email: data.prof.email,
          role: 'teacher',
          matieres: data.matieres || []
        };
      }

      if (user) {
        setCurrentUser(user);
        return user;
      } else {
        throw new Error("Utilisateur non reconnu.");
      }
    } else {
      throw new Error(data.message || "Erreur de connexion");
    }
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn: !!currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
