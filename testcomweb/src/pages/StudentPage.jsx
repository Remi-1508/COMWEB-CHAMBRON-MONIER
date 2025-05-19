import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../auth/AuthContext';

export default function StudentPage() {
  const { currentUser } = useAuth();
  return (
    <Layout>
      <h2>Bienvenue {currentUser?.prenom} {currentUser?.nom}</h2>
      <h3>Mes notes</h3>
      <ul>
        {currentUser?.notes.map((note, idx) => (
          <li key={idx}>{note.nom_matiere} : {note.note}/20</li>
        ))}
      </ul>
    </Layout>
  );
}
